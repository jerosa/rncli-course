import { useState } from "react"

// clean code to extend options
interface Options {
  initialValue: number;
}


export const useCounter = ({ initialValue = 0 }: Options) => {

  const [count, setCount] = useState<number>(initialValue);

  const increaseBy = (value: number) => {
    const newValue = count + value;
    if (newValue < 0) return
    setCount(count + value);
  }

  return {
    // properties
    count,

    // methods
    increaseBy
  }
}
