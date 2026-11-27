export const complexity = {
  bubble: {
    name: 'Bubble Sort',
    best: 'O(n)',
    average: 'O(n²)',
    worst: 'O(n²)',
    space: 'O(1)',
    stable: true,
    description:
      'Steps through the list repeatedly, comparing adjacent bars and swapping them if they are out of order. Larger values bubble to the end on each pass; stops early in O(n) if a full pass makes zero swaps.',
  },
  selection: {
    name: 'Selection Sort',
    best: 'O(n²)',
    average: 'O(n²)',
    worst: 'O(n²)',
    space: 'O(1)',
    stable: false,
    description:
      'Scans the unsorted region to find the smallest value and swaps it into the next sorted slot. Always makes the same number of comparisons regardless of input order, and long swaps can reorder equal values.',
  },
  insertion: {
    name: 'Insertion Sort',
    best: 'O(n)',
    average: 'O(n²)',
    worst: 'O(n²)',
    space: 'O(1)',
    stable: true,
    description:
      'Builds a sorted left section one bar at a time by sliding each new element left past larger neighbors until it fits. Nearly instant on almost-sorted data because the inner loop stops as soon as a smaller neighbor is reached.',
  },
  merge: {
    name: 'Merge Sort',
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n log n)',
    space: 'O(n)',
    stable: true,
    description:
      'Recursively splits the array in half down to single elements, then merges sorted halves back together in order. Guarantees O(n log n) speed on every input at the cost of extra memory for temporary subarrays.',
  },
  quick: {
    name: 'Quick Sort',
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n²)',
    space: 'O(log n)',
    stable: false,
    description:
      'Picks a pivot element, partitions smaller values to its left and larger values to its right, then recurses on both sides. Very fast in practice, though a last-element pivot degrades to O(n²) on already-sorted input.',
  },
  linear: {
    name: 'Linear Search',
    best: 'O(1)',
    average: 'O(n)',
    worst: 'O(n)',
    space: 'O(1)',
    description:
      'Checks each element sequentially from left to right until it matches the target or reaches the end of the array. Stops immediately at the first matching index when duplicates are present.',
  },
  binary: {
    name: 'Binary Search',
    best: 'O(1)',
    average: 'O(log n)',
    worst: 'O(log n)',
    space: 'O(1)',
    description:
      'Repeatedly inspects the middle element of a sorted array and discards the half where the target cannot lie. Cuts the remaining search space in half on every comparison, requiring at most ⌊log₂(n)⌋ + 1 checks.',
  },
  stack: {
    name: 'Stack (LIFO)',
    space: 'O(n)',
    operations: [
      { name: 'Push', complexity: 'O(1)' },
      { name: 'Pop', complexity: 'O(1)' },
      { name: 'Peek', complexity: 'O(1)' },
    ],
    description:
      'A Last-In, First-Out (LIFO) collection where elements are added and removed from the same end (the top). Backed by a dynamic array, pushing, popping, and peeking at the top all run in O(1) time.',
  },
  queue: {
    name: 'Queue (FIFO)',
    space: 'O(n)',
    operations: [
      { name: 'Enqueue', complexity: 'O(1)' },
      { name: 'Dequeue', complexity: 'O(1)*' },
      { name: 'Front', complexity: 'O(1)' },
    ],
    description:
      'A First-In, First-Out (FIFO) collection where new elements enter at the rear and leave from the front. *Note: JS Array.shift() / slice(1) is O(n) because remaining items shift; a circular buffer or head pointer achieves true O(1) dequeue.',
  },
  linkedList: {
    name: 'Singly Linked List',
    space: 'O(n)',
    operations: [
      { name: 'Insert Head', complexity: 'O(1)' },
      { name: 'Insert Tail', complexity: 'O(n)' },
      { name: 'Insert / Delete (i)', complexity: 'O(n)' },
      { name: 'Search / Traverse', complexity: 'O(n)' },
    ],
    description:
      'Nodes store a value and a next reference instead of contiguous memory. Prepending at HEAD is O(1), while inserting at tail (without a tail pointer), searching, traversing, or deleting requires O(n) pointer traversal.',
  },
};