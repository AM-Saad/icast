import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom:13,
        width: '98%',
        margin:'auto',
        marginLeft:'1%'
    },
    label: {
        color: '#333',
        fontSize:20,
        left: 8
    },
    input: {
        height: 40,
        borderRadius:50,
        backgroundColor:'#fff',
   
        paddingLeft:10,
    },
    error: {
        color: '#ff0400',
        fontSize:12,
        marginTop:3,
        marginLeft:15,
    }
}); 
export default styles;