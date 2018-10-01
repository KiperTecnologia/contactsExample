import { createStackNavigator } from 'react-navigation';
import Home from '../Components/Home';
import Contacts from '../Containers/Contacts';
import Animations from '../Containers/Animations';

export default createStackNavigator(
  {
    home: Home,
    contacts: Contacts,
    animations: Animations
  },
  {
    initialRouteName: 'home',
    navigationOptions: {
      header: null
    }
  }
);
