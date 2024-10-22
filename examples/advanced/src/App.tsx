import React from 'react';
import DrmMoviePage from './presentation/pages/DrmMoviePage';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Toast, { BaseToast, BaseToastProps, ToastConfig } from 'react-native-toast-message';
import { SafeAreaView, useColorScheme } from 'react-native';
import DrmMoviePlayerPage from './presentation/pages/DrmMoviePlayerPage';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { NavigationContainer } from '@react-navigation/native';


const toastProps: BaseToastProps = {
    text1Style: {
        fontSize: 18,
    },
    text2Style: {
        fontSize: 14,
    },
    text2NumberOfLines: 0,
    style: {
        height: "auto",
        paddingVertical: 10,
        paddingHorizontal: 0,
    },
};

export const toastConfig: ToastConfig = {
    success: (props) => (
        <BaseToast
            {...props}
            {...toastProps}
            style={[
                toastProps.style,
                {
                    borderLeftColor: "#69C779",
                },
            ]}
        />
    ),
    error: (props: BaseToastProps) => (
        <BaseToast
            {...props}
            {...toastProps}
            style={[
                toastProps.style,
                {
                    borderLeftColor: "#FE6301",
                },
            ]}
        />
    ),
    warning: (props) => (
        <BaseToast
            {...props}
            {...toastProps}
            style={[
                toastProps.style,
                {
                    borderLeftColor: "#FFC107",
                },
            ]}
        />
    ),
};

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
            <Toast config={toastConfig} />
        </NavigationContainer>
    );
}

export default App;
