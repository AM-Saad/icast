import React from 'react'
import { ScrollView, Text } from 'react-native'
import styles from '../../../styles/Input'
import { Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import Button from '../../Common/Button';
import Input from '../../Common/Input';
import LoginFacebook from './Facebook';
import SelectBox from '../../Common/SelectBox';

interface Props {
    onSubmit: (values: any) => void;
    loading?: boolean,
    error?: null | string
}

export interface UserPayload {
    name: string;
    mobile: string;
    gender: string;
    password: string;
    confirmPassword: string;
}
const validationScheme = Yup.object({
    name: Yup.string()
        .required("Required"),
    mobile: Yup.string()
        .max(11, "Must be 11 characters").min(11, "Must be 11 characters")
        .required("Required"),
    gender: Yup.string()
        .required("Required"),
    password: Yup.string()
        .required("Required"),
    confirmPassword: Yup.string()
        .required("Required"),

})
const initialValues: UserPayload = { name: '', mobile: '', gender: '', password: '', confirmPassword: '', }
const Register: React.FC<Props> = ({ onSubmit, loading, error }) => {
    const submit = (values: UserPayload) => {
        onSubmit(values)
    }
    return (
        <>
            <Formik
                validationSchema={validationScheme}
                enableReinitialize
                initialValues={initialValues}
                onSubmit={(values) => submit(values)}
            >
                {({ handleChange, handleBlur, submitForm, values, errors, touched, setFieldValue }) => {
                    return (
                        <ScrollView >
                            <Input
                                label="Name"
                                placeholder="Enter your name.."
                                keyboardType="default"
                                onChange={handleChange('name')}
                                value={values.name}
                                handleBlur={handleBlur('name')}
                                hasError={errors.name && touched.name}
                                error={errors.name}
                            />
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
                            <SelectBox
                                label="Gender"
                                placeholder='Select Your Gender'
                                data={[{ label: 'Male', value: 'male' }, { label: 'Woman', value: 'woman' }]}
                                hasError={errors.gender && touched.gender}
                                error={errors.gender}
                                onSelect={(e) => setFieldValue('gender', e.value)} />

                            <Input
                                label="Password"
                                placeholder="Enter your password.."
                                keyboardType="default"
                                onChange={handleChange('password')}
                                secureTextEntry={true}
                                value={values.password}
                                handleBlur={handleBlur('password')}
                                hasError={errors.password && touched.password}
                                error={errors.password}
                            />

                            <Input
                                label="Confirm Password"
                                placeholder="Confirm your password.."
                                keyboardType="default"
                                onChange={handleChange('confirmPassword')}
                                secureTextEntry={true}
                                value={values.confirmPassword}
                                handleBlur={handleBlur('confirmPassword')}
                                hasError={errors.confirmPassword && touched.confirmPassword}
                                error={errors.confirmPassword}
                            />

                            <Button
                                loading={loading}
                                style={{ marginVertical: 25, marginLeft: 6 }}
                                click={submitForm} color="primary" size='medium' title={loading ? "Loading.." : "Register"} />
                            {/* <Text>Or</Text>
                            <LoginFacebook /> */}

                        </ScrollView>
                    )
                }}
            </Formik>

        </>
    )
}


export default Register