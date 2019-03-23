import React, { Component } from "react";
import {Text, View, StyleSheet} from "react-native";
import { Card, CardItem, Thumbnail, Body, Left} from 'native-base';
import {setTaskCompleted, getTaskCompleted} from "../components/DatabaseAPI";

/**
 * class CardComponent
 * Sets the layout for the cards utilized in ToDoListScreen.js
 */
export default class CardComponent extends Component {

    // Sets up the state of the CardComponent.
    // TODO: More fields will be needed.
    constructor (props) {
        super(props);
        var buttonColor;

        this.state = {
            textValue: "",
            clicked: false,
            name: this.props.name,
            desc: this.props.desc,
            cycle: this.props.cycle,
            reminder: this.props.reminder,
            deadline: this.props.deadline,
            task_id: this.props.task_id,
            complete: this.props.complete,
            buttonColor: buttonColor
        }
    }

    componentWillMount() {
        getTaskCompleted(this.state.task_id).once('value', (snapshot) => {
            console.log(snapshot);
            console.log(snapshot.val());
            let completed = "TAP TO COMPLETE TASK";
            this.setState( { buttonColor : { backgroundColor: '#A3320B' } }); //Old red hex #729b79 
            if(snapshot.val()) {
                completed = "TASK COMPLETED";
                this.setState( {buttonColor : { backgroundColor: '#018E42' } });
            }

            this.setState({ textValue: completed });
        });

    }

    // Allows for a test implementation of the chore completion toggle.
    // TODO: Needs to update the database of task completion.
    onButtonPress = () => {
        console.log(this.state.task_id);
        if (this.state.complete) {
            this.setState({
                textValue: 'TAP TO COMPLETE TASK',
                clicked: false
            })
            setTaskCompleted(this.state.task_id, false).then(() => {
                this.setState({complete : false});
                this.setState( { buttonColor : { backgroundColor: '#A3320B' } }); //Old red hex #729b79 

            });
        }
        else {
            this.setState({
                textValue: 'TASK COMPLETED',
                clicked: true
            });
            setTaskCompleted(this.state.task_id, true).then(() => {
                this.setState({complete : true});
                this.setState( {buttonColor : { backgroundColor: '#018E42' } });
            });
        }
    };


    render() {
        // TODO: images will need to change to the database list of thumbnails for user (if this feature is desired).
        // WARNING! Image path may need to be updated depending on directory hierarchy.
        const images = {
            "1": require('../assets/temp_thumbnail_1.png'),
            "2": require('../assets/temp_thumbnail_2.png'),
            "3": require('../assets/temp_thumbnail_3.png'),
            "4": require('../assets/temp_thumbnail_4.png')
        };

        var buttonColor;
        if (!this.state.complete) {
            buttonColor = { backgroundColor: '#A3320B' } //Old red hex #729b79 
        }
        else {
            buttonColor = { backgroundColor: '#018E42' } // Old green hex #a03e47
        }

        return (
            <Card>
                <CardItem button bordered>
                    <Left>
                        <View style={{paddingLeft: 10}}>
                            <Text style={{fontWeight: 'bold'}}>{this.state.name}</Text>
                            <Text>{this.state.desc}</Text>
                            <Text>{this.state.deadline}</Text>
                        </View>
                    </Left>
                </CardItem>
                <CardItem style={this.state.buttonColor} footer button onPress={this.onButtonPress.bind(this)}>
                    <Body>
                    <Text style={styles.text_Button}>{this.state.textValue}</Text>
                    </Body>
                </CardItem>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    text_Button: {
        justifyContent: 'center',
        alignSelf: 'center',
        color: 'white'
    }
});
