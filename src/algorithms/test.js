import { getBubbleSortSteps } from './bubbleSort.js';

console.log('--- Unsorted: [5, 3, 8, 1] ---');
const steps1 = getBubbleSortSteps([5, 3, 8, 1]);
console.log('total steps:', steps1.length);
steps1.forEach((s, i) => console.log(i, JSON.stringify(s)));

console.log('\n--- Already Sorted: [1, 2, 3, 4] ---');
const steps2 = getBubbleSortSteps([1, 2, 3, 4]);
console.log('total steps:', steps2.length);
steps2.forEach((s, i) => console.log(i, JSON.stringify(s)));