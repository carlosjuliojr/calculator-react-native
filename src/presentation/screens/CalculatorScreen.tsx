import React from 'react';
import {Text, View} from 'react-native';
import {colors, styles} from '../../config/theme/app-theme';
import {CalculatorButton} from '../components/CalculatorButton';
import {useCalculator} from '../hooks/useCalculator';

function CalculatorScreen() {
  const {
    number,
    numberSelected,
    formula,
    buildNumber,
    clean,
    deleteNumber,
    toggleSign,
    divideOperation,
    substractOperation,
    multiplyOperation,
    addOperation,
    calculateResult,
} = useCalculator();

  return (
    <View style={styles.calculatorContainer}>
      <View style={{paddingHorizontal: 30, paddingBottom: 20}}>
        <Text adjustsFontSizeToFit numberOfLines={1} style={styles.mainResult}>
          {formula}
        </Text>
        <Text adjustsFontSizeToFit numberOfLines={1} style={styles.subResult}>{numberSelected}</Text>
      </View>

      <View style={styles.row}>
        <CalculatorButton
          onPress={clean}
          label={'C'}
          color={colors.ligthGray}
          blackText
        />
        <CalculatorButton
          onPress={toggleSign}
          label={'+/-'}
          color={colors.ligthGray}
          blackText
        />
        <CalculatorButton
          onPress={deleteNumber}
          label={'del'}
          color={colors.ligthGray}
          blackText
        />
        <CalculatorButton
          onPress={divideOperation}
          label={'/'}
          color={colors.orange}
        />
        <CalculatorButton onPress={() => buildNumber('7')} label={'7'} />
        <CalculatorButton onPress={() => buildNumber('8')} label={'8'} />
        <CalculatorButton onPress={() => buildNumber('9')} label={'9'} />
        <CalculatorButton
          onPress={multiplyOperation}
          label={'x'}
          color={colors.orange}
        />
        <CalculatorButton onPress={() => buildNumber('4')} label={'4'} />
        <CalculatorButton onPress={() => buildNumber('5')} label={'5'} />
        <CalculatorButton onPress={() => buildNumber('6')} label={'6'} />
        <CalculatorButton
          onPress={substractOperation}
          label={'-'}
          color={colors.orange}
        />
        <CalculatorButton onPress={() => buildNumber('1')} label={'1'} />
        <CalculatorButton onPress={() => buildNumber('2')} label={'2'} />
        <CalculatorButton onPress={() => buildNumber('3')} label={'3'} />
        <CalculatorButton
          onPress={addOperation}
          label={'+'}
          color={colors.orange}
        />
        <CalculatorButton
          onPress={() => buildNumber('0')}
          label={'0'}
          width={180}
          textAlign="left"
        />
        <CalculatorButton onPress={() => buildNumber('.')} label={'.'} />
        <CalculatorButton
          onPress={calculateResult}
          label={'='}
          color={colors.orange}
        />
      </View>
    </View>
  );
}

export default CalculatorScreen;
