import styles from '../styles/global-stylesheet';
import { View, Text, Pressable, TextInput, Alert } from "react-native";
import { useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { account, ID } from 'appwrite';
import { AuthContext } from '../auth-context';
import { endAsyncEvent } from 'react-native/Libraries/Performance/Systrace';

export default function SignUpScreen() {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [nameError, setNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [validEmail, setValidEmail] = useState(false);
    const [validName, setValidName] = useState(false);
    const [validPassword, setValidPassword] = useState(false);

    const [validLogin, setValidLogin] = useState(false);

    const { setIsLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailValid = emailRegex.test(email);
        if (email === '') {
            setEmailError('');
            setValidEmail(false);
        } else if (isEmailValid) {
            setEmailError('');
            setValidEmail(true);
        } else {
            setEmailError('Please enter a valid email address.');
            setValidEmail(false);
        }
    }, [email]);

    useEffect(() => {
        if ((password !=='' || email !== '') && name === ''){
            setNameError('Name cannot be empty');
            setValidName(false);
        } else {
            setNameError('');
            setValidName(true);
        }
    }, [password, email, name]);

    useEffect(()=> {
        const isEverythingValid = validEmail && validPassword && name.trim() !== '';
        setValidLogin(isEverythingValid);
    }, [validEmail, validPassword]);

    const handleSignUp = async () => {
        if (validLogin) {
            try {
                await account.create(ID.unique(), email, password, name);
                await account.createEmailSession(email, password);
                Alert.alert("Success", "Account created!");
                setIsLoggedIn(true);
            } catch (error) {
                if (error.code === 409) {
                    try {
                        await account.createEmailSession(email, password);
                        Alert.alert("Welcome back!");
                        setIsLoggedIn(true);
                    } catch (loginError) {
                        Alert.alert(
                            "Email already in use",
                            "That email is already registered. Please check your password or go to login screen."
                        )
                    }
                } else {
                    Alert.alert("Error ", error.message || "Something went wrong");
                }
            }
        } else {
            Alert.alert("Invalid", "Please fix the form before signing up.")
        }
    }

    return (
        <View style={styles.screenContainer}>
            <Pressable
                onPress={() => navigation.navigate('Login')}
                style={styles.backTextPress}>
                <Text style={styles.backText}> ← Go back to login</Text>
            </Pressable>
            <Text style={styles.loginTitle}>Welcome!</Text>

            <TextInput
                style={styles.loginUsername}
                placeholder='email'
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />
            {emailError ? <Text style={styles.wrongSignUpInfo}>{emailError}</Text> : null}

            <TextInput
                style={styles.loginUsername}
                placeholder='name'
                placeholderTextColor="#888"
                value={name}
                onChangeText={setName}
                autoCapitalize="none"
            />
            {nameError ? <Text style={styles.wrongSignUpInfo}>{nameError}</Text> : null}

            <TextInput
                style={styles.loginPassword}
                placeholder='password'
                placeholderTextColor="#888"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
            />
            {passwordError ? <Text style={styles.wrongSignUpInfo}>{passwordError}</Text> : null}

            <Pressable
                style={[styles.loginSubmit, { backgroundColor: validLogin ? '#4C5C3A' : '#8DB58' }]}
                onPress={handleSignUp}
            >
                <Text style={styles.loginSubmitText}>Sign up</Text>
            </Pressable>
        </View>
    );
}