import { createStackNavigator } from 'react-navigation';
import Home from '../Containers/Home';

export default createStackNavigator(
  {
    home: Home
  },
  {
    initialRouteName: 'home',
    navigationOptions: {
      header: null
    }
  }
);
