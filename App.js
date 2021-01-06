//default given
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// fonts
import * as Font from 'expo-font';
import { useState } from 'react';
import { AppLoading } from 'expo';

// redux
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

// custom import
import PlacesNavigator from './navigation/PlacesNavigator';
import PlaceReducer from './storeRedux/reducers/placesReducer';
import { init } from './helpers/db';

init()
  .then(() => {
    console.log('Initialized database');
  })
  .catch((err) => {
    console.log('Initializing db failed.' + err);
  });

const rootReducer = combineReducers({
  places: PlaceReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  const fetchFont = () => {
    return Font.loadAsync({
      'open-sans': require('./values/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('./values/fonts/OpenSans-Bold.ttf'),
    });
  };

  if (!fontLoaded) {
    return (
      <AppLoading startAsync={fetchFont} onFinish={() => setFontLoaded(true)} />
    );
  }

  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
