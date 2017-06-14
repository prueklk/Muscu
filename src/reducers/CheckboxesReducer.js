import {
  STORE_TODAYWORKOUTS,
  FINISH_TODAYWORKOUTS
} from '../actions/types';

const INITIAL_STATE = {
  todayWorkouts: []
};

export default (state = INITIAL_STATE, action) => {
  // console.log('CHECKBOXES REDUCER');
  // console.log(state);
  // console.log(action);
  switch (action.type) {
    case STORE_TODAYWORKOUTS:
      // console.log('STORE');
      // console.log(action.payload);
      // console.log(state);
      return { todayWorkouts: action.payload };
    case FINISH_TODAYWORKOUTS:
      // console.log('FINISH');
      // console.log(action.payload);
      // console.log(state);
      return { todayWorkouts: action.payload };
    default:
      return state;
  }
};
