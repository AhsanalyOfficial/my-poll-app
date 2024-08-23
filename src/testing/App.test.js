import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders carousel', () => {
    render(<App />);
    expect(screen.getByText(/How was your week overall?/)).toBeInTheDocument();
  });

  test('handles successful submission', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: 1 }),
      })
    );
    
    render(<App />);
    fireEvent.click(screen.getByText('Good'));
    fireEvent.click(screen.getByText('Submit'));
    
    expect(await screen.findByText(/Submitted data:/)).toBeInTheDocument();
  });

  test('handles error during submission', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Failed to fetch'))
    );
    
    render(<App />);
    fireEvent.click(screen.getByText('Good'));
    fireEvent.click(screen.getByText('Submit'));
    
    expect(await screen.findByText(/Error submitting data:/)).toBeInTheDocument();
  });
});
