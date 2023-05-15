import { SafeAreaView, StyleSheet, Text } from "react-native";

import RegisterForm, { UserPayload } from "../../components/model/Auth/RegisterForm";
import useHttp from "../../hooks/use-http";
import HookResponse from '../../modals/common/HookResponse'
import { useNavigation } from '@react-navigation/native';
import common from "../../styles/common"
interface Response {
  message: string;
  type: number
  user: any
}

const RegisterScreen = () => {
  const { error, isLoading, sendRequest } = useHttp()
  const navigation = useNavigation();


  const success = (response: HookResponse<Response>) => {
    console.log(response)
    navigation.navigate('ModelLogin', { message: response.message, type: response.type })
  }

  const submit = (values: UserPayload) => {
    const url = process.env.SERVER_URL || "http://192.168.1.8:8000"
    sendRequest({
      url: `${url}/models/signup`,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values),
    }, success);
  }

  const onFailure = (response: any) => {
    alert('Login failed 🥲')
  }


  return (
    <SafeAreaView style={common.screenContainer}>
      {error && <Text style={[common.message, common.errorMessage]}>{error}</Text>}
      <RegisterForm onSubmit={submit} loading={isLoading} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

});

export default RegisterScreen