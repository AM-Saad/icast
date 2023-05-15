import React, { useState, useRef, useContext } from 'react'
import { StyleSheet, Text } from "react-native";

import { useQuery } from 'react-query'
import common from '../../styles/common';
import Colors from '../../constants/colors';
import UploadMedia from '../../components/model/UploadMedia/UploadMedia';
import Headshot from '../../components/model/Headshot';
import Media from '../../components/model/Media/Media';
import ErrorBox from '../../components/Common/ErrorBox';
import { ScrollView } from 'react-native-gesture-handler';
import ModelContext from '../../store/model_context';
const Profile = ({ navigation }: any) => {
    const modelCtx = useContext(ModelContext)
    const { user, meta, get_me } = modelCtx

    return (
        <>

            {meta.loading && (
                <Text>Loading data..</Text>
            )}

            {!meta.loading && meta.error && (
                <ErrorBox message={meta.error} buttonTitle="Login" retry={get_me} buttonClicked={() => navigation.navigate('ModelLogin')} />
            )}

            {(!meta.loading && !meta.error && user) &&
                <ScrollView style={[common.screenContainer, { flex: 1, position: 'relative', minHeight: 100 }]}>

                    <Text style={styles.greeting}>Hi, {user.name}</Text>

                    <Headshot video_url={user.headshot} />

                    <Media />

                    <UploadMedia />

                </ScrollView>
            }
        </>

    )
}
export default Profile
const styles = StyleSheet.create({


    greeting: {
        fontSize: 32,
        color: Colors.secondary,
        marginBottom: 8
    },


})