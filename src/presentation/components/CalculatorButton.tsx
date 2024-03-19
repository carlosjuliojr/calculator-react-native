import React from 'react';
import {Pressable, Text} from 'react-native';
import {colors, styles} from '../../config/theme/app-theme';

interface Props {
  label: string;
  color?: string;
  width?: number;
  blackText?: boolean;
  textAlign?: string;
  onPress: () => void;
}

export const CalculatorButton = ({
  label,
  color,
  width,
  blackText = false,
  textAlign,
  onPress,
}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => ({
        ...styles.button,
        width: width ? width : 80,
        backgroundColor: color ? color : colors.darkGray,
        opacity: pressed ? 0.8 : 1,
      })}>
      <Text
        style={{
          ...styles.buttonText,
          color: blackText ? 'black' : 'white',
        }}>
        {label}
      </Text>
    </Pressable>
  );
};
