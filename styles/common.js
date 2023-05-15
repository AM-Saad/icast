import { StyleSheet } from 'react-native';
import Colors from '../constants/colors';
const styles = StyleSheet.create({
    screenContainer: {
        margin: 10,
        marginTop: 20,
        width: '90%',
        marginLeft:'5%'
    },
    title:{
        fontSize: 18,
        color: Colors.secondary,
        marginBottom: 10,
        fontWeight:'bold'
    },
    message: {
        marginBottom: 8,
        textAlign: 'center',
      
    },
    errorMessage: {
        color: Colors.error,
    },
    shadow: {
        shadowColor: '#000001',
        shadowOpacity: .2,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        elevation: 4,
    },
    textCenter: {
        textAlign: 'center',
    }
});
export default styles;