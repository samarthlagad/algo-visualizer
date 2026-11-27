export function getMergeSortSteps(input) {
  const arr = [...input];
  const steps = [];
  const n = arr.length;

  steps.push({
    array: [...arr],
    comparing: [],
    swapped: [],
    sorted: [],
    range: null,
  });

  function merge(left, mid, right) {
    const L = arr.slice(left, mid + 1);
    const R = arr.slice(mid + 1, right + 1);

    let i = 0;
    let j = 0; 
    let k = left; 

    while (i < L.length && j < R.length) {
      steps.push({
        array: [...arr],
        comparing: [left + i, mid + 1 + j],
        swapped: [],
        sorted: [],
        range: [left, right],
      });

      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }

      steps.push({
        array: [...arr],
        comparing: [],
        swapped: [k],
        sorted: [],
        range: [left, right],
      });

      k++;
    }

    while (i < L.length) {
      arr[k] = L[i];
      steps.push({
        array: [...arr],
        comparing: [],
        swapped: [k],
        sorted: [],
        range: [left, right],
      });
      i++;
      k++;
    }

    while (j < R.length) {
      arr[k] = R[j];
      steps.push({
        array: [...arr],
        comparing: [],
        swapped: [k],
        sorted: [],
        range: [left, right],
      });
      j++;
      k++;
    }
  }

  function mergeSort(left, right) {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);
    mergeSort(left, mid);
    mergeSort(mid + 1, right);
    merge(left, mid, right);
  }

  if (n > 0) {
    mergeSort(0, n - 1);
  }

  steps.push({
    array: [...arr],
    comparing: [],
    swapped: [],
    sorted: Array.from({ length: n }, (_, idx) => idx),
    range: null,
  });

  return steps;
}