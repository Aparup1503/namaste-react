import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

/**
 * Creates and configures the centralized Redux store.
 *
 * The Redux store acts as the single source of truth for application-wide
 * state, allowing different components to access and update shared data.
 */
const appStore = configureStore({
  /**
   * Registers feature-level reducers with the Redux store.
   *
   * Each key defines a state namespace, while its corresponding reducer
   * manages the state updates within that namespace.
   */
  reducer: {
    // Manages shopping cart state, accessible through state.cart.
    cart: cartReducer,
  },
});

/**
 * Exports the configured Redux store.
 *
 * The store is provided to the React component tree through React-Redux's
 * Provider, making the centralized state available to connected components.
 */
export default appStore;
