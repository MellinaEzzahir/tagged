import StyleSheet from '../styles/global-stylesheet';
import { View, Text, Pressable, TextInput, Alert } from "react-native";
import { useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { account, ID } from 'appwrite';
import { AuthContext } from '../auth-context';

export default function SignUpScreen() {
    return (
        <View style={StyleSheet.screenContainer}>
            <Pressable
                onPress={() => navigation.navigate('Login')}
                style={StyleSheet.backTextPress}>
                <Text style={StyleSheet.backText}> ← </Text>
            </Pressable>
            <Text></Text>

            <TextInput />
            {}
            <TextInput />
            {}
            <TextInput />
            {}

            <Pressable>
                <Text></Text>
            </Pressable>
        </View>
    );
}