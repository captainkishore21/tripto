import React from 'react';
import { ScrollView, Image, View, Text, StyleSheet } from 'react-native';

import MapPreviewComponent from '../components/MapPreviewComponent';
import { useSelector } from 'react-redux';
import Colors from '../values/Colors';

const PlaceDetailScreen = (props) => {
  const placeId = props.navigation.getParam('placeId');

  const selectedPlace = useSelector((state) =>
    state.places.places.find((place) => place.id === placeId)
  );
  const selLoc = { lat: selectedPlace.lat, lng: selectedPlace.lng };

  const showMapHandler = () => {
    props.navigation.navigate('MapScre', {
      readOnly: true,
      initialLocation: selLoc,
    });
  };

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
      <Image style={allStyles.image} source={{ uri: selectedPlace.imageUri }} />
      <View style={allStyles.locationContainer}>
        <View style={allStyles.addressContainer}>
          <Text style={allStyles.address}>{selectedPlace.address}</Text>
        </View>
        <MapPreviewComponent
          style={allStyles.mapPreview}
          location={selLoc}
          onPressMap={showMapHandler}
        />
      </View>
    </ScrollView>
  );
};

PlaceDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam('placeTitle'),
    headerTintColor: 'black',
  };
};

const allStyles = StyleSheet.create({
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
    backgroundColor: '#ccc',
  },
  locationContainer: {
    marginVertical: 20,
    width: '90%',
    maxWidth: 350,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primaryColor,
    textAlign: 'center',
  },
  mapPreview: {
    width: '100%',
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default PlaceDetailScreen;
