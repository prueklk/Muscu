import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import WorkoutFormReducer from './WorkoutFormReducer';
import WorkoutReducer from './WorkoutReducer';
import WorkoutsRenderReducer from './WorkoutsRenderReducer';
import CheckboxesReducer from './CheckboxesReducer';

export default combineReducers({
  auth: AuthReducer,
  workoutForm: WorkoutFormReducer,
  workouts: WorkoutReducer,
  workoutsRender: WorkoutsRenderReducer,
  checkboxes: CheckboxesReducer
});
