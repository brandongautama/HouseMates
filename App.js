import Firebase from "./src/components/Firebase";

global.Symbol = require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');

import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Image, View } from 'react-native';
import { Button, Icon } from 'native-base';

// These import paths may need to change depending on the directory hierarchy.
import WelcomeScreen from './src/screens/WelcomeScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import HouseSetupScreen from './src/screens/HouseSetupScreen';
import CreateTaskScreen from './src/screens/CreateTaskScreen';
import TabNavigation from './src/TabNavigation';
import LogInScreen from './src/screens/LogInScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import OptionsScreen from  './src/screens/OptionsScreen';
import EditTaskScreen from './src/screens/EditTaskScreen';

/*
THIS CODE ONLY WORKS FOR ANDROID. LEAVING FOR FUTURE IMPLEMENTATION

import PushNotificationIOS from 'react-native';
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function(token) {
        console.warn(token);
    },

    onNotification: function(notification) {
        setTimeout(() => {
            if(!notification['foreground']){ }
        }, 1);
        PushNotification.localNotificationSchedule({
            title: 'HouseMates Reminder',
            message: notification['name'], // (required)
            date: new Date(Date.now()) // in 60 secs
        });
    },

    senderID: "1062239771420",
    permissions: {
        alert: true,
        badge: true,
        sound: true
    },
    popInitialNotification: true,
    requestPermissions: true,
}); */

/**
 * Class required for top navigation bar's HouseMates Logo image.
 */
class LogoTitle extends React.Component {
    render() {
        return (
            <View style={{paddingLeft: 8}}>
               <Image source={require('./src/assets/HouseMatesPNGLogo_long_noBackground.png')}
                      style={{width: 180, height: 90}}
                      resizeMode='contain'
               />
            </View>
        );
    }
}

export const signOut = (navigation) => {
    Firebase.auth.signOut()
        .then( () => { navigation.navigate('LogIn') })
        .catch((error) => alert(error));
};

// Governs screen names as well as sets up the navigator. Required for screen traversal.
const RootStack = createStackNavigator(
    {
        Welcome: {
            screen: WelcomeScreen
        },
        LogIn: {
            screen: LogInScreen
        },
        ForgotPassword: {
            screen: ForgotPasswordScreen
        },
        SignUp: {
            screen: SignUpScreen
        },
        HouseSetup: {
            screen: HouseSetupScreen
        },
        TabNavigation: {
            screen: TabNavigation
        },
        CreateTask: {
            screen: CreateTaskScreen
        },
        Options: {
            screen: OptionsScreen
        },
        EditTask: {
            screen: EditTaskScreen
        }
    },
    {
        initialRouteName: 'Welcome', // Determines starting screen.

        //headerMode: 'screen',
        navigationOptions: ( {navigate, navigation} ) => ({
            headerTitle: <LogoTitle />,
            headerStyle: {
                backgroundColor: '#283350',
            },

            headerLeft:
                <Button transparent
                        style={{justifyContent: 'center', alignSelf: 'center'}}
                        onPress={ () => { signOut(navigation) }}>
                    <Icon style={{color: 'white'}} name='ios-log-out'/>
                </Button>,
            headerRight:
                <Button transparent
                        style={{justifyContent: 'center', alignSelf: 'center'}}
                        onPress={() => navigation.navigate('Options')}>
                    <Icon style={{color: 'white'}}
                          name="ios-menu"/>
                </Button>,
            headerTintColor: "white"
        })
    }
);

/**
 * Class initiates the app according to the navigator.
 */
export default class App extends React.Component {

    constructor(props) {
        super(props);
    }
    componentWillMount() {
        try {
            Firebase.init();
        } catch (error) {
            //do nothing -> multiple init calls
        }
    }

    render() {
        return <RootStack />;
    }
}
