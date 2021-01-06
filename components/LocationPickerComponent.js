import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
} from 'react-native';

// location
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

// custom imports
import Colors from '../values/Colors';
import MapPreviewComponent from './MapPreviewComponent';

const LocationPickerComponent = (props) => {
  const [pickedLocation, setPickedLocation] = useState();
  const [isFetching, setIsFetching] = useState(false);

  const mapPickedLocation = props.navigation.getParam('pickedLoc');

  const { onLocationPicked } = props;
  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation);
      onLocationPicked(mapPickedLocation);
    }
  }, [mapPickedLocation, onLocationPicked]);

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeInterval: 5000,
      });
      //   console.log('getting user location');
      //   console.log(location);
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      props.onLocationPicked({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (err) {
      Alert.alert(
        'Could not fetch location',
        'Please try again later or pick a location from the map',
        [{ text: 'Okay', style: 'destructive', onPress: () => {} }]
      );
      console.log('LocationPickerComponent... coculd not get location');
      throw err;
    }
    setIsFetching(false);
  };

  const verifyPermissions = async () => {
    const permissionResult = await Permissions.askAsync(Permissions.LOCATION);
    if (permissionResult.status != 'granted') {
      Alert.alert(
        'Insufficient permissions !',
        'Please grant location permission to use this feature',
        [{ text: 'Okay', style: 'destructive', onPress: () => {} }]
      );
      return false;
    }
    return true;
  };

  const pickOnMapHandler = () => {
    props.navigation.navigate('MapScre');
  };

  return (
    <View style={allStyles.locationPicker}>
      <MapPreviewComponent
        style={allStyles.mapPreview}
        location={pickedLocation}
        onPressMap={pickOnMapHandler}
      >
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primaryColor} />
        ) : (
          <Text>No location chosen yet !</Text>
        )}
      </MapPreviewComponent>
      <View style={allStyles.actions}>
        <Button
          title="Get user Location"
          color={Colors.primaryColor}
          onPress={getLocationHandler}
        />
        <Button
          title="Pick on Map"
          color={Colors.primaryColor}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  );
};

const allStyles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default LocationPickerComponent;
