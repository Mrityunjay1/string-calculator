# String Calculator - Next.js with TDD

This project is a Next.js implementation of the String Calculator kata, developed using Test-Driven Development (TDD) principles. It provides a simple web interface for adding numbers provided as a string input.

## Features

- Add numbers provided as a string
- Support for custom delimiters
- Handling of negative numbers
- Responsive web interface

## Technologies Used

- Next.js
- React
- TypeScript
- Jest for testing
- Tailwind CSS for styling

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/your-username/string-calculator-nextjs.git
   cd string-calculator-nextjs
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Running the Application

To start the development server:

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Testing

This project uses Jest for unit testing. To run the tests:

```
npm test
```

To run tests in watch mode:

```
npm run test:watch
```

## TDD Approach

This project was developed using Test-Driven Development. The process followed these steps:

1. Write a failing test for a new feature.
2. Write the minimum amount of code to make the test pass.
3. Refactor the code while ensuring all tests still pass.
4. Repeat for each new feature or requirement.

## Project Structure

- `/components`: React components including the StringCalculator
- `/utils`: Utility functions, including the core `add` function

## Usage Examples

The String Calculator accepts inputs in the following formats:

- `"1,2,3"` (returns 6)
- `"1\\n2,3"` (returns 6)
- `"//;\\n1;2;3"` (returns 6, using ';' as a custom delimiter)
- `"//[*][%]\\n1*2%3"` (returns 6, using '\*' and '%' as custom delimiters)

Negative numbers will throw an exception.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
