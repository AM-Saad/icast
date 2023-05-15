import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { Formik } from "formik";
import * as Yup from "yup";
import Button from '../../../components/Common/Button';
import Input from '../../../components/Common/Input';
import LoginFacebook from './Facebook';
import { useNavigation } from '@react-navigation/native';
interface Props {
    onSubmit: (values: any) => void;
    loading?: boolean,
    error?: null | string
}

const validationScheme = Yup.object({
    mobile: Yup.string()
        .max(11, "Must be 11 characters").min(11, "Must be 11 characters")
        .required("Required"),
    password: Yup.string()
        .required("Required"),

})
const LoginForm: React.FC<Props> = ({ onSubmit, loading, error }) => {
    const navigation = useNavigation();
    const submit = (values: { mobile: string; password: string }) => {
        onSubmit(values)
    }
    return (
        <>
            <Formik
                validationSchema={validationScheme}

                initialValues={{ mobile: '', password: '' }}
                onSubmit={(values) => submit(values)}

            >
                {({ handleChange, handleBlur, handleSubmit, submitForm, values, errors, touched }) => {

                    return (
                        <View >
                            <Input
                                label="Mobile"
                                placeholder="Enter your mobile number.."
                                keyboardType="numeric"
                                onChange={handleChange('mobile')}
                                value={values.mobile}
                                handleBlur={handleBlur('mobile')}
                                hasError={errors.mobile && touched.mobile}
                                error={errors.mobile}
                            />

                            <Input
                                label="Password"
                                placeholder="Enter your mobile number.."
                                keyboardType="default"
                                onChange={handleChange('password')}
                                secureTextEntry={true}
                                value={values.password}
                                handleBlur={handleBlur('password')}
                                hasError={errors.password && touched.password}
                                error={errors.password}
                            />



                            <Button
                                loading={loading}
                                style={{ marginVertical: 25, marginLeft: 6 }}
                                click={submitForm} color="primary" size='medium' title={loading ? "Loading.." : "Login"} />
                            <Text>Or</Text>
                            <LoginFacebook />

                            <Text>You don’t have an account yet!</Text>
                            <Pressable onPress={() => navigation.navigate('ModelRegister')}>

                                <Text>
                                    Register Here
                                </Text>
                            </Pressable>
                        </View>
                    )
                }}
            </Formik>

        </>
    )
}


export default LoginForm