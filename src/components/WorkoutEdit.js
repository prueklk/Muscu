import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import WorkoutForm from './WorkoutForm';
import { workoutUpdate, workoutSave, workoutDelete, workoutEditSave } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';

class WorkoutEdit extends Component {
  state = { showModal: false, oldSetNumber: this.props.setNumber };

  //
  // componentWillMount() {
  //   _.each(this.props.workout, (value, prop) => {
  //     this.props.workoutUpdate({ prop, value });
  //   }); // update every property of this.props.workout
  //   // and update the reducer with the new property
  //   console.log(this.props.workout);
  // }
  componentWillMount() {
    console.log(this.props);
    _.each(this.props, (value, prop) => {
      this.props.workoutUpdate({ prop, value });
    }); // update every property of this.props.workout
    // and update the reducer with the new property

    this.setState({ oldSetNumber: this.props.setNumber });
  }

  onButtonPress() {
    const { name, muscle, day, setNumber, weightType, note, uid, sets, checked } = this.props;

    // console.log(this.props);
    // this.props.workoutEditSave({
    this.props.workoutSave({
      name,
      muscle,
      day,
      uid,
      setNumber,
      weightType,
      note,
      sets: this.editSets(sets, setNumber),
      checked
    });
  }

  onAccept() {
    const { uid } = this.props;
    this.props.workoutDelete({ uid });
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  editSets(sets, setNumber) {
    // console.log(setNumber);
    const { oldSetNumber } = this.state;
    const difLength = setNumber - oldSetNumber;
    const setsArr = _.map(sets, (val, uid) => {
      return { ...val, uid }; // { day: 'Monday, name: 'John', id: '1234' };
    }); // turn object into array

    if (difLength > 0) {
      for (const i = 0; i < difLength; i++) {
        const newID = parseInt(oldSetNumber, 10) + parseInt(i, 10);
        setsArr.push({ setID: newID, weight: '', reps: '' });
      }
    } else if (difLength < 0) {
      setsArr.splice(setNumber, difLength * (-1));
    }
    // console.log(sets);
    // console.log(setsArr);
    return setsArr;
  }


  render() {
    // console.log(this.props.workout); // undefined
    // console.log(this.props); // all props
    // console.log(this.state);
    // console.log(this.props.uid);

    return (
      <ScrollView>
      <Card>
        <WorkoutForm />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Save Changes
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
            Delete Workout
          </Button>
        </CardSection>

        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Are you sure you want to delete this?
        </Confirm>
      </Card>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    name, muscle, day, setNumber, weightType, note, uid, sets, checked
  } = state.workoutForm;
  // console.log(state);

  return { name, muscle, day, setNumber, weightType, note, uid, sets, checked };
};

export default connect(mapStateToProps, {
  workoutUpdate, workoutSave, workoutDelete, workoutEditSave
})(WorkoutEdit);
