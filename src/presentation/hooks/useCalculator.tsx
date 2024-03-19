import {useEffect, useRef, useState} from 'react';

enum Operator {
  add = '+',
  substract = '-',
  division = '/',
  multiply = '*',
}

export const useCalculator = () => {
  const [formula, setFormula] = useState('');
  const [number, setNumber] = useState('0');
  const [numberSelected, setNumberSelected] = useState('0');

  const lastOperator = useRef<Operator>();

  useEffect(() => {
    if (lastOperator.current) {
      const firstFormulaPart = formula.split(' ').at(0);
      setFormula(`${firstFormulaPart} ${lastOperator.current} ${number}`);
    } else {
      setFormula(number);
    }
  }, [number]);

  useEffect(() => {
    const subResult = calculateSubResult();
    setNumberSelected(String(subResult));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formula]);

  const clean = () => {
    setNumber('0');
    setNumberSelected('0');
    lastOperator.current = undefined;
    setFormula('');
  };
  const deleteNumber = () => {
    if (number.length === 2 && number.includes('-')) {
      setNumber('0');
      setNumberSelected('0');
      return;
    }
    setNumber(number.substring(0, number.length - 1));
  };
  const toggleSign = () => {
    if (number.includes('-')) {
      return setNumber(number.replace('-', ''));
    }
    setNumber('-' + number);
  };
  const buildNumber = (numberString: string) => {
    if (number.includes('.') && numberString === '.') {
      return;
    }
    if (number.startsWith('0') || number.startsWith('-0')) {
      //point decimal
      if (numberString === '.') {
        return setNumber(number + numberString);
      }
      //Evaluate if there is a zero and there are not others one
      if (numberString === '0' && number.includes('.')) {
        return setNumber(number + numberString);
      }
      //Dont allow of is not equals to zero and there are not point and its first numbner
      if (numberString !== '0' && !number.includes('.')) {
        return setNumber(numberString);
      }
      //Dont allow of is not equals to zero and there are not point and its first numbner
      if (numberString === '0' && !number.includes('.')) {
        return;
      }
    }
    setNumberSelected(numberString === '.' ? '' : numberString);
    setNumber(number + numberString);
  };

  const setLastNumber = () => {
    calculateResult();
    if (number.endsWith('.')) {
      setNumberSelected(number.slice(0, -1));
    } else {
      setNumberSelected(number);
    }
    setNumber('0');
  };

  const divideOperation = () => {
    setLastNumber();
    lastOperator.current = Operator.division;
  };

  const multiplyOperation = () => {
    setLastNumber();
    lastOperator.current = Operator.multiply;
  };

  const substractOperation = () => {
    setLastNumber();
    lastOperator.current = Operator.substract;
  };

  const addOperation = () => {
    setLastNumber();
    lastOperator.current = Operator.add;
  };

  const calculateSubResult = (): number => {
    const [firstValue, operator, secondValue] = formula.split(' ');

    const num1 = Number(firstValue);
    const num2 = Number(secondValue);

    if (isNaN(num2)) return num1;

    switch (operator) {
      case Operator.add:
        return num1 + num2;
      case Operator.substract:
        return num1 - num2;
      case Operator.multiply:
        return num1 * num2;
      case Operator.division:
        return num1 / num2;

      default:
        break;
    }
  };

  const calculateResult = () => {
    const result = calculateSubResult();
    setFormula(String(result));

    lastOperator.current = undefined;
    setNumberSelected('0');
  };

  return {
    // properties
    number,
    numberSelected,
    formula,
    // methods
    buildNumber,
    clean,
    deleteNumber,
    toggleSign,
    divideOperation,
    substractOperation,
    multiplyOperation,
    addOperation,
    calculateResult,
  };
};
