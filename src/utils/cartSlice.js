import { createSlice, current } from '@reduxjs/toolkit';

/**
 * Creates the cart slice, which encapsulates the cart's initial state,
 * state update logic (reducers), and automatically generated actions.
 *
 * Redux Toolkit uses Immer internally, allowing us to write state updates
 * using mutable syntax while maintaining Redux's immutable state principles.
 */
const cartSlice = createSlice({
  // Unique identifier for this slice, used as a prefix when generating action types.
  name: 'cart',

  // Defines the initial state managed by the cart slice.
  initialState: {
    items: [],
  },

  // Defines the state transition logic for cart-related actions.
  reducers: {
    /**
     * Adds a new product to the cart.
     *
     * action.payload contains the product data passed when dispatching addItem().
     * -Immer tracks this apparent mutation and produces a new immutable state.
     */
    addItem: (state, action) => {
      state.items.push(action.payload);
    },

    /**
     * Removes the last product from the cart.
     *
     * Uses Array.pop(), which removes the last element from the items array.
     * No state change occurs if the cart is already empty.
     */
    removeItem: (state) => {
      state.items.pop();
    },

    /**
     * Removes all products from the cart.
     *
     * Setting the array length to zero clears the existing array.
     * Immer safely translates this mutation into an immutable state update.
     */
    //originalState = {items: ["pizza"]}
    clearCart: (state) => {
      console.log(current(state));
      state.items.length = 0;
      // Alternatively, we could return a new state object:
      state.items = [];
      //return { items: [] }; // this new object will be replaced inside originalState = { items: [] }
    },
  },
});

/**
 * Exports the automatically generated action creators.
 *
 * These actions can be dispatched from React components using useDispatch().
 */
export const { addItem, removeItem, clearCart } = cartSlice.actions;

/**
 * Exports the slice reducer.
 *
 * Register this reducer in configureStore() to make cart state
 * available throughout the application.
 */
export default cartSlice.reducer;
