import { Header } from '@react-navigation/stack';
import MyMenu from './Menu';
const MyHeader: React.FC<any> = ({ navigation, title }) => {
    return (
        <Header
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'My App', style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
      />
    );
};