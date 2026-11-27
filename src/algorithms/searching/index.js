import { getLinearSearchSteps } from './linearSearch.js';
import { getBinarySearchSteps } from './binarySearch.js';

export const SEARCH_ALGORITHMS = {
  linear: getLinearSearchSteps,
  binary: getBinarySearchSteps,
};