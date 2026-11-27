import { getBubbleSortSteps } from "./bubbleSort";
import { getSelectionSortSteps } from "./selectionSort";
import { getInsertionSortSteps } from "./insertionSort";

export const ALGORITHMS = {
  bubble: getBubbleSortSteps,
  selection: getSelectionSortSteps,
  insertion: getInsertionSortSteps,
};