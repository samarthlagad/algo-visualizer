export const STACK_CAPACITY = 8;

export function createInitialStack(initialItems = [12, 27, 45]) {
  return {
    items: [...initialItems],
    highlight: null,
    action: null,
    removedValue: null,
    message: `Stack ready (capacity ${STACK_CAPACITY})`,
    error: false,
  };
}

export function push(state, value) {
  if (state.items.length >= STACK_CAPACITY) {
    return {
      ...state,
      highlight: state.items.length - 1,
      action: null,
      removedValue: null,
      message: `Stack Overflow: capacity (${STACK_CAPACITY}) reached.`,
      error: true,
    };
  }

  const nextItems = [...state.items, value];
  return {
    items: nextItems,
    highlight: nextItems.length - 1,
    action: 'add',
    removedValue: null,
    message: `Pushed ${value} onto top of stack.`,
    error: false,
  };
}

export function pop(state) {
  if (state.items.length === 0) {
    return {
      ...state,
      highlight: null,
      action: null,
      removedValue: null,
      message: 'Stack Underflow: cannot pop from an empty stack.',
      error: true,
    };
  }

  const popped = state.items[state.items.length - 1];
  const nextItems = state.items.slice(0, -1);

  return {
    items: nextItems,
    highlight: nextItems.length > 0 ? nextItems.length - 1 : null,
    action: 'remove',
    removedValue: popped,
    message: `Popped ${popped} from top of stack.`,
    error: false,
  };
}

export function peek(state) {
  if (state.items.length === 0) {
    return {
      ...state,
      highlight: null,
      action: null,
      removedValue: null,
      message: 'Stack is empty: nothing to peek.',
      error: true,
    };
  }

  const topIndex = state.items.length - 1;
  return {
    ...state,
    highlight: topIndex,
    action: 'peek',
    removedValue: null,
    message: `Peeked at top: ${state.items[topIndex]}.`,
    error: false,
  };
}