import {
  WORKOUT_UPDATE,
  WORKOUT_CREATE,
  WORKOUT_SAVE_SUCCESS,
  WORKOUT_EDIT_SAVE_SUCCESS,
  WORKOUT_EDIT_CANCEL,
  SETS_UPDATE
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  muscle: '',
  day: '',
  setNumber: '3',
  weightType: '',
  note: '',
  checked: false,
  sets: {
    0: { setID: 0, weight: '', reps: '' },
    1: { setID: 1, weight: '', reps: '' },
    2: { setID: 2, weight: '', reps: '' }
  }
};

export default (state = INITIAL_STATE, action) => {
  // console.log(action);
  switch (action.type) {
    case WORKOUT_UPDATE:
      // console.log(action.payload);
      // action.payload === { prop: 'name', value: 'Jane' }
      return { ...state, [action.payload.prop]: action.payload.value };
    case SETS_UPDATE: {
      // console.log('SETS_UPDATE');
      // console.log(action.payload);
      // console.log(state);
      // console.log(action.payload.setID);
      if (action.payload.setID >= 0) {
        // console.log(action.payload);
        return {
          ...state,
          sets: {
            ...state.sets,
            [action.payload.setID]: {
              ...state.sets[action.payload.setID],
              [action.payload.prop]: action.payload.value
            }
          }
        };
      }
      return state;
    }
    case WORKOUT_CREATE:
      return INITIAL_STATE;
    case WORKOUT_SAVE_SUCCESS:
      return INITIAL_STATE;
    case WORKOUT_EDIT_SAVE_SUCCESS:
      console.log(state);
      return state;
    case WORKOUT_EDIT_CANCEL:
      return INITIAL_STATE;
    default:
      return state;
  }
};
