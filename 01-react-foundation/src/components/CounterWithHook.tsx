import { useCounter } from '../hooks/useCounter';

// hook state with custom hook

export const CounterWithHook = () => {

  const { count, increaseBy } = useCounter({
    initialValue: 5
  });

  return (
    <>
      <h3>Contador custom hook: <small>{count}</small></h3>

      <div>
        <button onClick={() => increaseBy(1)}>+1</button>

        &nbsp;
        <button onClick={() => increaseBy(-1)}>-1</button>
      </div>
    </>
  )
}
