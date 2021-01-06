import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Image, Alert } from 'react-native';

// image picker
import * as ImagePicker from 'expo-image-picker';

// permissions
import * as Permissions from 'expo-permissions';

// custom imports
import Colors from '../values/Colors';

const ImagePickerComponent = (props) => {
  const [pickedImage, setPickedImage] = useState(false);

  const verifyPermissions = async () => {
    const permissionResult = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
      Permissions.CAMERA
    );
    if (permissionResult.status != 'granted') {
      Alert.alert(
        'Insufficient permissions !',
        'Please grant camera permission to use this app',
        [{ text: 'Okay', style: 'destructive', onPress: () => {} }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const capturedImage = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    console.log(capturedImage);
    setPickedImage(capturedImage.uri);
    props.onImageTaken(capturedImage.uri);
  };

  return (
    <View style={allStyles.imagePicker}>
      <View style={allStyles.imagePreview}>
        {!pickedImage ? (
          <Text>No image picked yet.</Text>
        ) : (
          <Image style={allStyles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <Button
        title="Take Image"
        color={Colors.primaryColor}
        onPress={takeImageHandler}
      />
    </View>
  );
};

const allStyles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
    marginBottom: 15,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ImagePickerComponent;
