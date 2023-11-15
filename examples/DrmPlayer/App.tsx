/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Splash from './src/Splash';
import Login from './src/Login';


const stack = createNativeStackNavigator();


function App()  {
  
return(
<NavigationContainer>
  <stack.Navigator>
  <stack.Screen
  name = "Splash"
  component={Splash}
  />

<stack.Screen
  name = "Login"
  component={Login}
  />
  </stack.Navigator>
</NavigationContainer>
);

}


export default App;
