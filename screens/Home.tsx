import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions } from 'react-native';
import Colors from '../constants/colors';
import Button from '../components/Common/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Home({ navigation }: any) {
    AsyncStorage.getItem('@jwt').then((token) => {
        if(token){
            navigation.navigate('ModelProfile')
        }
    }).catch((error) => {
        return 
    });


 
    return (
        <>
            <SafeAreaView style={styles.container}>
                <View >
                    <View style={styles.titlesContainer}>
                        <Text style={styles.brandName}>ICAST</Text>
                        <Text style={styles.subName}>Casting Agency</Text>
                    </View>
                    <Image style={styles.image} source={require('../assets/images/cam.png')} />
                    {/* <StatusBar style="auto" /> */}
                    <Text style={[styles.brandName, { fontSize: 40, marginBottom: 20 }]}>Are You!</Text>
                    <View style={styles.actionsContainer}>
                        <Button click={() => navigation.navigate('ModelLogin')} color="primary" size='large' title="Model" />
                        <Button click={() => navigation.navigate('ModelLogin')} color="primary" size='large' title="Client" />
                    </View>

                </View>
            </SafeAreaView>
        </>
    )
}

const gap = 20;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        paddingTop: 30,
    },
    titlesContainer: {
        flex: 2,
        marginTop: 40
    },
    brandName: {
        fontSize: 60,
        textAlign: 'center',
        color: Colors.primary,
    },
    subName: {
        textAlign: 'center',
        fontSize: 15,

    },
    image: {
        flex: 4,
        height: 350,
        width: 350,
        transform: [
            { perspective: 850 },
            { translateX: - Dimensions.get('window').width * 0.24 },
            { rotateY: '30deg' },

        ],
    },
    actionsContainer: {
        flex: 3,
        flexDirection: 'row',
        marginHorizontal: gap / 2,

    }
});
export default Home