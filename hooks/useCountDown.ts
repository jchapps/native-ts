import { useEffect, useRef, useState } from "react";

export function useCountDown(idx: number, initialCount: number) {
  const [countDown, setCountDown] = useState(initialCount);
  const intervalRef = useRef<number>() // we don't want to lose the current number when component remounts

  useEffect(() => {
    if (idx == -1) {
      return;
    } // don't update on open - only when it's updated
    intervalRef.current = window.setInterval(() => {
      setCountDown((count) => {
        console.log(count);
        return count - 1;
      });
    }, 50); // runs every second

    return cleanup; // runs on dismount - cleanup function
  }, [idx]);

  useEffect(() => {
    setCountDown(initialCount)
  }, [initialCount]);

  useEffect(() => {
    if (countDown === 0) {
      cleanup()
    }
  }, [countDown])

  const cleanup = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current)
      intervalRef.current = undefined
    }

  }

  return countDown;
}
