import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

import Login from "../../components/model/Auth/LoginForm";
import Colors from "../../constants/colors";
import useHttp from "../../hooks/use-http";
import HookResponse from '../../modals/common/HookResponse'
import { ScrollView } from "react-native-gesture-handler";
interface Response {
  token: string,
  message: string,
  type: number,
  user: any
}
const Auth = ({ route, navigation }: any) => {
  const { error, isLoading, sendRequest } = useHttp()
  const [message, setMessage] = useState<{ text: string, type: number } | null>(null)

  const success = async (response: Response) => {
    console.log(response)
    await AsyncStorage.setItem(
      '@jwt',
      response.token
    );
    navigation.navigate('ModelProfile')
  }

  const submit = (values: { mobile: string, password: string }) => {
    const url = `${Constants.manifest?.extra!.apiUrl}/models/login`;
    sendRequest({
      url: url,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values),
    }, success);
  }

  useEffect(() => {
    if (route.params && route.params.message) {
      setMessage({ text: route.params.message, type: route.params.type });
    }
  }, [])

  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScrollView>

        {error &&
          <Text style={[styles.message, styles.errorMessage]}>
            {error}
          </Text>}
        {message &&
          <Text style={[styles.message, message.type === 2 && styles.successMessage, message.type === 1 && styles.errorMessage]}>
            {message.text}
          </Text>}

        <Login onSubmit={submit} loading={isLoading} />
      </ScrollView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    margin: 10,
    marginTop: 20,
    width: '95%',
  },
  message: {
    marginLeft: 8,
    marginBottom: 8,
  },
  errorMessage: {
    color: Colors.error,

  },
  successMessage: {
    color: Colors.success
  }

});

export default Auth