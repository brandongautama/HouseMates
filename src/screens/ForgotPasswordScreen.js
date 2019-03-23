import {Component} from "react";
import {Image, KeyboardAvoidingView, StyleSheet, Text, View} from "react-native";
import Button from 'react-native-button';
import React from "react";
import tForm from 'tcomb-form-native';
import Firebase from "../components/Firebase";

// Form and User initialize the user input fields.
const Form = tForm.form.Form;
const User = tForm.struct({
    e_mail: tForm.String,
});

export default class ForgotPasswordScreen extends Component {
    // Constructor initializes name, phoneNumber, houseID, and houseName to "".
    constructor(props) {
        super(props);
        this.state = { e_mail: "" };
        this.onChange=this.onChange.bind(this);
    }

    // Rids the sign up screen of the navigation bar that comes standard with 'react-navigation'.
    static navigationOptions = {
        header: null
    };

    /**
     * handleSubmit()
     * When the "Sign Up" button is pressed, this function is called.
     * It grabs the values in all input boxes and prints them to the console.
     * Then proceeds to the next screen if no values were null.
     * TODO: 'House Code' or 'House Name' can have a null field, but not both.
     */

    handleSubmit_ForgotPassword = () => {
        const value = this._form.getValue();
        if (value) {
            //create the user with given credentials -> alert with message if they already exist
            Firebase.auth.sendPasswordResetEmail(value.e_mail)
                .then( () => { this.props.navigation.navigate("LogIn"); })
                .catch(function(error) {
                    alert(error);
            });
        }
    };

    onChange(value) {
        this.setState({value});
    };

    /**
     * render()
     * Layout for the sign up screen.
     * TODO: The 'KeyboardAvoidingView' can potentially block the sign up button.
     * WARNING! Image path may need to be updated depending on directory hierarchy.
     * @returns {Layout}
     */
    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={[styles.box_SubContainer]}>
                    <View style={[styles.box_Title]}>
                        <Text style={styles.text_Title}>Forgot Password</Text>
                        <Text style={styles.text_SubTitle}>Enter your email to find your account.</Text>
                    </View>
                    <View style={[styles.box_Form]}>
                        <Form ref={c => this._form = c}
                              type={User}
                              value={this.state.value}
                              onChange={this.onChange}
                              options={options}/>
                        <Button style={{fontSize: 14, color: 'white', justifyContent: 'center', alignSelf: 'center'}}
                                onPress={this.handleSubmit_ForgotPassword} // I had handleSubmit_ForgotPassword() had to remove ()
                                containerStyle={{ padding: 11, height: 45, overflow: 'hidden', borderRadius: 20,
                                    backgroundColor: '#415180' }}>
                            SUBMIT
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
            color: '#415180',
            fontSize: 14,
            fontWeight: 'bold'
        },
        error: {
            color: 'red',
            fontSize: 14,
            fontWeight: 'bold'
        }
    },
    textbox: {
        normal: {
            color: '#415180',
            borderWidth: 1,
            borderColor:'#415180',
            borderRadius: 20,
            height: 36,
            marginBottom: 5,
            padding: 10
        },
        error: {
            color: '#415180',
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
        justifyContent: 'center'
    }
};

// The following edits the fields of the form. This format is required for the API.
const options = {
    auto: 'none',
    fields: {
        e_mail: {
            placeholder: '  e-mail',
            autoCapitalize: 'none',
            keyboardType: 'email-address',
            error: 'Invalid email',
            returnKeyType: 'next'
        }
    },
    stylesheet: formStyles,
};

// StyleSheet for the sign up screen.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        paddingLeft: 16,
        paddingRight: 16,
        // This field can be changed to adjust style.
        paddingTop: 0,
    },
    box_SubContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    box_Title: {
        flex: 3,
        marginTop: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    box_Form: {
        flex: 10,
        backgroundColor: 'transparent',
        padding: 20,
        justifyContent: 'center'
    },
    text_Title: {
        fontWeight: 'bold',
        fontSize: 40,
        color: '#415180'
    },
    text_SubTitle: {
        color: '#415180',
        fontSize: 16
    }
});
