import { useEffect, useRef, useState } from "react";

export function useCountDown(idx: number, initialCount: number = -1) {
  const [countDown, setCountDown] = useState(initialCount);
  const intervalRef = useRef<number>(); // we don't want to lose the current number when component remounts
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (idx == -1) {
      return;
    } // don't update on open - only when it's updated

    if (isRunning && !intervalRef.current) {
      intervalRef.current = window.setInterval(() => {
        setCountDown((count) => {
          console.log(count);
          return count - 1;
        });
      }, 10); // runs every second
    }

    return cleanup; // runs on dismount - cleanup function
  }, [idx, isRunning]);

  useEffect(() => {
    setCountDown(initialCount);
  }, [initialCount]);

  useEffect(() => {
    if (countDown === 0) {
      cleanup();
    }
  }, [countDown]);

  const cleanup = () => {
    if (intervalRef.current) {
      setIsRunning(false); // cd stops running
      window.clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  };

  return {
    countDown,
    isRunning,
    stop: cleanup,
    start: (count?: number) => {
      setCountDown(count ?? initialCount) //if count is not provided then use inital count
      setIsRunning(true);
    },
  };
}
