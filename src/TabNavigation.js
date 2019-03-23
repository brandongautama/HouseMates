import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation';

// WARNING! Image path may need to be updated depending on directory hierarchy.
import ToDoListScreen from './screens/ToDoListScreen';
import HouseholdScreen from './screens/HouseholdScreen';
import {Icon} from "native-base";

/**
 * createMaterialTopTabNavigator
 * Enables the bottom tabs and allows navigation between screens linked to it.
 */
export default createMaterialTopTabNavigator(
    {
    ToDoList: ToDoListScreen,
    Household: HouseholdScreen,
    },
    {
        animationEnabled: true,
        swipeEnabled: true,
        tabBarPosition: 'bottom',

        tabBarOptions: {
            initialRouteName: 'ToDoList',
            showIcon: true,
            showLabel: true,
            activeTintColor: '#ffd344',
            inactiveTintColor: '#A1B1E0',
            labelStyle: {
                fontSize: 8,
            },
            style: {
                backgroundColor: '#283350',
            },
        },
    }
);
