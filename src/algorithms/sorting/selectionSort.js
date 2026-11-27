export function getSelectionSortSteps(input) {
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
    let minIdx = i;

    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: [...arr],
        comparing: [minIdx, j],
        swapped: [],
        sorted: [...sorted],
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      steps.push({
        array: [...arr],
        comparing: [],
        swapped: [i, minIdx],
        sorted: [...sorted],
      });
    }

    sorted.push(i);
  }

  steps.push({
    array: [...arr],
    comparing: [],
    swapped: [],
    sorted: Array.from({ length: n }, (_, idx) => idx),
  });

  return steps;
}