import React, { useState, useImperativeHandle, forwardRef } from 'react'
import { View, Image, StyleSheet, Pressable } from "react-native";
import { Video } from 'expo-av';
import ModalWrapper from '../../Common/ModalWrapper';
import Colors from '../../../constants/colors';
import { Icon } from "@rneui/themed";

interface Props {
    currentMedia: any
}

const MediaViewer = forwardRef<any, Props>(({ currentMedia }, ref) => {
    const [isModelOpened, setIsModelOpen] = useState(false)

    useImperativeHandle(ref, () => ({
        toggleModel(val: boolean) {
            setIsModelOpen(val)
        }
    }))
    return (
        <ModalWrapper open={isModelOpened} close={() => setIsModelOpen(false)}>
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Pressable onPress={() => setIsModelOpen(false)}>
                        <Icon
                            name='close'
                            type='material'
                            color={Colors.primaryLight}
                            size={15}
                            style={{ padding: 5, borderWidth: 1, borderRadius: 50, borderColor: Colors.primaryLight, marginRight: 5 }}
                        />
                    </Pressable>
                </View>

                {currentMedia && currentMedia.media_type === 'image' &&

                    <View style={styles.mediaContainer}>
                        <Image
                            style={styles.media}
                            source={{ uri: currentMedia.path }}
                            borderRadius={5}
                        />
                    </View>
                }

                {currentMedia && currentMedia.media_type === 'video' &&
                    <View style={styles.mediaContainer}>
                        <Video
                            style={styles.media}
                            source={{ uri: currentMedia.path }}
                            useNativeControls
                            isLooping

                        />
                    </View>
                }

            </View>
        </ModalWrapper>

    )


})

const styles = StyleSheet.create({


    mediaContainer: {
        width: '100%',
        aspectRatio: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    media: {
        flex: 1,
        borderRadius: 5,
    },



})
export default MediaViewer