import React from 'react';
import DrmMoviePage from './presentation/pages/DrmMoviePage';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Toast from 'react-native-toast-message';
import {SafeAreaView, useColorScheme} from 'react-native';
import DrmMoviePlayerPage from './presentation/pages/DrmMoviePlayerPage';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {NavigationContainer} from '@react-navigation/native';

function App(): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    const Stack = createNativeStackNavigator();

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="DrmMoviePage">
                <Stack.Screen name="DrmMoviePage" component={DrmMoviePage} />
                <Stack.Screen name="DrmMoviePlayerPage" component={DrmMoviePlayerPage} />
            </Stack.Navigator>
            <Toast />
        </NavigationContainer>
    );
}

export default App;
