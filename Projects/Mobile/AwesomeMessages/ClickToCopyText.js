import React from 'react';
import { TouchableOpacity, Text, Alert } from 'react-native';

// Use the appropriate import based on your RN version
// For RN 0.63 and above
import Clipboard from '@react-native-community/clipboard';
// For RN below 0.63
// import { Clipboard } from 'react-native';

const ClickToCopyText = ({ text }) => {
  const handlePress = () => {
    Clipboard.setString(text);
    Alert.alert('Copied to clipboard', text);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

export default ClickToCopyText;
