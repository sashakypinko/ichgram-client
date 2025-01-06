import { screen } from '@testing-library/react';
import { renderWithProviders } from '@app/utils/test-utils';
import SignInCard from './index';

test('sign in card', () => {
  renderWithProviders(<SignInCard />);

  const logo = screen.getByRole('img', { name: /logo/i });
  const passwordRecoveryLink = screen.getByRole('link', { name: /forgot password/i });

  expect(logo).toBeInTheDocument();
  expect(passwordRecoveryLink).toBeInTheDocument();
});
