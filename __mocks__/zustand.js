import { vi } from "vitest";
import { act } from "@testing-library/react";

export * from "zustand";

const { create: actualCreate, createStore: actualCreateStore } = await vi.importActual("zustand");

// a variable to hold reset functions for all stores declared in the app
export const storeResetFns = new Set();

const createUncurried = (stateCreator) => {
  const store = actualCreate(stateCreator);
  const initialState = store.getInitialState();
  storeResetFns.add(() => {
    store.setState(initialState, true);
  });
  return store;
};

// when creating a store, we get its initial state, create a reset function and add it in the set
export const create = (stateCreator) => {
  console.log("zustand create mock");

  // to support curried version of create
  return typeof stateCreator === "function" ? createUncurried(stateCreator) : createUncurried;
};

const createStoreUncurried = (stateCreator) => {
  const store = actualCreateStore(stateCreator);
  const initialState = store.getInitialState();
  storeResetFns.add(() => {
    store.setState(initialState, true);
  });
  return store;
};

// when creating a store, we get its initial state, create a reset function and add it in the set
export const createStore = (stateCreator) => {
  console.log("zustand createStore mock");

  // to support curried version of createStore
  return typeof stateCreator === "function"
    ? createStoreUncurried(stateCreator)
    : createStoreUncurried;
};

// reset all stores after each test run
afterEach(() => {
  act(() => {
    storeResetFns.forEach((resetFn) => {
      resetFn();
    });
  });
});
