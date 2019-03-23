import {Component} from "react";
import { Image, ImageBackground, StyleSheet, View} from "react-native";
import Button from 'react-native-button';
import React from "react";
import { idExists } from '../components/DatabaseAPI';

export default class WelcomeScreen extends Component {
    // Constructor initializes name, phoneNumber, joinCode, and houseName to "".
    constructor(props) {
        super(props);
    }

    // Rids the sign up screen of the navigation bar that comes standard with 'react-navigation'.
    static navigationOptions = {
        header: null
    };

    /**
     * handleSubmit_LogIn()
     * When the "LOG IN" button is pressed, this function is called.
     * It simply proceeds to the log in screen.
     */
    onLoginSubmit = () => {
        this.props.navigation.navigate("LogIn");
    };

    /**
     * handleSubmit_SignUp()
     * When the "Sign Up" button is pressed, this function is called.
     * It simply proceeds to the sign up screen.
     */
    onSignUpSubmit = () => {
        this.props.navigation.navigate("SignUp")
    };

    /**
     * render()
     * Layout for the sign up screen.
     * WARNING! Image path may need to be updated depending on directory hierarchy.
     * @returns {Layout}
     */
    //source={require("../assets/HouseMates_splashBackground_crop02.png")}>
    render() {
        const resizeMode = 'cover';
        return (
            <ImageBackground style={{flex: 1, height: '100%', resizeMode}}
                             source={require("../assets/bg1.png")}>
                <View style={styles.logoContainerStyle}>
                    <Image style={styles.logoStyle}
                           source={require("../assets/HouseMates_Icon_03.png")}
                           resizeMode="contain"/>
                </View>

                <View style={{flex: 3}}>
                    <View style={styles.box_Form01}>
                        <Button style={styles.buttonStyle}
                                onPress={this.onLoginSubmit}
                                containerStyle={styles.buttonContainerStyle}>
                            LOG IN
                        </Button>
                    </View>
                    <View style={[styles.box_Form02]}>
                        <Button style={styles.buttonStyle} 
                                onPress={this.onSignUpSubmit} 
                                containerStyle={styles.buttonContainerStyle}>
                            SIGN UP
                        </Button>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

// StyleSheet for the sign up screen.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#283350'
    },
    logoContainerStyle: {
        flex: 4,
        marginTop: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    logoStyle: {  
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center', 
        height: '70%',
        width: '70%',
        resizeMode:'contain',
        backgroundColor: 'white',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '10%'
    },
    box_Form01: {
        flex: 5,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 5
    },
    box_Form02: {
        flex: 5,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 10,
        marginBottom: '55%'
    },
    buttonContainerStyle: {
        padding: 12,
        height: 40,
        width: 260, 
        overflow: 'hidden', 
        borderRadius: 20,
        backgroundColor: '#cccccc'
    },
    buttonStyle: {
        fontSize: 14,
        color: 'white', 
        alignSelf: 'center',
        justifyContent: 'center',
    }
});
