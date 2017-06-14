import _ from 'lodash';
import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import CheckBox from 'react-native-check-box';
import { connect } from 'react-redux';
import { todayWorkoutsStore } from '../actions';
import { CardSection } from './common';

class ListItem extends Component {
  // state = { checked: false };
  componentWillMount() {
    // console.log('componentWillMount');
  }

  onRowPress() {
    console.log('ONROWPRESS');
    console.log(this.props.workout);
    // Actions.workoutEdit({ workout: this.props.workout, title: this.props.workout.name });
    Actions.workoutDetails({
      workout: this.props.workout,
      title: this.props.workout.name,
      uid: this.props.workout.uid
    });
  }

  onClick(data) {
    console.log(data);
    const { todayWorkouts } = this.props;
    Actions.refresh();

    const checkedItem = _.find(todayWorkouts, ['name', data.name]);
    if (checkedItem.checked === true) {
      // console.log(checkedItem);
      checkedItem.checked = false;
    } else if (checkedItem.checked === false) {
      // console.log(checkedItem);
      checkedItem.checked = true;
    }

    this.props.todayWorkoutsStore(checkedItem, todayWorkouts);
    this.checkUncheckedItem(todayWorkouts);
  }

  checkUncheckedItem(todayWorkouts) {
    const uncheckedItem = _.filter(todayWorkouts, ['checked', false]);
    // console.log(uncheckedItem);
    // console.log(uncheckedItem.length);
    if (uncheckedItem.length === 0) {
      // console.log('All checked!');
      Actions.workoutFinish({ todayWorkouts });
    }
  }

  renderCheckBox(data) {
    const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date();
    const today = weekday[date.getDay()];

    if (today === this.props.workout.day) {
      // console.log(this.props.workout);
      // console.log(this.props.workout.checked);
      return (
        <CheckBox
          style={{ flex: 1, justifyContent: 'center' }}
          isChecked={this.props.workout.checked}
          onClick={() => this.onClick(data)}
          // leftText={leftText}
        />
      );
    }
  }


  render() {
    const { name, setNumber, muscle } = this.props.workout;

    // console.log(this.props.workoutsNum);

    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          <CardSection style={{ height: 80, paddingLeft: 10, paddingRight: 10 }}>
            <View style={styles.textWrapper}>
              <View style={styles.titleTextWrapper}>
                <Text style={styles.titleStyle}>
                  {name}
                </Text>
              </View>
              <View style={styles.detailsTextWrapper}>
                <Text style={styles.detailsTextStyle}>
                  {muscle} / {setNumber} sets
                </Text>
              </View>
            </View>

            <View style={styles.boxWrapper}>
              {this.renderCheckBox(this.props.workout)}
            </View>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  textWrapper: {
    flex: 7
  },
  boxWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    // borderWidth: 1,
    // borderColor: 'gray'
  },

  titleTextWrapper: {
    flex: 3,
    justifyContent: 'center'
    // borderWidth: 1,
    // borderColor: 'gray'
  },
  titleStyle: {
    fontSize: 18,
    // paddingLeft: 15
  },
  detailsTextWrapper: {
    flex: 1
    // borderWidth: 1,
    // borderColor: 'gray'
  },
  detailsTextStyle: {
    fontSize: 14,
    // paddingLeft: 15
  }
};

// export default ListItem;
export default connect(null, { todayWorkoutsStore })(ListItem);
