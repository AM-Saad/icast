import React, { useState, useContext, useRef } from 'react'
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { Media } from '../../../modals/models/model'
import { Video } from 'expo-av';
import MediaViewer from './MediaViewer';
import ModelContext from '../../../store/model_context';
import common from '../../../styles/common';

const MediaGrid: React.FC = () => {
    const [currentMedia, setCurrentMedia] = useState<Media>({ path: '', media_type: 's' })
    const modelCtx = useContext(ModelContext)
    const { user } = modelCtx
    const refe: any = useRef(null);

    const openMedia = (item: any) => {
        refe.current!.toggleModel(true)
        setCurrentMedia({ path: item.path, media_type: item.media_type })
    }
    return (
        <View style={{ height: 300 }}>

            {/* Modal to show selected media */}
            <MediaViewer currentMedia={currentMedia} ref={refe} />

            <View>
                <Text style={common.title}>Your Media</Text>
                {user!.media.length === 0 &&
                    <View style={styles.fallback}>
                        <Text style={styles.fallbackText}>Show us your talent ⭐️ </Text>
                        <Text style={styles.fallbackText}>Add samples of your work</Text>
                    </View>
                }

                {user!.media.length > 0 &&
                    <ScrollView>
                        <View style={styles.grid}>
                            {user!.media.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.gridItem}
                                        onPress={() => openMedia(item)}
                                    >
                                        {item.media_type === 'image' &&
                                            <Image
                                                style={styles.image}
                                                source={{ uri: item.path }}
                                                resizeMode="cover"
                                            />
                                        }
                                        {item.media_type === 'video' &&
                                            <Video
                                                style={styles.image}
                                                source={{ uri: item.path }}
                                            />
                                        }
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </ScrollView>
                }
            </View>

        </View>

    )
}
const styles = StyleSheet.create({

    fallback:{
        padding:3,
        marginTop:40,
    },  
    fallbackText:{
        textAlign: 'center',
        marginBottom:10,
        fontSize:20,
        color:'#888'

    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
    },
    gridItem: {
        width: '48%',
        backgroundColor: '#eee',
        borderWidth: .5,
        borderColor: '#b9b9b9',
        margin: 3,
        borderRadius: 5,
        overflow: 'hidden'
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderRadius: 5,
        aspectRatio: 1,
        resizeMode: 'cover',

    }

})
export default MediaGrid