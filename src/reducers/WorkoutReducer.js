import {
  WORKOUTS_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  // loading_workouts: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case WORKOUTS_FETCH_SUCCESS:
      // console.log(action);
      return action.payload;
    default:
      return state;
  }
};
