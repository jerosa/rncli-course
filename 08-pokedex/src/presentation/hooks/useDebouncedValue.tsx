import { useEffect, useState } from 'react';


export const useDebouncedValue = ( input: string, time: number = 500 ) => {

  const [ debouncedValue, setDebouncedValue ] = useState( input );
  useEffect( () => {
    const timeout = setTimeout( () => {
      setDebouncedValue( input );
    }, time );

    // explain: this will clear the timeout if the component unmounts or the input changes
    return () => {
      clearTimeout( timeout );
    };
  }, [ input, time ] );

  return (
    debouncedValue
  );
};
