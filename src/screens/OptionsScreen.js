import {Component} from "react";
import {Modal, Text, KeyboardAvoidingView, StyleSheet, View, TextInput} from "react-native";
import React from "react";
import tForm from 'tcomb-form-native';
import Button from 'react-native-button';
import {handleEmail} from '../components/inviteHouseMate';
import {
    getFirstName,
    setFirstName,
    leaveHouse,
    getHouseId,
    reassignAllTasks
} from '../components/DatabaseAPI';

// Form and User initialize the user input fields.
const Form = tForm.form.Form;
const User = tForm.struct({
    name: tForm.maybe(tForm.String)
});

export default class OptionsScreen extends Component {
    // Constructor initializes name, joinCode, and houseName to "".
    constructor(props) {
        super(props);

        this.state = {
            house_id: '',
            name: "",
            inviteEmail: '',
            modalVisible: false
        };
        this.onChange=this.onChange.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);
    }

    componentWillMount() {
        getFirstName().once('value', (snapshot) => {
            this.setState({name: snapshot.val()});
        });
        getHouseId().once('value', snapshot => {
            this.setState({house_id : snapshot.val()});
        });
    }

    // Rids the sign up screen of the navigation bar that comes standard with 'react-navigation'.
    static navigationOptions = {
        header: null
    };
    /**
     * handleSubmit()
     * When the following buttons are pressed, the respective function is called.
     * It grabs the values in all input boxes and prints them to the console.
     * Then proceeds to the next screen if no values were null.
     */
    handleSubmit_saveInfo = () => {
        const value = this._form.getValue();
        console.log('value: ', value);
        if (value) {
            if(value.name) {
                setFirstName(value.name);
                console.log('name');
            }
            this.props.navigation.navigate("TabNavigation");
        }
    };

    setModalVisible() {
        this.setState({modalVisible: true});
        //this.onChange(visible);
    };

    reassignAllTasks() {
        reassignAllTasks();
    }
    handleSubmit_sendInvite = () => {
        handleEmail(this.state.house_id, this.state.inviteEmail);
        this.setState({
            modalVisible: false
        });
    };
    handleSubmit_leaveHouse = () => {
            leaveHouse().then(() => {this.props.navigation.navigate("Welcome");});
    };
    onChange(value) {
        this.setState({value});
    };
    /**
     * render()
     * Layout for the sign up screen.
     * TODO: The 'KeyboardAvoidingView' can potentially block the buttons/inputs.
     * @returns {Layout}
     */
    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={[styles.box_SubContainer]}>
                    <View style={[styles.box_Title]}>
                        <Text style={styles.text_Title}>Settings</Text>
                        <Text style={styles.text_SubTitle}>House Code:</Text>
                        <Text style={styles.houseCodeStyle}>{this.state.house_id}</Text>
                        <Text style={styles.userInfoStyle}>Name: {this.state.name}</Text>
                    </View>
                    <View style={[styles.box_Form]}>
                        <Form ref={c => this._form = c}
                              type={User}
                              value={this.state.value}
                              onChange={this.onChange}
                              options={options}/>
                        <View style={{margin: 10}}>
                            <Button style={styles.buttonStyle}
                                    onPress={this.handleSubmit_saveInfo}
                                    containerStyle={{ padding: 11, height: 45, overflow: 'hidden', borderRadius: 20, backgroundColor: '#415180' }}>
                                SAVE
                            </Button>
                        </View>
                        <View style={{padding: 10}}>
                            <Modal animationType="slide"
                                   transparent={false}
                                   visible={this.state.modalVisible}
                                   onRequestClose={()=>{alert('Invite not sent!')}}>
                                <View style={styles.box_ContainerModal}>
                                    <View style={styles.box_Modal}>
                                        <View style={{justifyContent: 'flex-end',}}>
                                            <TextInput style={{ height: 40, padding:5, borderColor: 'gray', borderWidth: 1, fontSize: 14, borderRadius: 20,}}
                                                       value={this.state.inviteEmail}
                                                       placeholder=' email'
                                                       placeholderTextColor='grey'
                                                       onChangeText={(text) => this.setState({inviteEmail: text})} />
                                        </View>
                                        <View style={{ paddingTop: 10, justifyContent: 'flex-end' }}>
                                            <Button style={{
                                                        fontSize: 14,
                                                        color: 'white',
                                                        justifyContent: 'center',
                                                        alignSelf: 'center'
                                                    }}
                                                    onPress={this.handleSubmit_sendInvite}
                                                    containerStyle={styles.buttonContainerStyleInvite}>
                                                INVITE
                                            </Button>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                            <Button style={styles.buttonStyle}
                                    onPress={this.setModalVisible}
                                    containerStyle={styles.buttonContainerStyleInvite}>
                                INVITE A HOUSEMATE
                            </Button>
                        </View>
                        <View style={{padding: 10}}>
                            <Button style={styles.buttonStyle}
                                    onPress={this.reassignAllTasks}
                                    containerStyle={styles.buttonContainerStyle}>
                                RESET AND REASSIGN ALL TASKS
                            </Button>
                        </View>
                        <View style={{margin: 10}}>
                            <Button style={styles.buttonStyle}
                                    onPress={this.handleSubmit_leaveHouse}
                                    containerStyle={styles.buttonContainerStyle}>
                                LEAVE YOUR HOUSEHOLD
                            </Button>
                        </View>
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
            padding:10
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
        name: {
            placeholder: '  update name'
        },
    },
    stylesheet: formStyles,
};
// StyleSheet for the sign up screen.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F5F5F5',
        // This field can be changed to adjust style.
        paddingTop: 0,
    },
    userInfoStyle: {
        fontWeight: 'bold',
        color: '#415180',
        alignSelf: 'flex-start',
        marginTop: 10,
        paddingLeft: 5,
        fontSize: 16
    },
    box_SubContainer: {
        flex: 1,
        marginTop: 10,
        flexDirection: 'column',
        backgroundColor: '#F5F5F5',
    },
    box_ContainerModal: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'transparent'
    },
    box_Title: {
        paddingTop: 30,
        paddingBottom: 15,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        shadowOffset:{  width: 0,  height: 2,  },
        shadowColor: '#969696',
        shadowOpacity: .8,
    },

    box_Form: {
        backgroundColor: 'transparent',
        padding: 20,
        justifyContent: 'space-evenly',
        justifyContent: 'flex-end'
    },
    box_Modal: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'transparent'
    },
    text_Title: {
        fontWeight: 'bold',
        fontSize: 40,
        color: '#415180'
    },
    houseCodeStyle: {
        fontSize: 40,
        color: '#415180'
    },
    text_SubTitle: {
        marginTop: 10,
        color: '#415180',
        fontSize: 16
    },
    buttonStyle: {
        fontSize: 14, 
        color: 'white', 
        justifyContent: 'center', 
        alignSelf: 'center'
    },
    buttonContainerStyle: { 
        padding: 11, 
        height: 45, 
        overflow: 'hidden', 
        borderRadius: 20,
        backgroundColor: '#c31c1c',
    },
    buttonContainerStyleInvite: {
        padding: 11,
        height: 45,
        overflow: 'hidden',
        borderRadius: 20,
        backgroundColor: '#729b79',
    }
});



