import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({
  label, value, onChangeText, placeholder, secureTextEntry, multiline,
  onContentSizeChange, inputHeight
}) => {
  const { inputStyle, labelStyle } = styles;
  
  return (
    <View style={renderContainerStyle(inputHeight)} >
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        onContentSizeChange={onContentSizeChange}
      />
    </View>
  );
};

const renderContainerStyle = (inputHeight) => {
  if (inputHeight) {
    return {
      height: inputHeight,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center'
    };
  }
  return {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  };
};

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export { Input };
