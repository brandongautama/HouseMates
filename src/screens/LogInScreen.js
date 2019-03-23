import {Component} from "react";
import { Image, KeyboardAvoidingView, StyleSheet, View} from "react-native";
import Button from 'react-native-button';
import React from "react";
import tForm from 'tcomb-form-native';
import Firebase from "../components/Firebase";
import firebase from 'firebase';

// Form and User initialize the user input fields.
const Form = tForm.form.Form;
const User = tForm.struct({
    e_mail: tForm.String,
    password: tForm.String
});

export default class WelcomeScreen extends Component {
    // Constructor initializes name, phoneNumber, joinCode, and houseName to "".
    constructor(props) {
        super(props);
        this.state = { e_mail: "", password: "" };
        this.onChange=this.onChange.bind(this);
    }

    // Rids the sign up screen of the navigation bar that comes standard with 'react-navigation'.
    static navigationOptions = {
        header: null
    };

    /**
     * handleSubmit_LogIn()
     * When the "LOG IN" button is pressed, this function is called.
     * It grabs the values in all input boxes and prints them to the console.
     * Then proceeds to the next screen if no values were null.
     * TODO: Update database with given values.
     */
    handleSubmit_LogIn = () => {
        const value = this._form.getValue();

        // If password and email match database, log in.
        if (value) {
            //store user info in Firebase object (might be useful later on)
            Firebase.userInfo = {userEmail: value.e_mail, userPass: value.password};
            //sign the user in with given credentials -> alert with message if they already exist
            firebase.auth()
                .signInWithEmailAndPassword(value.e_mail, value.password)
                .then( () => { 
                    const { currentUser } = firebase.auth();

                    firebase.database().ref(`/users/${currentUser.uid}/has_house`)
                        .on('value', (snapshot) => {
                            const has_house = snapshot.val();
                            if (has_house) {
                                this.props.navigation.navigate("TabNavigation");
                            } else{
                                this.props.navigation.navigate("HouseSetup");
                            }
                        });

                })
                .catch((err) => { alert(err)});
        }
    };

    /**
     * handleSubmit_SignUp()
     * When the "Sign Up" button is pressed, this function is called.
     * It simply proceeds to the sign up screen.
     */
    handleSubmit_SignUp = () => {
        this.props.navigation.navigate("SignUp")
    };

    handleSubmit_ForgotPassword = () => {
        this.props.navigation.navigate("ForgotPassword")
    };

    /**
     * onChange()
     * When a value is changed in one of the fields, this allows the information to remain present even after
     * the screen refreshes.
     * @param value
     */
    onChange(value) {
        this.setState({value});
    };

    /**
     * render()
     * Layout for the sign up screen.
     * WARNING! Image path may need to be updated depending on directory hierarchy.
     * @returns {Layout}x
     */
    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style = {styles.container}>
                    <View style={[styles.box_Logo]}>
                        <Image style={{flex:1, height:undefined, width:undefined}}
                               source={require("../assets/HouseMates_Logo_Circle.png")}
                               resizeMode="contain"/>
                    </View>
                    <View style={[styles.box_Form]}>
                        <Form ref={c => this._form = c}
                              type={User}
                              value={this.state.value}
                              onChange={this.onChange}
                              options={options}/>
                        <Button style={{fontSize: 16, color: 'white', alignSelf: 'center'}}
                                onPress={this.handleSubmit_LogIn}
                                containerStyle={{ padding: 8, height: 38, overflow: 'hidden', borderRadius: 20,
                                    backgroundColor: '#415180' }}>
                            LOG IN
                        </Button>
                        <Button style={{fontSize: 14, alignSelf: 'center'}}
                                onPress={this.handleSubmit_ForgotPassword}
                                containerStyle={{ padding: 8, height: 38, overflow: 'hidden', borderRadius: 20,
                                    backgroundColor: 'transparent' }}>
                            FORGOT PASSWORD
                        </Button>
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

// The following edits the style of the form. This format is required for the API.
const formStyles = {
    ...Form.stylesheet,
    //
    controlLabel: {
        normal: {
            color: 'white',
            fontSize: 14
        },
        error: {
            color: 'red',
            fontSize: 14
        }
    },
    textbox: {
        normal: {
            color: 'black',
            borderWidth: 1,
            borderColor:'#E5E5E5',
            backgroundColor: 'white',
            borderRadius: 20,
            height: 36,
            marginBottom: 8,
            padding: 10
        },
        error: {
            color: 'white',
            borderWidth: 1,
            borderColor:'#415180',
            height: 36,
            marginBottom: 5
        }
    },
    buttonText: {
        fontSize: 18,
        color: 'white'
    },
    button: {
        backgroundColor: '#ffd344',
        borderWidth: 1,
        borderRadius: 20,
        alignSelf: 'stretch',
        justifyContent: 'center',
    }
};

// The following edits the fields of the form. This format is required for the API.
const options = {
    auto: 'none',
    fields: {
        e_mail: {
            placeholder: '  email'
        },
        password: {
            placeholder: '  password:',
            secureTextEntry: true
        },
    },
    stylesheet: formStyles,
};

// StyleSheet for the sign up screen.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F5F5F5'
    },
    box_Logo: {
        flex: 4,
        marginTop: 60,
        justifyContent: 'flex-end',
        backgroundColor: '#F5F5F5'
    },
    box_Form: {
        flex: 4,
        backgroundColor: '#F5F5F5',
        padding: 20,
        justifyContent: 'flex-end',
        paddingBottom: '20%'
    },
    text_Welcome: {
        color: '#ffd344',
        fontSize: 25,
        letterSpacing: 4,
        alignSelf: 'center'
    },
});
