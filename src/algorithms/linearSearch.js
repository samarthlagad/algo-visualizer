export function getLinearSearchSteps(input, target) {
  const arr = [...input];
  const steps = [];
  const eliminated = [];
  const n = arr.length;

  steps.push({
    array: [...arr],
    current: null,
    found: null,
    low: null,
    high: null,
    mid: null,
    eliminated: [],
  });

  for (let i = 0; i < n; i++) {
    steps.push({
      array: [...arr],
      current: i,
      found: null,
      low: null,
      high: null,
      mid: null,
      eliminated: [...eliminated],
    });

    if (arr[i] === target) {
      steps.push({
        array: [...arr],
        current: null,
        found: i,
        low: null,
        high: null,
        mid: null,
        eliminated: [...eliminated],
      });
      return steps;
    }

    eliminated.push(i);
  }

  steps.push({
    array: [...arr],
    current: null,
    found: null,
    low: null,
    high: null,
    mid: null,
    eliminated: [...eliminated],
  });

  return steps;
}