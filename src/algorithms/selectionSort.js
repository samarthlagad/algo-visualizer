export function getSelectionSortSteps(input) {
  const arr = [...input];
  const steps = [];
  const sorted = [];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: [...arr],
        comparing: [minIdx, j],
        swapped: false,
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
        comparing: [i, minIdx],
        swapped: true,
        sorted: [...sorted],
      });
    }

    sorted.push(i);
  }

  if (n > 0) sorted.push(n - 1);

  steps.push({
    array: [...arr],
    comparing: [],
    swapped: false,
    sorted: [...sorted],
  });

  return steps;
}