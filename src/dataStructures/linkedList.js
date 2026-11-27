export const LINKED_LIST_CAPACITY = 8;

// Node factory: real { value, next } objects
export function createNode(value, next = null) {
  return { value, next };
}

// Convert linked nodes into a flat array of values for UI rendering
export function toArray(head) {
  const result = [];
  let curr = head;
  while (curr !== null) {
    result.push(curr.value);
    curr = curr.next;
  }
  return result;
}

// Build a linked list from an array of values
export function fromArray(values = []) {
  let head = null;
  for (let i = values.length - 1; i >= 0; i--) {
    head = createNode(values[i], head);
  }
  return head;
}

// Deep-clone node chain so replay steps remain immutable
function cloneList(head) {
  if (!head) return null;
  return createNode(head.value, cloneList(head.next));
}

function makeStep(head, { current = null, target = null, message = '', error = false, done = false } = {}) {
  const cloned = cloneList(head);
  return {
    head: cloned,
    items: toArray(cloned),
    current,
    target,
    message,
    error,
    done,
  };
}

function getLength(head) {
  let count = 0;
  let curr = head;
  while (curr !== null) {
    count++;
    curr = curr.next;
  }
  return count;
}

// 1. Insert at Head — O(1)
export function getInsertHeadSteps(head, value) {
  const len = getLength(head);
  if (len >= LINKED_LIST_CAPACITY) {
    return [
      makeStep(head, {
        message: `Capacity (${LINKED_LIST_CAPACITY}) reached: cannot insert ${value}.`,
        error: true,
        done: true,
      }),
    ];
  }

  const steps = [
    makeStep(head, {
      current: head ? 0 : null,
      message: `Create node(${value}) and point next → ${head ? `HEAD (${head.value})` : 'NULL'}.`,
    }),
  ];

  const nextHead = createNode(value, cloneList(head));
  steps.push(
    makeStep(nextHead, {
      target: 0,
      message: `Inserted ${value} at HEAD in O(1) time.`,
      done: true,
    })
  );

  return steps;
}

// 2. Insert at Tail — O(n) without a tail pointer
export function getInsertTailSteps(head, value) {
  const len = getLength(head);
  if (len >= LINKED_LIST_CAPACITY) {
    return [
      makeStep(head, {
        message: `Capacity (${LINKED_LIST_CAPACITY}) reached: cannot insert ${value}.`,
        error: true,
        done: true,
      }),
    ];
  }

  if (!head) {
    return [
      makeStep(head, { message: `List is empty. Creating HEAD node(${value}).` }),
      makeStep(createNode(value, null), {
        target: 0,
        message: `Inserted ${value} as HEAD/tail.`,
        done: true,
      }),
    ];
  }

  const workHead = cloneList(head);
  const steps = [];
  let curr = workHead;
  let idx = 0;

  while (curr.next !== null) {
    steps.push(
      makeStep(workHead, {
        current: idx,
        message: `Visiting index ${idx} (${curr.value}): next is not NULL, advancing pointer...`,
      })
    );
    curr = curr.next;
    idx++;
  }

  steps.push(
    makeStep(workHead, {
      current: idx,
      message: `Reached tail at index ${idx} (${curr.value}). Linking next → node(${value}).`,
    })
  );

  curr.next = createNode(value, null);
  steps.push(
    makeStep(workHead, {
      target: idx + 1,
      message: `Inserted ${value} at tail (index ${idx + 1}).`,
      done: true,
    })
  );

  return steps;
}

// 3. Insert at Index i — O(n)
export function getInsertAtSteps(head, index, value) {
  const len = getLength(head);
  if (len >= LINKED_LIST_CAPACITY) {
    return [
      makeStep(head, {
        message: `Capacity (${LINKED_LIST_CAPACITY}) reached: cannot insert ${value}.`,
        error: true,
        done: true,
      }),
    ];
  }

  if (!Number.isInteger(index) || index < 0 || index > len) {
    return [
      makeStep(head, {
        message: `Index ${index} out of range (valid: 0 to ${len}).`,
        error: true,
        done: true,
      }),
    ];
  }

  if (index === 0) {
    return getInsertHeadSteps(head, value);
  }

  const workHead = cloneList(head);
  const steps = [];
  let curr = workHead;
  let idx = 0;

  while (idx < index - 1) {
    steps.push(
      makeStep(workHead, {
        current: idx,
        message: `Walking to index ${index - 1}: currently at index ${idx} (${curr.value}).`,
      })
    );
    curr = curr.next;
    idx++;
  }

  steps.push(
    makeStep(workHead, {
      current: idx,
      message: `Stopped at predecessor index ${idx} (${curr.value}). Wiring node(${value}) → ${
        curr.next ? curr.next.value : 'NULL'
      }.`,
    })
  );

  curr.next = createNode(value, curr.next);
  steps.push(
    makeStep(workHead, {
      target: index,
      message: `Inserted ${value} at index ${index}.`,
      done: true,
    })
  );

  return steps;
}

