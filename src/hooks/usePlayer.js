import { useState, useEffect, useCallback } from "react";

export function usePlayer(totalSteps) {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [delay, setDelay] = useState(500);

  const lastIndex = Math.max(0, totalSteps - 1);

  const next = useCallback(() => {
    setIndex((i) => {
      const nextIdx = Math.min(i + 1, lastIndex);
      if (nextIdx >= lastIndex) {
        setIsPlaying(false);
      }
      return nextIdx;
    });
  }, [lastIndex]);

  const prev = useCallback(() => {
    setIsPlaying(false);
    setIndex((i) => Math.max(i - 1, 0));
  }, []);

  const reset = useCallback(() => {
    setIsPlaying(false);
    setIndex(0);
  }, []);

  const togglePlay = useCallback(() => {
    if (lastIndex === 0) return;

    if (!isPlaying && index >= lastIndex) {
      setIndex(0);
      setIsPlaying(true);
      return;
    }

    setIsPlaying((playing) => !playing);
  }, [isPlaying, index, lastIndex]);

  // Playback interval effect (auto-pauses inside the timer callback at the final step)
  useEffect(() => {
    if (!isPlaying) return;

    const id = setInterval(() => {
      setIndex((i) => {
        const nextIdx = i + 1;
        if (nextIdx >= lastIndex) {
          setIsPlaying(false);
          return lastIndex;
        }
        return nextIdx;
      });
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