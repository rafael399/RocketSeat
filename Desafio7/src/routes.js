import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './pages/Home';
import Cart from './pages/Cart';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Home,
      Cart,
    },
    {
      headerLayoutPreset: 'left',
      headerBackTitleVisible: false,
      defaultNavigationOptions: {
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 10,
        },
        title: 'ROCKETSHOES',
        headerStyle: {
          backgroundColor: '#191920',
        },
        headerTintColor: '#FFF',
      },
    }
  )
);

export default Routes;
