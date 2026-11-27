export function getBinarySearchSteps(input, target) {
  const arr = [...input];
  const steps = [];
  const eliminated = new Set();
  const n = arr.length;

  let low = 0;
  let high = n - 1;

  steps.push({
    array: [...arr],
    current: null,
    found: null,
    low: n > 0 ? low : null,
    high: n > 0 ? high : null,
    mid: null,
    eliminated: [],
  });

  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);

    steps.push({
      array: [...arr],
      current: mid,
      found: null,
      low,
      high,
      mid,
      eliminated: [...eliminated],
    });

    if (arr[mid] === target) {
      steps.push({
        array: [...arr],
        current: null,
        found: mid,
        low,
        high,
        mid,
        eliminated: [...eliminated],
      });
      return steps;
    }

    if (arr[mid] < target) {
      for (let i = low; i <= mid; i++) {
        eliminated.add(i);
      }
      low = mid + 1;
    } else {
      for (let i = mid; i <= high; i++) {
        eliminated.add(i);
      }
      high = mid - 1;
    }

    steps.push({
      array: [...arr],
      current: null,
      found: null,
      low: low <= high ? low : null,
      high: low <= high ? high : null,
      mid: null,
      eliminated: [...eliminated],
    });
  }

  return steps;
}