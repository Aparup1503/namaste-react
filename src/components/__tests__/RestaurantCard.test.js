import { render, screen } from '@testing-library/react';
import RestaurantCard, { withPromtedLabel } from '../RestaurantCard';
import MOCK_DATA from './mocks/resCardMock.json';
import '@testing-library/jest-dom';

it('should render RestaurantCard component with props Data', () => {
  render(<RestaurantCard resData={{ info: MOCK_DATA }} />);

  const name = screen.getByText("Leon's - Burgers & Wings (Leon Grill)");

  expect(name).toBeInTheDocument();
});

it('should render RestaurantCard component with Promoted Label', () => {
  const RestaurantCardPromoted = withPromtedLabel(RestaurantCard);

  render(<RestaurantCardPromoted resData={{ info: MOCK_DATA }} />);

  expect(screen.getByText('✅VEG')).toBeInTheDocument();
});
