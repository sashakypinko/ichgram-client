import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthFormContainer from './index';
import { renderWithProviders } from '@app/utils/test-utils';

describe('AuthFormContainer', () => {
  test('renders logo image', () => {
    renderWithProviders(
      <AuthFormContainer>
        <div>Some child content</div>
      </AuthFormContainer>,
    );

    const logoImage = screen.getByAltText('logo');
    expect(logoImage).toBeInTheDocument();
  });

  test('renders children correctly', () => {
    renderWithProviders(
      <AuthFormContainer>
        <div>Some child content</div>
      </AuthFormContainer>,
    );

    expect(screen.getByText('Some child content')).toBeInTheDocument();
  });
});
