import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, ScrollView, ListView, Linking } from 'react-native';
import { connect } from 'react-redux';
// import { Actions } from 'react-native-router-flux';
import HyperLink from 'react-native-hyperlink';
import { workoutUpdate, workoutEditCancel, setsUpdate, workoutSave } from '../actions';
import { CardSection, Button } from './common';
import SetItem from './SetItem';


class WorkoutDetails extends Component {
  componentWillMount() {
    console.log('COMPONENTWILLMOUNT');
    console.log(this.props.workout);
    _.each(this.props.workout, (value, prop) => {
      this.props.workoutUpdate({ prop, value });
    }); // update every property of this.props.workout
    // and update the reducer with the new property

    _.each(this.props.workout.sets, (value, prop) => {
      this.props.setsUpdate({ prop, value });
    });
    // console.log(this.props.workout);

    this.createDataSource(this.props.workout.sets);
  }

  componentDidMount() {
    console.log('componentDidMount');
    // _.each(this.props.workout, (value, prop) => {
    //   this.props.workoutUpdate({ prop, value });
    // }); // update every property of this.props.workout
    // // and update the reducer with the new property
    //
    // _.each(this.props.workout.sets, (value, prop) => {
    //   this.props.setsUpdate({ prop, value });
    // });
    // console.log(this.props.workout);
  }

  componentWillUnmount() {
    // console.log(this.props);
    console.log('COMPONENTWILLUNMOUNT');
    this.props.workoutEditCancel();
  }


  onButtonPress() {
    const { name, muscle, day, setNumber, weightType, note, uid, sets, checked } = this.props;
    // console.log(sets);
    this.props.workoutSave({
      name,
      muscle,
      day,
      uid,
      setNumber,
      weightType,
      note,
      sets,
      checked
    });
  }

  createDataSource(sets) {
    // console.log(sets);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(sets);
  }

  renderRow(set) {
    // console.log(set);
    return <SetItem set={set} />;
  }

  renderNote() {
    // console.log(this.props.note);
    if (this.props.note !== '') {
      return (
        <CardSection style={{ paddingLeft: 10, paddingRight: 10 }}>
          <HyperLink linkStyle={{ color: '#1D71B8' }} onPress={(url) => Linking.openURL(url)}>
            <Text style={styles.noteTextStyle}>
              Note: {this.props.note}
            </Text>
          </HyperLink>
        </CardSection>
      );
    }
  }

  render() {
    console.log('render');
    console.log(this.props.sets);
    const {
      dayContainerStyle,
      dayTextStyle,
      setSectionStyle,
    } = styles;

    return (
      <ScrollView>
        {this.renderNote()}
        <View style={dayContainerStyle}>
          <Text style={dayTextStyle}>{this.props.day}</Text>
        </View>

        <View style={setSectionStyle}>
          <ListView
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={this.renderRow}
          />
        </View>
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Done
          </Button>
        </CardSection>
      </ScrollView>
    );
  }
}

const styles = {
  dayContainerStyle: {
    marginTop: 20,
    marginBottom: 20
  },
  dayTextStyle: {
    // flex: 1,
    fontSize: 24,
    paddingLeft: 20,
    textAlign: 'center'
  },
  setSectionStyle: {
    marginBottom: 20
  },
  noteTextStyle: {
    fontSize: 14,
    // paddingLeft: 15
  }
};

const mapStateToProps = (state) => {
  const { name, muscle, day, setNumber, weightType, note, sets, checked } = state.workoutForm;
  // const { workout } = this.props.workout;
  // console.log(workout);
  return { name, muscle, day, setNumber, weightType, note, sets, checked };
};

export default connect(mapStateToProps, {
  workoutUpdate, workoutEditCancel, setsUpdate, workoutSave
})(WorkoutDetails);
