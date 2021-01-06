import * as FileSystem from 'expo-file-system';
import { insertPlace, fetchPlaces } from '../../helpers/db';
import ENV from '../../env';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

export const addTitle = (title, image, selectedLoc) => {
  return async (dispatch) => {
    const resp = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${selectedLoc.lat},${selectedLoc.lng}&key=${ENV.googleApiKey}`
    );

    if (!resp.ok) {
      throw new Error(
        'SOmething went wromg in getting lat, lng from selectedLoc'
      );
    }

    const resData = await resp.json();
    if (!resData.results) {
      throw new Error(
        'SOmething went wromg in getting lat, lng from selectedLoc'
      );
    }

    const address = resData.results[0].formatted_address;
    console.log('placeActions/addTitle address: ');
    console.log(address);

    const fileName = image.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;

    // console.log('placeActions... fileName: ' + fileName);
    // console.log('placeActions... newPath: ' + newPath);

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
      const dbResult = await insertPlace(
        title,
        newPath,
        address,
        selectedLoc.lat,
        selectedLoc.lng
      );
      //   console.log(dbResult);

      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbResult.insertId,
          title: title,
          image: newPath,
          address: address,
          coords: {
            lat: selectedLoc.lat,
            lng: selectedLoc.lng,
          },
        },
      });
    } catch (err) {
      console.log('placeActions... failed to save: ' + err);
      throw err;
    }
  };
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchPlaces();

      //   console.log(dbResult);
      dispatch({ type: SET_PLACES, places: dbResult.rows._array });
    } catch (err) {
      console.log('placeActions... failed to loadPlaces: ' + err);
      throw err;
    }
  };
};
