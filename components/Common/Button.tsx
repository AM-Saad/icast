import { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

import Colors from '../../constants/colors'
interface Props {
    title: string;
    size: string
    color: string
    click: () => void;
    style?: any,
    loading?: boolean
    disabled?: boolean
}
const Button: React.FC<Props> = ({ title, size, color, click, style, loading, disabled }) => {
    return (

        <View style={{ overflow: 'hidden' }}>
            <Pressable disabled={loading || disabled} style={[styles.button(color, size, disabled, loading), style]} onPress={click} android_ripple={{ color: Colors.primaryLight }}>
                <Text style={styles.text(color, size)}>{title}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    button: (color: string, size: string, disabled: boolean, loading: boolean): any => {
        const bgColor = color === 'primary' ? Colors.primary : '#fff'
        const borderColor = color === 'primary' ? '#fff' : Colors.primary
        const height = size === 'large' ? 53 : 40
        const width = size === 'large' ? 160 : 140
        const opacity = loading || disabled ? '0.8' : '1'
        return {
            height: height,
            width: width,
            borderRadius: 50,
            borderColor: borderColor,
            backgroundColor: bgColor,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1.2,
            overflow: "hidden",
            opacity: Number(opacity)
        }
    },
    text: (color: string, size: string): any => {
        const textcolor = color !== 'primary' ? Colors.primary : '#fff'
        const textsize = size !== 'large' ? 16 : 22
        return {
            color: textcolor,
            fontSize: textsize
        }
    }
})

export default Button