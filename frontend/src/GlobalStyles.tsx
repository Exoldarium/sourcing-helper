import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --primary-100: hsl(240, 100%, 83%);
    --primary-200: hsl(240, 66%, 64%);
    --primary-300: hsl(240, 71%, 57%);
    --primary-400: hsl(240, 54%, 38%);
    --primary-500: hsl(240, 59%, 33%);
    --primary-600: hsl(240, 59%, 26%);
    --primary-700: hsl(240, 59%, 21%);
    --primary-800: hsl(240, 59%, 14%);
    --primary-900: hsl(240, 59%, 9%);

    --neutral-100: hsl(263, 0%, 95%);
    --neutral-200: hsl(263, 0%, 90%);
    --neutral-300: hsl(263, 0%, 79%);
    --neutral-400: hsl(263, 0%, 68%);
    --neutral-500: hsl(263, 0%, 52%);
    --neutral-600: hsl(263, 0%, 34%);
    --neutral-700: hsl(263, 0%, 23%);
    --neutral-800: hsl(263, 0%, 11%);
    --neutral-900: hsl(263, 0%, 3%);

    --accent-red-100: hsl(360, 65%, 83%);
    --accent-red-200: hsl(360, 78%, 73%);
    --accent-red-300: hsl(360, 84%, 62%);
    --accent-red-400: hsl(360, 100%, 43%);
    --accent-red-500: hsl(360, 100%, 35%);
    --accent-red-600: hsl(360, 100%, 25%);
    --accent-red-700: hsl(360, 100%, 19%);
    --accent-red-900: hsl(360, 100%, 13%);
    --accent-red-800: hsl(360, 100%, 7%);

    --accent-green-100: hsl(156, 100%, 88%)
    --accent-green-200: hsl(156, 100%, 78%);
    --accent-green-300: hsl(156, 72%, 60%)
    --accent-green-400: hsl(156, 48%, 47%)
    --accent-green-500: hsl(156, 48%, 36%);
    --accent-green-600: hsl(156, 48%, 22%)
    --accent-green-700: hsl(156, 48%, 14%)
    --accent-green-800: hsl(156, 69%, 9%);
    --accent-green-900: hsl(156, 69%, 6%);

    --accent-yellow-100: hsl(43, 100%, 86%)
    --accent-yellow-200: hsl(43, 100%, 80%)
    --accent-yellow-300: hsl(43, 80%, 70%)
    --accent-yellow-400: hsl(43, 86%, 57%)
    --accent-yellow-500: hsl(43, 100%, 42%);
    --accent-yellow-600: hsl(43, 100%, 32%)
    --accent-yellow-700: hsl(43, 100%, 20%)
    --accent-yellow-800: hsl(43, 100%, 13%);
    --accent-yellow-900: hsl(43, 100%, 7%);

    --space-sm: 1rem;
    --space-md: 2rem;
    --space-lg: 3rem;
    --space-xl: 4rem;

    --font-sm: 0.667rem;
    --font-md: 1rem;
    --font-lg: 1.5rem;
    --font-xl: 2.25rem;
  }
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 0;
    margin: 0;
    line-height: 2;
    background: var(--neutral-100);
  }
  a {
    text-decoration: none;
    color: var(--black);
  }
  a:hover {
    text-decoration: underline;
  }
  button {
    cursor: pointer;
  }
`;