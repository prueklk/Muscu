import React, { Component } from 'react';
import { Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import { setsUpdate } from '../actions';

class SetItem extends Component {
  render() {
    // const { name, setNumber, muscle, sets } = this.props.workout;
    // console.log(this.props);
    const {
      inputStyle,
      labelStyle,
      setContainerStyle
    } = styles;
    const { setID } = this.props.set;
    const { sets } = this.props;

    // console.log(setID);
    // console.log(sets);

    return (
      <View style={setContainerStyle}>
        <Text style={labelStyle}>Set {parseInt(setID, 10) + 1}:</Text>
        <TextInput
          autoCorrect={false}
          style={inputStyle}
          placeholder='20'
          onChangeText={value => this.props.setsUpdate({ prop: 'weight', value, setID })}
          value={sets[setID].weight}
        />
        <Text style={labelStyle}>kg  x</Text>
        <TextInput
          autoCorrect={false}
          style={inputStyle}
          placeholder='10'
          onChangeText={value => this.props.setsUpdate({ prop: 'reps', value, setID })}
          value={sets[setID].reps}
        />
        <Text style={labelStyle}>reps</Text>
      </View>
    );
  }
}

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 1,
    textAlign: 'right'
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  setContainerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

const mapStateToProps = (state) => {
  const { name, muscle, day, setNumber, weightType, note, sets, checked } = state.workoutForm;

  return { name, muscle, day, setNumber, weightType, note, sets, checked };
};

export default connect(mapStateToProps, { setsUpdate })(SetItem);
