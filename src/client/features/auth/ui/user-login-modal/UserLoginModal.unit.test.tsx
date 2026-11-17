import { QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { createTestQueryClient } from '../../../../../tests/unit/helpers';
import { UserLoginModal } from './UserLoginModal';

const renderModal = () => {
  render(
    <QueryClientProvider client={createTestQueryClient()}>
      <MemoryRouter>
        <UserLoginModal />
      </MemoryRouter>
    </QueryClientProvider>,
  );
};

describe('UserLoginModal', () => {
  test('should switch auth tabs and return from password restore', () => {
    renderModal();

    expect(screen.getByRole('heading', { name: 'Auth method' })).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Register' }));
    expect(screen.getByRole('heading', { name: 'Add your details' })).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Info' }));
    expect(screen.getByText('INFO')).toBeTruthy();
    expect(screen.queryByRole('heading', { name: 'Add your details' })).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.getByRole('heading', { name: 'Auth method' })).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Forgot Password?' }));
    expect(screen.getByRole('heading', { name: 'Restore password' })).toBeTruthy();
    expect(screen.queryByRole('heading', { name: 'Auth method' })).toBeNull();
    expect(screen.queryByRole('button', { name: 'Register' })).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Back to Login' }));
    expect(screen.getByRole('heading', { name: 'Auth method' })).toBeTruthy();
  });
});
