import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet } from 'react-native';

// map view
import MapView, { Marker } from 'react-native-maps';

// navigation header
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// custom imports
import CustomHeaderButton from '../components/CustomHeaderButton';

const MapScreen = (props) => {
  const initialLoc = props.navigation.getParam('initialLocation');
  const readOnly = props.navigation.getParam('readOnly');

  const [selectedLocation, setSelectedLocation] = useState(initialLoc);

  const mapRegion = {
    latitude: initialLoc ? initialLoc.lat : 37.78,
    longitude: initialLoc ? initialLoc.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectedLocationHandler = (eventObj) => {
    if (readOnly) {
      return;
    }
    setSelectedLocation({
      lat: eventObj.nativeEvent.coordinate.latitude,
      lng: eventObj.nativeEvent.coordinate.longitude,
    });
  };

  let markerCoordinates;
  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }

  const savePickedLocHandler = useCallback(() => {
    if (!selectedLocation) {
      return;
    }
    props.navigation.navigate('NewPlace', { pickedLoc: selectedLocation });
  }, [selectedLocation]);

  useEffect(() => {
    props.navigation.setParams({ saveLocation: savePickedLocHandler });
  }, [savePickedLocHandler]);

  return (
    <MapView
      style={allStyles.mapStyle}
      region={mapRegion}
      onPress={selectedLocationHandler}
    >
      {markerCoordinates && (
        <Marker title="Picked location" coordinate={markerCoordinates}></Marker>
      )}
    </MapView>
  );
};

MapScreen.navigationOptions = (navData) => {
  const saveFn = navData.navigation.getParam('saveLocation');
  const readOnly = navData.navigation.getParam('readOnly');

  if (readOnly) {
    return {
      headerTitle: 'Map view',
      headerTintColor: 'black',
    };
  }
  return {
    headerTitle: 'Map view',
    headerTintColor: 'black',
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item title="Save" onPress={saveFn} />
        </HeaderButtons>
      );
    },
  };
};

const allStyles = StyleSheet.create({
  mapStyle: {
    flex: 1,
  },
});

export default MapScreen;
