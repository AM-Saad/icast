import React from 'react'
import { Text, View } from "react-native";
import common from '../../styles/common';
import { useNavigation } from '@react-navigation/native';
import Button from './Button';

interface Props {
    message: string;
    buttonTitle: string;
    buttonClicked: () => void
    retry?: () => void
}
const ErrorBox: React.FC<Props> = ({ message, buttonTitle, buttonClicked, retry }) => {
    const navigation = useNavigation();

    return (
        <View style={[common.screenContainer, {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }]}>
            <Text style={[common.message, common.errorMessage, { fontSize: 18 }]}>
                Something went wrong
            </Text>
            <Text style={[common.message]}>{message}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>

                {retry &&
                    <>
                        <Button
                            click={retry}
                            color="primary" size='small' title={'Retry'} style={{ marginRight: 20 }} />
                        <Text>Or</Text>
                    </>

                }
                <Button
                    click={buttonClicked}
                    color="secondary" size='small' title={buttonTitle} style={{ marginLeft: retry ? 20 : 0 }} />
            </View>
        </View>
    )
}

export default ErrorBox