import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native';

// redux
import { useSelector, useDispatch } from 'react-redux';

// navigation header
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// custom imports
import CustomHeaderButton from '../components/CustomHeaderButton';
import PlaceItem from '../components/PlaceItem';
import * as placesActions from '../storeRedux/actions/placesActions';

const PlaceListScreen = (props) => {
  // state to appjs to reducer
  const places = useSelector((state) => state.places.places);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(placesActions.loadPlaces());
  }, [dispatch]);

  return (
    <FlatList
      data={places}
      renderItem={(itemData) => (
        <PlaceItem
          image={itemData.item.imageUri}
          title={itemData.item.title}
          address={itemData.item.address}
          onSelect={() => {
            props.navigation.navigate('PlaceDetail', {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id,
            });
          }}
        />
      )}
    />
  );
};

PlaceListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'All Places',
    headerTintColor: 'black',

    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Add"
            iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
            onPress={() => {
              navData.navigation.navigate({ routeName: 'NewPlace' });
            }}
          />
        </HeaderButtons>
      );
    },
  };
};

const allStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default PlaceListScreen;
