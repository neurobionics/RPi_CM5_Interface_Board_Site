import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the current board version from generated datasheet data', () => {
  render(<App />);
  expect(screen.getByText('v1.1.1')).toBeInTheDocument();
});
