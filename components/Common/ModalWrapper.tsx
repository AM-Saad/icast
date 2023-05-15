import { StyleSheet, View, Modal, TouchableWithoutFeedback, Pressable, TouchableNativeFeedback } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

import common from '../../styles/common'

interface Props {
    open: boolean,
    close: () => void,
    children: React.ReactNode,
    style?: any,
    animationType?: "none" | "fade" | "slide" | undefined
}
const ModalWrapper: React.FC<Props> = ({ open, close, children, style, animationType }) => {

    return (
        <Modal visible={open} transparent animationType={animationType ? animationType : 'fade'}>
            <Pressable onPress={(e) => {
                e.stopPropagation()
                close()
            }} style={styles.overlay}>
                <TouchableWithoutFeedback>

                    <View
                        onTouchEnd={(e) => e.stopPropagation()}
                        style={[styles.content, common.shadow, style]}>
                        {children}
                    </View>
                </TouchableWithoutFeedback>

            </Pressable>
        </Modal >
    )
}

export default ModalWrapper

const styles = StyleSheet.create({
    overlay: {
        width: '100%',
        height: '100%',
        backgroundColor: '#06060652',
        position: "relative",
        zIndex: -1,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', //Centered vertically,
        alignContent: 'center',
    },
    content: {
        backgroundColor: '#fff',
        width: '90%',
        borderRadius: 10,
        zIndex: 99999,
        maxHeight: '70%',
        minHeight:200,
        padding:15

    },
})