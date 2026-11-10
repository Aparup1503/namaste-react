import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react';
import RestaurantMenu from '../RestaurantMenu';
import Header from '../Header';
import Cart from '../Cart';
import MOCK_DATA_NAME from './mocks/mockResMenu.json';
import { Provider } from 'react-redux';
import appStore from '../../utils/appStore';
import { clearCart } from '../../utils/cartSlice';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve(MOCK_DATA_NAME),
  })
);

it('should Load Restaurant Menu Component', async () => {
  appStore.dispatch(clearCart());

  await act(async () =>
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
          <RestaurantMenu />
          <Cart />
        </Provider>
      </BrowserRouter>
    )
  );

  const accordionHeader = await screen.findByText('Biriyani (5)');
  fireEvent.click(accordionHeader);

  const getRenderedFoodItemCount = () =>
    screen
      .getAllByTestId('foodItems')
      .reduce((count, list) => count + list.children.length, 0);

  expect(getRenderedFoodItemCount()).toBe(5);
  expect(screen.getByRole('link', { name: 'Cart (0 items)' })).toBeInTheDocument();

  const addBtns = screen.getAllByRole('button', { name: '+Add' });
  fireEvent.click(addBtns[0]);

  expect(screen.getByRole('link', { name: 'Cart (1 items)' })).toBeInTheDocument();

  fireEvent.click(addBtns[1]);

  expect(screen.getByRole('link', { name: 'Cart (2 items)' })).toBeInTheDocument();

  expect(getRenderedFoodItemCount()).toBe(7);

  fireEvent.click(screen.getByRole('button', { name: 'Clear Cart' }));

  expect(getRenderedFoodItemCount()).toBe(5);

  expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
});
