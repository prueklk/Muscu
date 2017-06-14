import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import WorkoutCreate from './components/WorkoutCreate';
import WorkoutEdit from './components/WorkoutEdit';
import WorkoutFinish from './components/WorkoutFinish';
import WorkoutDetails from './components/WorkoutDetails';
import WorkoutDays from './components/WorkoutDays';

const RouterComponent = () => {
  return (
    <Router >
      <Scene key="auth">
        <Scene
          key="login"
          component={LoginForm}
          title="Please Login"
          titleStyle={{ color: 'white' }}
          sceneStyle={{ paddingTop: 65 }}
          navigationBarStyle={{ backgroundColor: '#00cca1' }}
        />
      </Scene>

      <Scene key="main">
        <Scene
          // onRight={() => Actions.workoutCreate()}
          // rightTitle="Add"
          // onRight={() => Actions.workoutFinish()}
          // rightTitle="Finish"

          key="workoutDays"
          component={WorkoutDays}
          // title="Monday"
          titleStyle={{ color: 'white' }}
          hideNavBar
          sceneStyle={{ paddingTop: 0 }}
          panHandlers={null}
          navigationBarStyle={{ backgroundColor: '#00cca1' }}
          initial
        />
        <Scene
          key="workoutCreate"
          component={WorkoutCreate}
          title="Create Workout"
          titleStyle={{ color: 'white' }}
          hideNavBar={false}
          sceneStyle={{ paddingTop: 65 }}
          panHandlers={null}
          navigationBarStyle={{ backgroundColor: '#00cca1' }}
        />
        <Scene
          key="workoutEdit"
          component={WorkoutEdit}
          title="Edit Workout"
          titleStyle={{ color: 'white' }}
          hideNavBar={false}
          sceneStyle={{ paddingTop: 65 }}
          panHandlers={null}
          navigationBarStyle={{ backgroundColor: '#00cca1' }}
        />
        <Scene
          key="workoutFinish"
          component={WorkoutFinish}
          title="Finish"
          titleStyle={{ color: 'white' }}
          hideNavBar={false}
          sceneStyle={{ paddingTop: 65 }}
          panHandlers={null}
          navigationBarStyle={{ backgroundColor: '#00cca1' }}
        />
        <Scene
          onRight={() => Actions.workoutEdit()}
          rightTitle="Edit"
          rightButtonTextStyle={{ color: 'white' }}

          titleStyle={{ color: 'white' }}
          key="workoutDetails"
          component={WorkoutDetails}
          hideNavBar={false}
          sceneStyle={{ paddingTop: 65 }}
          panHandlers={null}
          navigationBarStyle={{ backgroundColor: '#00cca1' }}
        />
      </Scene>
    </Router>
  );
};


export default RouterComponent;
