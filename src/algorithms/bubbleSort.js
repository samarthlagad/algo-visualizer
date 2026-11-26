export function getBubbleSortSteps(input) {
  const arr = [...input];
  const steps = [];
  const n = arr.length;
  let sortedFrom = n;

  for (let i = 0; i < n - 1; i++) {
    let didSwap = false;

    for (let j = 0; j < n - 1 - i; j++) {
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        swapped: false,
        sortedFrom,
      });

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        didSwap = true;

        steps.push({
          array: [...arr],
          comparing: [j, j + 1],
          swapped: true,
          sortedFrom,
        });
      }
    }

    sortedFrom = n - 1 - i;

    if (!didSwap) {
      break;
    }
  }

  steps.push({
    array: [...arr],
    comparing: [],
    swapped: false,
    sortedFrom: 0,
  });

  return steps;
}