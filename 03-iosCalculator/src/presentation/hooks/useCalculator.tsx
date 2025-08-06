import { useEffect, useRef, useState } from "react"


enum Operator {
  add = '+',
  substract = '-',
  multiply = 'x',
  divide = '÷',
}



export const useCalculator = () => {

  const [number, setNumber] = useState('0');
  const [prevNumber, setPrevNumber] = useState('0');

  const [formula, setFormula] = useState('');

  const lastOperation = useRef<Operator>(null);

  useEffect(() => {
    if (lastOperation.current) {
      const firstFormulaSlice = formula.split(' ').at(0);
      setFormula(`${firstFormulaSlice} ${lastOperation.current} ${number}`);
    }
    else
      setFormula(number);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [number])

  useEffect(() => {
    const subResult = calculateSubResult();
    setPrevNumber(`${subResult}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formula])


  const buildNumber = (numberString: string) => {

    if (number.includes('.') && numberString === '.') return;

    if (number.startsWith('0') || number.startsWith('-0')) {

      // primer numero distinto de punto
      if (numberString !== '0' && !number.includes('.') && numberString !== '.') {
        if (number.startsWith('-'))
          return setNumber('-' + numberString);
        else
          return setNumber(numberString);
      }

      if (numberString === '0' && !number.includes('.'))
        return;
    }


    setNumber(number + numberString);
  }

  const setLastNumber = () => {
    calculateResult();

    if (number.endsWith('.'))
      setPrevNumber(number.slice(0, -1));
    else
      setPrevNumber(number);

    // pixel con resultado operacion
    setNumber('0');
  }

  const divideOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.divide;
  }

  const multiplyOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.multiply;
  }

  const substractOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.substract;
  }

  const addOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.add;
  }

  const calculateResult = () => {
    const result = calculateSubResult();
    setFormula(result.toString());

    lastOperation.current = null;
    setPrevNumber('0');
  }

  const calculateSubResult = (): number => {
    const [firstValue, operation, secondValue] = formula.split(' ');

    const firstNum = Number(firstValue);
    const secondNum = Number(secondValue);

    if (isNaN(secondNum)) return firstNum;

    switch (operation) {
      case Operator.add:
        return firstNum + secondNum;
      case Operator.substract:
        return firstNum - secondNum;
      case Operator.multiply:
        return firstNum * secondNum;
      case Operator.divide:
        return firstNum / secondNum;
      default:
        throw new Error('Operation Not Implemented');
    }
  }

  const clean = () => {
    setNumber('0');
    setPrevNumber('0');
    lastOperation.current = null;
    setFormula('');
  }

  const deleteOperation = () => {
    if (number.length > 2 || (number.length === 2 && !number.startsWith('-')))
      setNumber(number.slice(0, -1));
    else
      setNumber('0');
  }

  const toggleSign = () => {
    if (number.startsWith('-'))
      setNumber(number.substring(1));
    else
      setNumber('-' + number);
  }

  return {
    // properties
    number,
    prevNumber,
    formula,

    // methods
    buildNumber,
    clean,
    deleteOperation,
    toggleSign,
    divideOperation,
    multiplyOperation,
    substractOperation,
    addOperation,
    calculateResult
  }
}
