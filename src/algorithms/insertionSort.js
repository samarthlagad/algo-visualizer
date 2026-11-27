export function getInsertionSortSteps(input) {
  const arr = [...input];
  const steps = [];
  const n = arr.length;

  steps.push({
    array: [...arr],
    comparing: [],
    swapped: [],
    sorted: n > 0 ? [0] : [],
  });

  for (let i = 1; i < n; i++) {
    const currentSorted = Array.from({ length: i }, (_, idx) => idx);

    for (let j = i; j > 0; j--) {
      steps.push({
        array: [...arr],
        comparing: [j - 1, j],
        swapped: [],
        sorted: [...currentSorted],
      });

      if (arr[j - 1] > arr[j]) {
        [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];

        steps.push({
          array: [...arr],
          comparing: [],
          swapped: [j - 1, j],
          sorted: [...currentSorted],
        });
      } else {
        break;
      }
    }
    const updatedSorted = Array.from({ length: i + 1 }, (_, idx) => idx);
    steps.push({
      array: [...arr],
      comparing: [],
      swapped: [],
      sorted: updatedSorted,
    });
  }

  steps.push({
    array: [...arr],
    comparing: [],
    swapped: [],
    sorted: Array.from({ length: n }, (_, idx) => idx),
  });

  return steps;
}