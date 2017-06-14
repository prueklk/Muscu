import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { finishTodayWorkouts } from '../actions';
import { CardSection, Button } from './common';

class WorkoutFinish extends Component {
  onYes() {
    // Actions.pop();
    this.props.finishTodayWorkouts(this.props.todayWorkouts);
  }

  render() {
    console.log(this.props);

    return (
      <View style={styles.finishStyle}>
        <Text style={styles.feedbackTextStyle}>
          Whoa! It seems like you have finished all exercises already!
        </Text>
        <Text style={styles.feedbackTextStyle}>
          Do you think you are done for today?
        </Text>
        <CardSection style={{ borderBottomWidth: 0 }}>
          <Button onPress={() => Actions.pop()}>
            No, I am not done.
          </Button>

          <Button onPress={() => this.onYes()}>
            Yes, I am done.
          </Button>
        </CardSection>
      </View>

    );
  }
}

const styles = {
  finishStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  feedbackTextStyle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20
  }
};

// export default WorkoutFinish;
export default connect(null, { finishTodayWorkouts })(WorkoutFinish);


//
// const mapStateToProps = (state) => {
//   const { name, phone, shift } = state.workoutForm;
//
//   return { name, phone, shift };
// };

// export default connect(mapStateToProps, {
//   workoutUpdate
// })(WorkoutFinish);
