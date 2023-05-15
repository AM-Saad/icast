import { View, Text, TextInput, KeyboardTypeOptions } from 'react-native'
import styles from '../../styles/Input'
import common from '../../styles/common'
interface Props {
    label: string,
    placeholder: string,
    onChange: (data: any) => void,
    defaultVal?: string,
    keyboardType: KeyboardTypeOptions,
    secureTextEntry?: boolean,
    value?: any
    handleBlur?: any,
    hasError?: boolean | undefined | any,
    error?: string
}

const Input: React.FC<Props> = ({ label, onChange, placeholder, keyboardType, secureTextEntry, value, handleBlur, hasError, error }) => {

    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.input, common.shadow]}
                onChangeText={onChange}
                placeholder={placeholder}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                value={value}
                onBlur={handleBlur}

            />
            {hasError &&
                <Text style={styles.error}>{error}</Text>
            }
        </View>
    )
}

export default Input
