import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../values/Colors';

const PlaceItem = (props) => {
  return (
    <TouchableOpacity onPress={props.onSelect} style={allStyles.placeItem}>
      <Image style={allStyles.image} source={{ uri: props.image }} />
      <View style={allStyles.infoContainer}>
        <Text style={allStyles.title}>{props.title}</Text>
        <Text style={allStyles.address}>{props.address}</Text>
      </View>
    </TouchableOpacity>
  );
};

const allStyles = StyleSheet.create({
  placeItem: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ccc',
    borderColor: Colors.primaryColor,
    borderWidth: 1,
  },
  infoContainer: {
    marginLeft: 25,
    width: 250,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    color: 'black',
    fontSize: 18,
    marginBottom: 5,
  },
  address: {
    color: '#666',
    fontSize: 16,
  },
});

export default PlaceItem;
