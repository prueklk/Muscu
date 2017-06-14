import React, { Component } from 'react';
import { View } from 'react-native';
import Swiper from 'react-native-swiper';
import WorkoutList from './WorkoutList';


class WorkoutDays extends Component {
  render() {
    const date = new Date();

    return (
      <Swiper
        style={styles.wrapper}
        paginationStyle={{ bottom: 10 }}
        index={date.getDay()}
        activeDot={
          <View
            style={{
              backgroundColor: '#00cca1',
              width: 8,
              height: 8,
              borderRadius: 4,
              marginLeft: 3,
              marginRight: 3,
              marginTop: 3,
              marginBottom: 3
            }}
          />
        }
      >
        <WorkoutList day="Sunday" />
        <WorkoutList day="Monday" />
        <WorkoutList day="Tuesday" />
        <WorkoutList day="Wednesday" />
        <WorkoutList day="Thursday" />
        <WorkoutList day="Friday" />
        <WorkoutList day="Saturday" />
      </Swiper>
    );
  }
}

const styles = {
  wrapper: {
  }
};

export default WorkoutDays;
