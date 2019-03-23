// Added image.
import {Component} from "react";
import {Image, Text, StyleSheet, View, KeyboardAvoidingView} from "react-native";
import React from "react";
import tForm from 'tcomb-form-native';
import Button from 'react-native-button';
import firebase from 'firebase';

import {
    generateID
} from '../components/AlgorithmAPI';
import { 
    joinCreateHouse,
    setHouseName,
    createHouse,
    joinHouse,
    idExists,
    getHasHouse
} from '../components/DatabaseAPI';

const Form = tForm.form.Form;
const User = tForm.struct({
    joinCode: tForm.maybe(tForm.String),
    newCode: tForm.maybe(tForm.String)
});

export default class HouseSetupScreen extends Component {
    // Constructor initializes joinCode to "".
    constructor(props) {
        super(props);
        this.state = {nameID: ""};
        this.onChange=this.onChange.bind(this);
    }

    componentWillMount() {
        // If user already has house, leave this page
        const { currentUser } = firebase.auth();
        firebase.database().ref(`users/${currentUser.uid}/has_house`).on('value', (snapshot) => {
            if (snapshot.val()) {
                this.props.navigation.navigate("TabNavigation");
            }
        });
    }

    // Rids the sign up screen of the navigation bar that comes standard with 'react-navigation'.
    static navigationOptions = {
        header: null
    };

    createHome = () => {
        var value = this._form.getValue();

        // Check form correctness
        if (value.newCode) {
            // Generate Unique house ID
            var houseID = generateID();
            var foundID = false;

            // Create house
            var houseName = value.newCode;
            createHouse(houseID, houseName).then(() => { this.props.navigation.navigate("TabNavigation"); });
        }
    };

    joinHome = () => {
        const value = this._form.getValue(); 
        if (value.joinCode) {
            var houseID = value.joinCode;

            idExists(houseID).then((exists) => {
                if(exists) {
                    joinHouse(value.joinCode);
                    this.props.navigation.navigate("TabNavigation");
                } else {
                    alert('wrong join code :(');
                }
            })
        }
    };

    onChange(value) {
        this.setState({value});
    };


    /**
     * render()
     * Layout for the sign up screen.
     * WARNING! Image path may need to be updated depending on directory hierarchy.
     * @returns {Layout}
     */
    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.box_Option1}>
                    <Form ref={c => this._form = c}
                          type={User}
                          value={this.state.value}
                          onChange={this.onChange}
                          options={optionsJ}/>

                    <Button style={{fontSize: 14, color: 'white', justifyContent: 'center', alignSelf: 'center'}}
                            onPress={this.joinHome}
                            containerStyle={{ padding: 11, height: 45, overflow: 'hidden', borderRadius: 20,
                                backgroundColor: '#283350'}}>
                        JOIN EXISTING HOUSEHOLD
                    </Button>
                </View>
                <View style={styles.box_Option2}>
                    <Form ref={c => this._form = c}
                          type={User}
                          value={this.state.value}
                          onChange={this.onChange}
                          options={optionsC}/>

                    <Button style={{fontSize: 14, color: 'white', justifyContent: 'center', alignSelf: 'center'}}
                            onPress={this.createHome.bind(this)}
                            containerStyle={{ padding: 11, height: 45, overflow: 'hidden', borderRadius: 20,
                                backgroundColor: '#283350' }}>
                        CREATE NEW HOUSEHOLD
                    </Button>
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
            borderColor:'#283350',
            borderRadius: 20,
            padding: 10,
            height: 36,
            marginBottom: 5
        },
        error: {
            color: 'red',
            borderWidth: 1,
            borderColor:'red',
            height: 36,
            marginBottom: 5
        }
    },
};
// The following edits the fields of the form. This format is required for the API.
const optionsJ = {
    fields: {
        newCode: {
            hidden: true
        },
        joinCode: {
            label: ' ',
            placeholder: ' Join Code...',
            color: '#a9a9a9'
        }
    },
    stylesheet: formStyles,
};
const optionsC = {
    fields: {
        joinCode: {
            hidden: true
        },
        newCode: {
            label: ' ',
            placeholder: ' Enter new house name...',
            color: '#a9a9a9'
        }
    },
    stylesheet: formStyles,
}
// StyleSheet for the sign up screen.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        paddingLeft: 16,
        paddingRight: 16,
    },
    box_Option1: {
        flex: 2,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 10
    },
    box_Option2: {
        flex: 2,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 10
    },
    box_Text: {
        alignItems: 'center'
    },
    text_Title: {
        fontWeight: 'bold',
        fontSize: 40,
        color: 'white'
    },
    text_SubTitle: {
        color: 'white',
        fontSize: 16,
        alignItems: 'center',
        padding: 0
    },
    text_SubTitle2: {
        color: 'white',
        fontSize: 16,
        alignItems: 'center',
        marginBottom: 22
    },
});
