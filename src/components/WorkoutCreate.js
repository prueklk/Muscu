import React, { Component } from 'react';
import { connect } from 'react-redux';
import { workoutUpdate, workoutCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import WorkoutForm from './WorkoutForm';

class WorkoutCreate extends Component {
  componentWillMount() {
    this.props.workoutUpdate({ prop: 'day', value: this.props.day });
  }

  onButtonPress() {
    const { name, muscle, day, setNumber, weightType, note, sets } = this.props;

    console.log(sets);
    this.props.workoutCreate({
      name,
      muscle,
      day: day || 'Monday',
      setNumber,
      weightType: weightType || 'Normal weight',
      note,
      sets: this.generateSets(setNumber),
      checked: false
    });
  }

  generateSets(setNumber) {
    const setArr = [];
    for (const i = 0; i < setNumber; i++) {
      setArr.push({ setID: i, weight: '', reps: '' });
    }
    console.log(setArr);
    return setArr;
  }

  render() {
    // console.log(this.props);
    // console.log(this.props.day);

    return (
      <Card>
        <WorkoutForm {...this.props} />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Create
          </Button>
        </CardSection>
      </Card>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  const { name, muscle, setNumber, weightType, note, sets, checked } = state.workoutForm;

  return { name, muscle, day: ownProps.day, setNumber, weightType, note, sets, checked };
};

export default connect(mapStateToProps, {
  workoutUpdate, workoutCreate
})(WorkoutCreate);
