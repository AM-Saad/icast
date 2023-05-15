import { useEffect, useRef, useState } from 'react'
import { Text, View, Pressable, StyleSheet } from "react-native";

import { Video, AVPlaybackStatus } from 'expo-av';
import { Icon } from "@rneui/themed";
import Colors from '../../constants/colors';
import common from '../../styles/common';
import Button from '../Common/Button';
import UploaddHeadshot from './UploadHeadshot';
import CustomButton from '../Common/Button';
import Constants from 'expo-constants';

interface Props {
    video_url: any,

}
const Headshot: React.FC<Props> = ({ video_url }) => {
    const video = useRef(null);
    const [videStatus, setVideStatus] = useState({});
    const [isUploadModelOpen, setIsUploadModelOpen] = useState<boolean>(false)
    const url = Constants.manifest?.extra!.apiUrl;
    const [videoUrl, setVideoUrl] = useState<string>(`${url}${video_url}`)
    useEffect(() => {
        setVideoUrl(`${url}${video_url}`)
    }, [video_url])
    return (
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                <Text style={common.title}>Headshot</Text>
                {video_url && <Pressable onPress={() => {
                    console.log('g')
                    setIsUploadModelOpen(true)
                }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>Change</Text>
                        <Icon
                            name='redo'
                            type='material'
                            color={Colors.primaryLight}
                            size={20}
                        />
                    </View>
                </Pressable>}
            </View>
            <View style={{ marginBottom: 10 }}>
                {video_url &&
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>

                        <Video
                            ref={video}
                            style={[styles.video, common.shadow]}
                            source={{ uri: videoUrl }}
                            useNativeControls
                            isLooping
                            onPlaybackStatusUpdate={status => setVideStatus(() => status)}
                        />
                    </View>}


                {!video_url &&
                    <>
                        <View>
                            <View style={styles.warningBox}>
                                <Icon
                                    name='warning'
                                    type='material'
                                    color='#ecbd46'
                                    size={28}
                                    style={{ marginRight: 10 }}
                                />
                                <Text style={[common.title, styles.warningText]}>Upload the Headshot video in order to get selected swiftly.</Text>

                            </View>
                            <Text style={[common.title, { fontSize: 16, textAlign: 'right' }]}>Know How!</Text>
                        </View>

                        <View style={[styles.video, common.shadow]}>
                            <Icon
                                name='movie-filter'
                                type='material'
                                color={Colors.primary}
                                size={100}
                            />
                            <CustomButton title='Upload' click={() => setIsUploadModelOpen(true)} size="small" color='secondary' style={{ width: 100, height: 30 }} />
                        </View>

                    </>
                }

                <UploaddHeadshot
                    toggleModel={(state: boolean) => setIsUploadModelOpen(state)}
                    isUploadModelOpen={isUploadModelOpen}
                />

            </View>
        </View>
    )
}


export default Headshot

const styles = StyleSheet.create({

    title: {
        fontSize: 18,
        color: Colors.secondary,
        marginVertical: 10
    },
    warningBox: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    warningText: {
        fontSize: 13,
        textAlign: 'left',
        color: '#b19244',
        width: '90%'
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