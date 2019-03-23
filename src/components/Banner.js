import React, { Component } from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default class Banner extends Component {
	render() {
		const { title, subtitle } = this.props;
		return (
			<View style={styles.bannerContainer}> 
				<Text style={styles.title}> {title} </Text>
			</View>
			);
	}
}

const styles = {
	bannerContainer: {
		height: 70,
		paddingTop: 12,
		paddingBottom: 10,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5F5F5',
		shadowOffset:{  width: 0,  height: 2,  },
        shadowColor: '#969696',
        shadowOpacity: .8,
	},
	title: {
        fontWeight: 'bold',
        fontSize: 32,
        color: '#415180'
	}
};