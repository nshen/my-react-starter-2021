import { useEffect, useRef } from 'react';

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    if (delay === null) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
}

export default useInterval;

// from: https://usehooks-typescript.com/react-hook/use-interval
// also read: https://overreacted.io/making-setinterval-declarative-with-react-hooks/

//* Usage:

/*

import React, { ChangeEvent, useState } from 'react'

import useInterval from './useInterval'

export default function Component() {
  // The counter
  const [count, setCount] = useState<number>(0)
  // Dynamic delay
  const [delay, setDelay] = useState<number>(1000)
  // ON/OFF
  const [isPlaying, setPlaying] = useState<boolean>(false)

  useInterval(
    () => {
      // Your custom logic here
      setCount(count + 1)
    },
    // Delay in milliseconds or null to stop it
    isPlaying ? delay : null,
  )

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDelay(Number(event.target.value))
  }

  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => setPlaying(!isPlaying)}>
        {isPlaying ? 'pause' : 'play'}
      </button>
      <p>
        <label htmlFor="delay">Delay: </label>
        <input
          type="number"
          name="delay"
          onChange={handleChange}
          value={delay}
        />
      </p>
    </>
  )
}
*/
