import { getBubbleSortSteps } from './bubbleSort.js';
import { getSelectionSortSteps } from './selectionSort.js';
import { getInsertionSortSteps } from './insertionSort.js';
import { getMergeSortSteps } from './mergeSort.js';
import { getQuickSortSteps } from './quickSort.js';

export const ALGORITHMS = {
  bubble: getBubbleSortSteps,
  selection: getSelectionSortSteps,
  insertion: getInsertionSortSteps,
  merge: getMergeSortSteps,
  quick: getQuickSortSteps,
};