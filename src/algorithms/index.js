import { getBubbleSortSteps } from './bubbleSort.js';
import { getSelectionSortSteps } from './selectionSort.js';
import { getInsertionSortSteps } from './insertionSort.js';
import { getMergeSortSteps } from './mergeSort.js';
import { getQuickSortSteps } from './quickSort.js';
import { getLinearSearchSteps } from './linearSearch.js';
import { getBinarySearchSteps } from './binarySearch.js';

export const ALGORITHMS = {
  bubble: getBubbleSortSteps,
  selection: getSelectionSortSteps,
  insertion: getInsertionSortSteps,
  merge: getMergeSortSteps,
  quick: getQuickSortSteps,
};

export const SEARCH_ALGORITHMS = {
  linear: getLinearSearchSteps,
  binary: getBinarySearchSteps,
};