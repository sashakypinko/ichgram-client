import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '@app/utils/test-utils';
import SignInForm from './index';

test('sign in form', () => {
  renderWithProviders(<SignInForm />);

  const usernameField = screen.getByPlaceholderText(/username or email/i);
  const passwordField = screen.getByPlaceholderText(/password/i);
  const loginButton = screen.getByRole('button', { name: /log in/i });

  expect(usernameField).toHaveValue('');
  expect(passwordField).toHaveValue('');

  fireEvent.change(usernameField, { target: { value: '' } });

  expect(loginButton).toBeDisabled();

  const testUsername = 'test_user';
  const testPassword = 'password123';

  fireEvent.change(usernameField, { target: { value: testUsername } });
  fireEvent.change(passwordField, { target: { value: testPassword } });

  expect(usernameField).toHaveValue(testUsername);
  expect(passwordField).toHaveValue(testPassword);

  expect(loginButton).toBeEnabled();
});
