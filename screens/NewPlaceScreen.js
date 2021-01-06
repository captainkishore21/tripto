import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
} from 'react-native';

//redux
import { useDispatch } from 'react-redux';

// custom import
import Colors from '../values/Colors';
import * as placesActions from '../storeRedux/actions/placesActions';
import ImagePickerComponent from '../components/ImagePickerComponent';
import LocationPickerComponent from '../components/LocationPickerComponent';

const NewPlaceScreen = (props) => {
  const [titleValue, setTitleValue] = useState('');
  const [selectedImage, setSelectedImage] = useState();
  const [selectedLoc, setSelectedLoc] = useState();
  const dispatch = useDispatch();

  const titleChangeHandler = (text) => {
    setTitleValue(text);
  };

  const savePlaceHandler = () => {
    dispatch(placesActions.addTitle(titleValue, selectedImage, selectedLoc));
    props.navigation.goBack();
  };

  const imageTakenHandler = (imagePath) => {
    setSelectedImage(imagePath);
  };

  const locationPickedHandler = useCallback(
    (location) => {
      setSelectedLoc(location);
    },
    [setSelectedLoc]
  );

  return (
    <ScrollView>
      <View style={allStyles.form}>
        <Text style={allStyles.titleTextView}>Title</Text>
        <TextInput
          placeholder={'Eneter place name'}
          style={allStyles.titleEditText}
          keyboardType="default"
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <ImagePickerComponent onImageTaken={imageTakenHandler} />
        <LocationPickerComponent
          navigation={props.navigation}
          onLocationPicked={locationPickedHandler}
        />
        <Button
          title="Save Place"
          color={Colors.primaryColor}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Add Place',
    headerTintColor: 'black',
  };
};

const allStyles = StyleSheet.create({
  form: {
    margin: 10,
  },
  titleTextView: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    marginBottom: 10,
  },
  titleEditText: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    fontSize: 17,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
});

export default NewPlaceScreen;
