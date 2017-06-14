import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, View, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { workoutsFetch } from '../actions';
import ListItem from './ListItem';
import { CardSection, Button, Header, Spinner } from './common';


class WorkoutList extends Component {
  state = { todayWorkouts: [] };

  componentWillMount() {
    this.props.workoutsFetch();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the nest set of props that this component
    // will be rendered with
    // this.props is still the old set of props
    // console.log(this.props);
    // console.log(nextProps);

    this.createDataSource(nextProps);
  }

  createDataSource({ selectedWorkouts }) {
    // console.log(selectedWorkouts);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(selectedWorkouts);
  }

  renderRow(workout) {
    return (
      <ListItem
      workout={workout}
      workoutsNum={this.props.workoutsNum}
      todayWorkouts={this.props.todayWorkouts}
      />
    );
  }

  renderFinishButton() {
    const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date();
    const today = weekday[date.getDay()];
    // console.log(today);

    if (today === this.props.day) {
      return (
        <CardSection>
          <Button
            onPress={() => Actions.workoutFinish({ todayWorkouts: this.props.todayWorkouts })}
          >
            Finish
          </Button>
        </CardSection>
      );
    }
  }

  renderLists() {
    if (this.props.loading_workouts) {
      return <Spinner size="large" />;
    }

    return (
        <View style={styles.slide}>
          <Header headerText={this.props.day} />
          <ScrollView>
            <ListView
              enableEmptySections
              dataSource={this.dataSource}
              renderRow={this.renderRow.bind(this)}
            />
            <CardSection>
              <Button onPress={() => Actions.workoutCreate({ day: this.props.day })}>
                + Add exercise
              </Button>
            </CardSection>
            {this.renderFinishButton()}
          </ScrollView>
        </View>
    );
  }

  render() {
    // console.log(this.props);
    // console.log(this.props.selectedWorkouts);
    // console.log(this.state);
    return (
      this.renderLists()
    );
  }
}

const styles = {
  slide: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#1d71b8',
    paddingBottom: 35
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
};


const mapStateToProps = (state, ownProps) => {
  const { loading_workouts } = state.workoutsRender;

  const workouts = _.map(state.workouts, (val, uid) => {
    return { ...val, uid }; // { day: 'Monday, name: 'John', id: '1234' };
  }); // turn object into array
  const selectedWorkouts = _.filter(workouts, ['day', ownProps.day]);
  const workoutsNum = selectedWorkouts.length;

  const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = new Date();
  const today = weekday[date.getDay()];
  // console.log(today);
  const todayWorkouts = _.filter(selectedWorkouts, ['day', today]);
  // console.log(todayWorkouts);

  return { selectedWorkouts, loading_workouts, workoutsNum, todayWorkouts };
};

export default connect(mapStateToProps, { workoutsFetch })(WorkoutList);
