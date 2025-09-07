import styles from '../styles/global-stylesheet'
import { useState, useContext } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { account } from '../lib/app-write';
import { AuthContext } from '../auth-context';

export default function LoginScreen() {
    const navigation = useNavigation();
    const { setIsLoggedIn } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            await account.createEmailPasswordSession(
                email,
                password,
            );
            setIsLoggedIn(true);
        } catch (err) {
            alert('Login failed! ' + err.message)
        }
    };

    return (
        <View style={styles.screenContainer}>
            <Text style={styles.loginTitle}>Welcome Back!</Text>
            <TextInput
                style={styles.loginUsername}
                placeholder='email'
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.loginPassword}
                placeholder='password'
                placeholderTextColor="#888"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
            />

            <Pressable style={styles.loginSubmit} onPress={handleLogin}>
                <Text style={styles.loginSubmitText}>Login</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.footerText}>Sign up instead</Text>
            </Pressable>
            <Pressable>
                <Text style={styles.footerText}>Forgot your password?</Text>
            </Pressable>
        </View>
    );
}