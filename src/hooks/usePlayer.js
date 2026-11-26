import { useState, useEffect, useCallback } from "react";

export function usePlayer(totalSteps) {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [delay, setDelay] = useState(500);

  const lastIndex = Math.max(0, totalSteps - 1);

  const next = useCallback(() => {
    setIndex((i) => Math.min(i + 1, lastIndex));
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
    setIsPlaying((playing) => {
      if (!playing && index >= lastIndex) {
        setIndex(0);
      }
      return !playing;
    });
  }, [index, lastIndex]);

  // Playback interval effect
  useEffect(() => {
    if (!isPlaying) return;

    const id = setInterval(() => {
      setIndex((i) => Math.min(i + 1, lastIndex));
    }, delay);

    return () => clearInterval(id);
  }, [isPlaying, delay, lastIndex]);

  // Auto-pause effect when reaching the final step
  useEffect(() => {
    if (index >= lastIndex) {
      setIsPlaying(false);
    }
  }, [index, lastIndex]);

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
