import React, { Component } from 'react';
import { View, Text, Picker, SegmentedControlIOS } from 'react-native';
import { connect } from 'react-redux';
import { workoutUpdate } from '../actions';
import { CardSection, Input } from './common';

class WorkoutForm extends Component {
  state = { inputHeight: 40 };

  convertValueToIndex(weightType) {
    switch (weightType) {
      case 'Free weights':
        return 0;
      case 'Machine':
        return 1;
      case 'Body weight':
        return 2;
      default:
        return 0;
    }
  }

  render() {
    return (
      <View>
        <CardSection>
          <Input
            label="Exercise name"
            placeholder="Bench press"
            value={this.props.name}
            onChangeText={value => this.props.workoutUpdate({ prop: 'name', value })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Muscle group"
            placeholder="Chest"
            value={this.props.muscle}
            onChangeText={value => this.props.workoutUpdate({ prop: 'muscle', value })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Number of sets"
            placeholder="3"
            value={this.props.setNumber}
            onChangeText={value => this.props.workoutUpdate({ prop: 'setNumber', value })}
          />
        </CardSection>

        <CardSection>
          <SegmentedControlIOS
            style={{ flex: 1 }}
            values={['Free weights', 'Machine', 'Body weight']}
            selectedIndex={this.convertValueToIndex(this.props.weightType)}
            // value='Normal weight'
            onValueChange={value => this.props.workoutUpdate({ prop: 'weightType', value })}
          />
        </CardSection>
        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={styles.pickerTextStyle}>Day</Text>
          <Picker
            selectedValue={this.props.day}
            onValueChange={value => this.props.workoutUpdate({ prop: 'day', value })}
          >
            <Picker.Item label="Monday" value="Monday" />
            <Picker.Item label="Tuesday" value="Tuesday" />
            <Picker.Item label="Wednesday" value="Wednesday" />
            <Picker.Item label="Thursday" value="Thursday" />
            <Picker.Item label="Friday" value="Friday" />
            <Picker.Item label="Saturday" value="Saturday" />
            <Picker.Item label="Sunday" value="Sunday" />
          </Picker>
        </CardSection>
        <CardSection>
          <Input
            label="Note"
            placeholder="Additional note"
            value={this.props.note}
            onChangeText={value => this.props.workoutUpdate({ prop: 'note', value })}
            multiline
            inputHeight={this.state.inputHeight}
            onContentSizeChange={(event) => {
              this.setState({ inputHeight: event.nativeEvent.contentSize.height });
            }}
          />
        </CardSection>

      </View>
    );
  }
}

const styles = {
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20
  }
};

const mapStateToProps = (state) => {
  const { name, muscle, day, setNumber, weightType, note, sets, checked } = state.workoutForm;

  return { name, muscle, day, setNumber, weightType, note, sets, checked };
};

export default connect(mapStateToProps, { workoutUpdate })(WorkoutForm);