// 4. Delete by Value — O(n)
export function getDeleteValueSteps(head, value) {
  if (!head) {
    return [
      makeStep(head, {
        message: `List is empty: cannot delete ${value}.`,
        error: true,
        done: true,
      }),
    ];
  }

  const workHead = cloneList(head);
  const steps = [];

  if (workHead.value === value) {
    steps.push(
      makeStep(workHead, {
        current: 0,
        message: `HEAD (index 0) matches ${value}. Advancing HEAD to next node.`,
      })
    );
    const nextHead = workHead.next;
    steps.push(
      makeStep(nextHead, {
        target: nextHead ? 0 : null,
        message: `Deleted ${value} from HEAD.`,
        done: true,
      })
    );
    return steps;
  }

  let prev = workHead;
  let curr = workHead.next;
  let idx = 1;

  steps.push(
    makeStep(workHead, {
      current: 0,
      message: `Checking index 0 (${prev.value}) ≠ ${value}. Advancing...`,
    })
  );

  while (curr !== null) {
    if (curr.value === value) {
      steps.push(
        makeStep(workHead, {
          current: idx,
          message: `Found ${value} at index ${idx}. Bypassing node: (${prev.value}).next → ${
            curr.next ? curr.next.value : 'NULL'
          }.`,
        })
      );
      prev.next = curr.next;
      steps.push(
        makeStep(workHead, {
          target: prev.next ? idx : idx - 1,
          message: `Deleted ${value} (was at index ${idx}).`,
          done: true,
        })
      );
      return steps;
    }

    steps.push(
      makeStep(workHead, {
        current: idx,
        message: `Checking index ${idx} (${curr.value}) ≠ ${value}. Advancing...`,
      })
    );
    prev = curr;
    curr = curr.next;
    idx++;
  }

  steps.push(
    makeStep(workHead, {
      message: `Value ${value} not found in list.`,
      error: true,
      done: true,
    })
  );
  return steps;
}

// 5. Delete at Index i — O(n)
export function getDeleteAtSteps(head, index) {
  if (!head) {
    return [
      makeStep(head, {
        message: 'List is empty: nothing to delete.',
        error: true,
        done: true,
      }),
    ];
  }

  const len = getLength(head);
  if (!Number.isInteger(index) || index < 0 || index >= len) {
    return [
      makeStep(head, {
        message: `Index ${index} out of range (valid: 0 to ${len - 1}).`,
        error: true,
        done: true,
      }),
    ];
  }

  const workHead = cloneList(head);
  const steps = [];

  if (index === 0) {
    const removed = workHead.value;
    steps.push(
      makeStep(workHead, {
        current: 0,
        message: `Deleting HEAD at index 0 (${removed}). Moving HEAD to next.`,
      })
    );
    const nextHead = workHead.next;
    steps.push(
      makeStep(nextHead, {
        target: nextHead ? 0 : null,
        message: `Deleted node(${removed}) at index 0.`,
        done: true,
      })
    );
    return steps;
  }

  let curr = workHead;
  let idx = 0;

  while (idx < index - 1) {
    steps.push(
      makeStep(workHead, {
        current: idx,
        message: `Walking to predecessor index ${index - 1}: at index ${idx} (${curr.value}).`,
      })
    );
    curr = curr.next;
    idx++;
  }

  const removed = curr.next.value;
  steps.push(
    makeStep(workHead, {
      current: idx + 1,
      message: `At target index ${index} (${removed}). Linking (${curr.value}).next → ${
        curr.next.next ? curr.next.next.value : 'NULL'
      }.`,
    })
  );

  curr.next = curr.next.next;
  steps.push(
    makeStep(workHead, {
      target: curr.next ? index : index - 1,
      message: `Deleted node(${removed}) at index ${index}.`,
      done: true,
    })
  );

  return steps;
}

// 6. Search by Value — O(n)
export function getSearchSteps(head, value) {
  if (!head) {
    return [
      makeStep(head, {
        message: `List is empty: ${value} not found.`,
        error: true,
        done: true,
      }),
    ];
  }

  const steps = [];
  let curr = head;
  let idx = 0;

  while (curr !== null) {
    if (curr.value === value) {
      steps.push(
        makeStep(head, {
          current: idx,
          target: idx,
          message: `Found ${value} at index ${idx}!`,
          done: true,
        })
      );
      return steps;
    }

    steps.push(
      makeStep(head, {
        current: idx,
        message: `Index ${idx} holds ${curr.value} ≠ ${value}. Following next pointer...`,
      })
    );
    curr = curr.next;
    idx++;
  }

  steps.push(
    makeStep(head, {
      message: `Reached NULL: ${value} is not in the list.`,
      error: true,
      done: true,
    })
  );
  return steps;
}