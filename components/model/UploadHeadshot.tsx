import React, { useState, useRef, useContext } from 'react'
import { Text, View, StyleSheet, Pressable, ScrollView, Platform } from "react-native";
import Colors from '../../constants/colors';
import CustomButton from '../Common/Button';
import ModalWrapper from '../Common/ModalWrapper';
import common from '../../styles/common'
import * as DocumentPicker from 'expo-document-picker';
import { Icon } from "@rneui/themed";
import { Video } from 'expo-av';
import ModelContext from '../../store/model_context';

interface Props {
    isUploadModelOpen: boolean,
    toggleModel: (state: boolean) => void
}
const UploaddIntroductoryVideo: React.FC<Props> = ({ isUploadModelOpen, toggleModel }) => {
    const [preview, setPreview] = useState<null | string>(null)
    const [isSizeExceeded, setIsSizeExceeded] = useState(false)
    const [videStatus, setVideStatus] = useState({});
    const [fileToUpload, setFileToUpload] = useState<any>(null)
    const video = useRef(null);
    const modelCtx = useContext(ModelContext)
    const { update_meta, upload_headshot } = modelCtx
    const upload = async () => {
        try {
            const formData = createFormData(fileToUpload)
            const state = await upload_headshot(formData)
            if (state === 0) {
                reset()
                toggleModel(false)

            }

        } catch (error) {
            return
        }
    }
    const pickDocument = async () => {
        let result: any = await DocumentPicker.getDocumentAsync({
            type: 'video/*'
        });
        setIsSizeExceeded(false)
        setPreview(null)
        let _size = result.size;
        let i = 0;
        while (_size > 900) { _size /= 1024; i++; }
        const exactSize = (Math.round(_size * 100) / 100);
        if (exactSize > 150) {
            return setIsSizeExceeded(true)
        }
        setPreview(result.uri)

        setFileToUpload(result)

    };
    const reset = ()=>{
        setFileToUpload(null)
        setPreview(null)
        setIsSizeExceeded(false)
    }


    const createFormData = (photo: any) => {
        const data = new FormData();
        const uriParts = photo.uri.split('.');
        const fileType = uriParts[uriParts.length - 1];
        data.append('image', {
            name: 'video',
            type: `video/${fileType}`,
            uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
        });

        return data;
    };

    return (
        <View>

            <ModalWrapper
                open={isUploadModelOpen}
                animationType="slide"
                style={{ paddingBottom: 30 }}
                close={() => {
                    toggleModel(false)
                    reset()
                }}
            >

                <Text style={[common.title]}>Upload Headshot Video</Text>

                <Text style={styles.info}>
                    Video should not exceed
                    <Text style={styles.bold}> 30 seconds</Text> and/or <Text style={styles.bold}>150 mb</Text>
                </Text>


                <ScrollView>
                    {(!preview || isSizeExceeded) && <Pressable onPress={pickDocument}>
                        <View style={styles.uploadInput}>
                            <Icon
                                name='cloud-upload'
                                type='material'
                                color="#ccc"
                                size={40}
                            />
                        </View>

                    </Pressable>}
                    {(preview && !isSizeExceeded) &&
                        <>
                            <View style={[common.shadow, styles.uploadInput]} >

                                <Video
                                    style={styles.video}
                                    ref={video}
                                    source={{ uri: preview }}
                                    useNativeControls
                                    isLooping
                                    // onError={(e) => console.error(e)}
                                    onPlaybackStatusUpdate={status => setVideStatus(() => status)}

                                />
                            </View>

                            <Pressable onPress={reset}>
                                <Text style={{ textAlign: 'right', marginRight: 20 }}>
                                    Reset
                                </Text>
                            </Pressable>

                        </>
                    }

                    {isSizeExceeded &&
                        <>
                            <Text style={[common.message, common.errorMessage, { marginHorizontal: 12 }]}>
                                Upload Videos only and the max size is<Text style={styles.bold}> 30 seconds</Text> and/or <Text style={styles.bold}>150 mb</Text>
                            </Text>
                        </>
                    }
                    {update_meta.error && <Text style={[common.message, common.errorMessage, { marginHorizontal: 12 }]}>
                        {update_meta.error}
                    </Text>}
                    <CustomButton loading={update_meta.loading} disabled={!fileToUpload} title={update_meta.loading ? 'Upload...' : 'Upload'} click={upload} size="small" color='primary' style={{ width: 90, height: 40 }} />

                </ScrollView>

            </ModalWrapper>
        </View>
    )
}

export default UploaddIntroductoryVideo


const styles = StyleSheet.create({

    title: {
        fontSize: 18,
        color: Colors.primary,
        marginVertical: 10,
        fontWeight: 'bold',
        textAlign: 'center',

    },
    info: {
        fontSize: 12,
        marginTop: 25,
        color: '#888',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bold: {
        fontWeight: 'bold'
    },
    uploadInput: {
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: Colors.primary,
        backgroundColor: '#eeeeee',
        height: 200,
        width: '100%',
        left: '0%',
        marginVertical: 12,
        borderRadius: 10,
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'

    },

    video: {
        height: '100%',
        width: '100%',
    }
})