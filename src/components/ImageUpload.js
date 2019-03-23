import React, { Component } from 'react';
import { View } from 'react-native';
import Button from "react-native-button";

export default class ImageUpload extends Component<{}> {
//class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={style}>
                <Button>Upload Picture</Button>
            </View>
        )
    }
}

const style = {
    paddingBottom: 10
};


//export default ImageUpload;