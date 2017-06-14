import {
  RENDER_WORKOUTS,
  RENDER_FINISH
} from '../actions/types';

const INITIAL_STATE = {
  loading_workouts: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RENDER_WORKOUTS:
      // console.log('render workouts');
      return { ...state, loading_workouts: true };
    case RENDER_FINISH:
      // console.log('render finish');
      return INITIAL_STATE;
    default:
      return state;
  }
};
