import { ADD_PLACE, SET_PLACES } from '../actions/placesActions';
import Place from '../../models/placeModel';

const initialState = {
  places: [],
};

const placeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACES:
      return {
        places: action.places.map(
          (plac) =>
            new Place(
              plac.id.toString(),
              plac.title,
              plac.imageUri,
              plac.address,
              plac.lat,
              plac.lng
            )
        ),
      };

    case ADD_PLACE:
      const newPlace = new Place(
        action.placeData.id.toString(),
        action.placeData.title,
        action.placeData.image,
        action.placeData.address,
        action.placeData.coords.lat,
        action.placeData.coords.lng
      );
      return {
        ...state,
        places: state.places.concat(newPlace),
      };

    default:
      return state;
  }
};

export default placeReducer;
