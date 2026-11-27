export const QUEUE_CAPACITY = 8;

export function createInitialQueue(initialItems = [10, 24, 38]) {
  return {
    items: [...initialItems],
    highlight: null,
    action: null,
    removedValue: null,
    message: `Queue ready (capacity ${QUEUE_CAPACITY})`,
    error: false,
  };
}

export function enqueue(state, value) {
  if (state.items.length >= QUEUE_CAPACITY) {
    return {
      ...state,
      highlight: state.items.length - 1,
      action: null,
      removedValue: null,
      message: `Queue Overflow: capacity (${QUEUE_CAPACITY}) reached.`,
      error: true,
    };
  }

  const nextItems = [...state.items, value];
  return {
    items: nextItems,
    highlight: nextItems.length - 1,
    action: 'add',
    removedValue: null,
    message: `Enqueued ${value} at rear.`,
    error: false,
  };
}

export function dequeue(state) {
  if (state.items.length === 0) {
    return {
      ...state,
      highlight: null,
      action: null,
      removedValue: null,
      message: 'Queue Underflow: cannot dequeue from an empty queue.',
      error: true,
    };
  }

  const frontValue = state.items[0];
  const nextItems = state.items.slice(1);

  return {
    items: nextItems,
    highlight: nextItems.length > 0 ? 0 : null,
    action: 'remove',
    removedValue: frontValue,
    message: `Dequeued ${frontValue} from front.`,
    error: false,
  };
}

export function front(state) {
  if (state.items.length === 0) {
    return {
      ...state,
      highlight: null,
      action: null,
      removedValue: null,
      message: 'Queue is empty: no front element.',
      error: true,
    };
  }

  return {
    ...state,
    highlight: 0,
    action: 'peek',
    removedValue: null,
    message: `Front element is ${state.items[0]}.`,
    error: false,
  };
}