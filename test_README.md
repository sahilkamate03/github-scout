// Import the necessary modules and functions
const { test } = require('jest');
const { expect } = require('chai');

// Import the code to be tested
const stylingGuide = require('/home/blasteroid03/code/fyle/fyle-internship-challenge-23/README.md');

// Write your tests
test('Styling guide should use Tailwind CSS', () => {
  // Access the styling guide content
  const content = stylingGuide.content;

  // Check if the content includes the Tailwind CSS link
  expect(content).to.include('[Tailwind](https://tailwindcss.com/docs/installation)');
});