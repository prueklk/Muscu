// Import libraries for making a component
import React from 'react';
import { Text, View } from 'react-native';

// Make a component
const Header = (props) => {
  const { textStyle, viewStyle } = styles;

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.headerText}</Text>
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#00cca1',
    justifyContent: 'center',
    alignItems: 'center',
    height: 64,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
    borderColor: '#000',
    borderBottomWidth: 0.5
  },
  textStyle: {
    fontSize: 19,
    color: 'white'
  }
};

// Make the component available to other parts of the app
export { Header };
