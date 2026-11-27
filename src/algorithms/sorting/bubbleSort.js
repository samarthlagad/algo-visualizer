export function getBubbleSortSteps(input) {
  const arr = [...input];
  const steps = [];
  const sorted = [];
  const n = arr.length;

  steps.push({
    array: [...arr],
    comparing: [],
    swapped: [],
    sorted: [],
  });

  for (let i = 0; i < n - 1; i++) {
    let didSwap = false;

    for (let j = 0; j < n - 1 - i; j++) {
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        swapped: [],
        sorted: [...sorted],
      });

       if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        didSwap = true;

        steps.push({
          array: [...arr],
          comparing: [],
          swapped: [j, j + 1],
          sorted: [...sorted],
        });
      }
    }

    sorted.push(n - 1 - i);

    if (!didSwap) {
      break;
    }
  }

  steps.push({
    array: [...arr],
    comparing: [],
    swapped: [],
    sorted: Array.from({ length: n }, (_, idx) => idx),
  });

  return steps;
}