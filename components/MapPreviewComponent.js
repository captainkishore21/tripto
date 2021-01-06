import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import ENV from '../env';

const MapPreviewComponent = (props) => {
  let imgPreviewUrl;

  if (props.location) {
    imgPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=${ENV.googleApiKey}`;
  }

  return (
    <TouchableOpacity
      onPress={props.onPressMap}
      style={{ ...allStyles.mapPreview, ...props.style }}
    >
      {props.location ? (
        <Image style={allStyles.mapImage} source={{ uri: imgPreviewUrl }} />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};

const allStyles = StyleSheet.create({
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  mapImage: {
    width: '100%',
    height: '100%',
  },
});

export default MapPreviewComponent;
