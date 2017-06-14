import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  WORKOUT_UPDATE,
  WORKOUT_CREATE,
  WORKOUTS_FETCH_SUCCESS,
  WORKOUT_SAVE_SUCCESS,
  WORKOUT_EDIT_SAVE_SUCCESS,
  WORKOUT_EDIT_CANCEL,
  RENDER_WORKOUTS,
  RENDER_FINISH,
  SETS_UPDATE
} from './types';

export const workoutUpdate = ({ prop, value }) => {
  return {
    type: WORKOUT_UPDATE,
    payload: { prop, value }
  };
};

export const setsUpdate = ({ prop, value, setID }) => {
  return {
    type: SETS_UPDATE,
    payload: { prop, value, setID }
  };
};

export const workoutCreate = ({
  name, muscle, day, setNumber, weightType, note, sets, checked
}) => {
  const { currentUser } = firebase.auth();
  // const allSets = { set1: 'set1', set2: 'set2' }; // for test adding an object

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/workouts`)
      .push({ name, muscle, day, setNumber, weightType, note, sets, checked })
      .then(() => {
        dispatch({ type: WORKOUT_CREATE });
        Actions.workoutDays({ type: 'reset' });
      });
  };
};

export const workoutsFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: RENDER_WORKOUTS });

    firebase.database().ref(`/users/${currentUser.uid}/workouts`)
      .on('value', snapshot => {
        dispatch({ type: RENDER_FINISH });
        dispatch({ type: WORKOUTS_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const workoutSave = ({
  name, muscle, day, uid, setNumber, weightType, note, sets, checked
}) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/workouts/${uid}`)
      .set({ name, muscle, day, setNumber, weightType, note, sets, checked })
      .then(() => {
        Actions.workoutDays({ type: 'reset' });
        dispatch({ type: WORKOUT_SAVE_SUCCESS });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//////////////////////////////// NO USE
export const workoutEditSave = ({
  name, muscle, day, uid, setNumber, weightType, note, sets, checked
}) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/workouts/${uid}`)
      .set({ name, muscle, day, setNumber, weightType, note, sets })
      .then(() => {
        // Actions.workoutDays({ type: 'reset' });
        // NEED TO FIX
        dispatch({ type: WORKOUT_EDIT_SAVE_SUCCESS });
        Actions.refresh({
          workout: { name, muscle, day, setNumber, weightType, note, sets, uid, checked },
          title: name,
          uid
        });
        Actions.pop();
        // dispatch({ type: WORKOUT_EDIT_SAVE_SUCCESS });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
//////////////////////////////

export const workoutDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/workouts/${uid}`)
      .remove()
      .then(() => {
        Actions.workoutDays({ type: 'reset' });
      });
  };
};

export const workoutEditCancel = () => {
  return {
    type: WORKOUT_EDIT_CANCEL
  };
};
