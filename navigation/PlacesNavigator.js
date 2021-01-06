import React from 'react';

// navigation
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

// icons
import { Ionicons } from '@expo/vector-icons';

// custom import
import Colors from '../values/Colors';
import PlaceListScreen from '../screens/PlacesListScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import MapScreen from '../screens/MapScreen';

const defaultStackNavOption = {
  headerStyle: {
    backgroundColor: Colors.primaryColor,
    //     backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white',
  },
  headertitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
  headerTintColor: 'white',
};

const PlacesNavigator = createStackNavigator(
  {
    PlaceList: {
      screen: PlaceListScreen,
    },
    PlaceDetail: {
      screen: PlaceDetailScreen,
    },
    NewPlace: {
      screen: NewPlaceScreen,
    },
    MapScre: {
      screen: MapScreen,
    },
  },
  {
    defaultNavigationOptions: defaultStackNavOption,
  }
);

export default createAppContainer(PlacesNavigator);
