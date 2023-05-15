
import * as React from 'react';
import * as Facebook from 'expo-facebook';
import { View, Alert, Button } from 'react-native';

const LoginFacebook = () => {

    async function logIn() {
        try {
            await Facebook.initializeAsync({
                appId: '1366011400590793',
            });
            const { type, token, expirationDate, permissions, declinedPermissions } =
                await Facebook.logInWithReadPermissionsAsync({
                    permissions: ['public_profile'],
                });
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            alert();
            Alert.alert('Logged in', `Facebook Login Error: ${message}`);

        }
    }

    return (
        <View>
            <Button title="Login" onPress={logIn}></Button>
        </View>
    )
}

export default LoginFacebook;