import { useState, useEffect, useCallback } from "react";

export function usePlayer(totalSteps) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [delay, setDelay] = useState(500);

  const lastIndex = Math.max(0, totalSteps - 1);
  const isPlaying = playing && index < lastIndex;

  const next = useCallback(() => {
    setIndex((i) => Math.min(i + 1, lastIndex));
  }, [lastIndex]);

  const prev = useCallback(() => {
    setPlaying(false);
    setIndex((i) => Math.max(i - 1, 0));
  }, []);

  const reset = useCallback(() => {
    setPlaying(false);
    setIndex(0);
  }, []);

  const togglePlay = useCallback(() => {
    if (lastIndex === 0) return;

    if (!isPlaying && index >= lastIndex) {
      setIndex(0);
      setPlaying(true);
      return;
    }

    setPlaying(!isPlaying);
  }, [isPlaying, index, lastIndex]);

  // Pure interval tick: only advances index
  useEffect(() => {
    if (!isPlaying) return;

    const id = setInterval(() => {
      setIndex((i) => Math.min(i + 1, lastIndex));
    }, delay);

    return () => clearInterval(id);
  }, [isPlaying, delay, lastIndex]);

  return {
    index,
    isPlaying,
    delay,
    next,
    prev,
    reset,
    togglePlay,
    setDelay,
  };
}