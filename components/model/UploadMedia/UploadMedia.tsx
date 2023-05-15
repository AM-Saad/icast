import React, { useState, useContext } from 'react'
import ModalWrapper from '../../Common/ModalWrapper';
import { Text, View, Pressable, StyleSheet, Platform, Image } from "react-native";
import Colors from '../../../constants/colors';
import common from '../../../styles/common';
import * as ImagePicker from 'expo-image-picker';
import CustomButton from '../../Common/Button';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../firebase';
import * as DocumentPicker from 'expo-document-picker';
import { Icon } from "@rneui/themed";
import ModelContext from '../../../store/model_context';
import { Video } from 'expo-av';

const UploadMedia = () => {
    const [isUploadModelOpen, setIsUploadModelOpen] = useState<boolean>(false)
    const [fileToUpload, setFileToUpload] = useState<any>()
    const [preview, setPreview] = useState<any>('')
    const [fileType, setFileType] = useState<null | string>(null)



    const modelCtx = useContext(ModelContext)
    const { update_meta, upload_media } = modelCtx
    const [isSizeExceeded, setIsSizeExceeded] = useState<boolean>(false)
    const [isUploading, setIsUploading] = useState<boolean>(false)

    const pickFile = async () => {
        let result: any = await DocumentPicker.getDocumentAsync();
        // console.log(result.uri);
        setIsSizeExceeded(false)
        setPreview(null)
        let _size = result.size;
        // const fSExt = new Array('Bytes', 'KB', 'MB', 'GB')
        let i = 0;
        while (_size > 900) { _size /= 1024; i++; }
        const exactSize = (Math.round(_size * 100) / 100);
        if (exactSize > 999) {
            return setIsSizeExceeded(true)
        }
        const uploadUri = Platform.OS === 'ios' ? result.uri.replace('file://', '') : result.uri;
        let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        const response = await fetch(uploadUri);
        const blob = await response.blob()
        setPreview(result.uri)
        console.log(blob.type)
        setFileToUpload({ blob: blob, fileName: fileName, type: blob.type })

    };
    // const pickImage = async () => {
    //     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    //     if (status !== 'granted') {
    //         // Alert('Sorry, we need camera roll permissions to make this work!');
    //     }

    //     if (status === 'granted') {
    //         const response = await ImagePicker.launchImageLibraryAsync({
    //             mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //             base64: true,
    //         });
    //         if (!response.cancelled) {
    //             // Set the Blob object as the file to upload
    //             setFileToUpload(response);
    //         }
    //     }
    // };

    const uploadFile = async () => {
        if (fileToUpload == null) {
            return null;
        }
        try {
            setIsUploading(true)

            const storageRef = ref(storage, `models/${fileToUpload.fileName}`);
            const snapshot = await uploadBytesResumable(storageRef, fileToUpload.blob, { contentType: fileToUpload.type });
            const url = await getDownloadURL(snapshot.ref);
            const state = await upload_media(url, fileToUpload.blob.type.split('/')[0])
            if (state === 0) {
                closeModel()
            }
            setIsUploading(false)

        } catch (error) {
            console.log(error)
        }
    };


    const closeModel = () => {
        setFileType(null)
        setIsUploadModelOpen(false)
        setFileToUpload(null)
    }


    return (
        <>
            {/* Open Upload Dialog Button */}
            <View style={{ flex: 1 }}>
                <Pressable style={[styles.uploadNewBtn, common.shadow]} onPress={() => setIsUploadModelOpen(true)}>
                    <Text style={styles.uploadNewBtnText}>+</Text>
                </Pressable>
            </View>


            <ModalWrapper
                open={isUploadModelOpen}
                close={closeModel}
                animationType="fade"
                style={{ paddingBottom: 10, minHeight: 250 }}
            >

                <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                    <Text style={[common.title]}>Upload File</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Pressable onPress={closeModel}>
                            <Icon
                                name='close'
                                type='material'
                                color={Colors.primaryLight}
                                size={15}
                                style={{ padding: 5, borderWidth: 1, borderRadius: 50, borderColor: Colors.primaryLight, marginRight: 5 }}
                            />
                        </Pressable>
                    </View>
                </View>

                {/* Upload Field */}
                <>
                    <Pressable onPress={pickFile}>
                        {!fileToUpload &&
                            <View style={styles.uploadArea}>
                                <Icon
                                    name='cloud-upload'
                                    type='material'
                                    color="#ccc"
                                    size={50}
                                />
                            </View>
                        }
                        {fileToUpload &&
                            <View>

                                {/video/.test(fileToUpload.type) &&
                                    <Video
                                        source={{ uri: preview }}
                                        style={styles.video}

                                        useNativeControls
                                        isLooping
                                    // onPlaybackStatusUpdate={status => setVideStatus(() => status)}
                                    />
                                }
                                {/image/.test(fileToUpload.type) &&
                                    <Image
                                        style={styles.video}
                                        source={{ uri: preview }}
                                    />
                                }
                            </View>
                        }


                    </Pressable>
                    <CustomButton loading={update_meta.loading || isUploading} disabled={!fileToUpload} title={update_meta.loading || isUploading ? 'Upload...' : 'Upload'} click={uploadFile} size="small" color='primary' style={{ width: 90, height: 40 }} />
                </>





            </ModalWrapper>

        </>

    )
}

export default UploadMedia

const styles = StyleSheet.create({
    uploadNewBtn: {
        height: 60,
        width: 60,
        backgroundColor: '#72D07B',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        top: -10,
        right: -10,

    },
    uploadNewBtnText: {
        color: '#fff',
        fontSize: 30,
        lineHeight: 35
    },
    title: {
        fontSize: 18,
        margin: 10,
        color: Colors.primary
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    uploadArea: {
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: Colors.primary,
        backgroundColor: '#eeeeee',
        height: 200,
        width: '100%',
        left: '0%',
        marginVertical: 12,
        borderRadius: 10,
        justifyContent: 'center',
        overflow: 'hidden'
    },
    video: {
        height: 200,
        width: "100%",
        backgroundColor: '#F1F1F1',
        borderRadius: 8,
        marginBottom: 10,
        padding: 15,
        alignItems: 'center',
    },

})