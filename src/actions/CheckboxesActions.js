import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  STORE_TODAYWORKOUTS,
  FINISH_TODAYWORKOUTS
} from './types';

export const todayWorkoutsStore = (checkedItem, todayWorkouts) => {
  // console.log(checkedItem);
  const { currentUser } = firebase.auth();
  const { name, muscle, day, setNumber, weightType, note, sets, checked } = checkedItem;

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/workouts/${checkedItem.uid}`)
      .set({ name, muscle, day, setNumber, weightType, note, sets, checked })
      .then(() => {
        dispatch({ type: STORE_TODAYWORKOUTS, payload: todayWorkouts });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const finishTodayWorkouts = (todayWorkouts) => {
  const { currentUser } = firebase.auth();
  // const { name, muscle, day, setNumber, weightType, note, sets, checked } = checkedItem;

  return (dispatch) => {
    for (const i = 0; i < todayWorkouts.length; i++) {
      todayWorkouts[i].checked = false;

      firebase.database().ref(`/users/${currentUser.uid}/workouts/${todayWorkouts[i].uid}`)
        .set({
          name: todayWorkouts[i].name,
          muscle: todayWorkouts[i].muscle,
          day: todayWorkouts[i].day,
          setNumber: todayWorkouts[i].setNumber,
          weightType: todayWorkouts[i].weightType,
          note: todayWorkouts[i].note,
          sets: todayWorkouts[i].sets,
          checked: false
        })
        .then(() => {
          dispatch({ type: FINISH_TODAYWORKOUTS, payload: todayWorkouts });
          if (i === todayWorkouts.length - 1) {
            Actions.workoutDays({ type: 'reset' });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
};
