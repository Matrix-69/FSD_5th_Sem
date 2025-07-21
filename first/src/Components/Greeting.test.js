jest.config.js
{
  "testEnvironment": "node",
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$",
  "moduleFileExtensions": ["js", "jsx", "json", "node"]
}

src/Components/Greeting.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Greeting from './Greeting';

test('renders greeting message', () => {
  render(<Greeting />);
  const linkElement = screen.getByText(/hello/i);
  expect(linkElement).toBeInTheDocument();
});