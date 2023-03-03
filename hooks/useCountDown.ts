import { useEffect, useState } from "react";

export function useCountDown(idx: number, initialCount: number) {
  const [countDown, setCountDown] = useState(initialCount);

  useEffect(() => {
    if (idx == -1) {
      return;
    } // don't update on open - only when it's updated
    const intervalId = window.setInterval(() => {
      setCountDown((count) => {
        console.log(count);
        return count - 1;
      });
    }, 1000); // runs every second

    return () => window.clearInterval(intervalId); // runs on dismount - cleanup function
  }, [idx]);

  useEffect(() => {
    setCountDown(initialCount)
  }, [initialCount]);

  return countDown;
}
