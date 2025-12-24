import { useCallback, useEffect, useRef, useState } from 'react';

interface UseTimerReturn {
  timer: number;
  timerDisplay: string;
  isRunning: boolean;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  setTimer: (value: number) => void;
}

export function useTimer(initialValue: number = 0): UseTimerReturn {
  const [timer, setTimerValue] = useState(initialValue);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimerValue((prev) => prev + 1);
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  }, []);

  const resetTimer = useCallback(() => {
    stopTimer();
    setTimerValue(0);
  }, [stopTimer]);

  const setTimer = useCallback((value: number) => {
    setTimerValue(value);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Format timer display
  const timerDisplay = (() => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  })();

  return {
    timer,
    timerDisplay,
    isRunning,
    startTimer,
    stopTimer,
    resetTimer,
    setTimer,
  };
}
