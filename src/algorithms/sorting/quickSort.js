export function getQuickSortSteps(input) {
  const arr = [...input];
  const steps = [];
  const sorted = [];
  const n = arr.length;

  function record(extra = {}) {
    steps.push({
      array: [...arr],
      comparing: [],
      swapped: [],
      sorted: [...sorted],
      range: null,
      pivot: null,
      ...extra,
    });
  }

  record();

  function partition(low, high) {
    const pivotValue = arr[high];
    let i = low - 1;

    record({ range: [low, high], pivot: high });

    for (let j = low; j < high; j++) {
      record({
        range: [low, high],
        pivot: high,
        comparing: [j, high],
      });

      if (arr[j] < pivotValue) {
        i++;
        if (i !== j) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          record({
            range: [low, high],
            pivot: high,
            swapped: [i, j],
          });
        }
      }
    }

    const pivotFinalIndex = i + 1;
    if (pivotFinalIndex !== high) {
      [arr[pivotFinalIndex], arr[high]] = [arr[high], arr[pivotFinalIndex]];
    }

    sorted.push(pivotFinalIndex);

    record({
      range: [low, high],
      pivot: pivotFinalIndex,
      swapped: pivotFinalIndex !== high ? [pivotFinalIndex, high] : [],
    });

    return pivotFinalIndex;
  }

  function quickSort(low, high) {
    if (low < high) {
      const p = partition(low, high);
      quickSort(low, p - 1);
      quickSort(p + 1, high);
    } else if (low === high && low >= 0 && low < n) {
      // Single-element subarray is already in its final position
      sorted.push(low);
      record({ range: [low, high] });
    }
  }

  if (n > 0) {
    quickSort(0, n - 1);
  }

  record({
    sorted: Array.from({ length: n }, (_, idx) => idx),
  });

  return steps;
}
