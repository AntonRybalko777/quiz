import { createGlobalStyle } from 'styled-components';
import 'modern-normalize';
export const GlobalStyle = createGlobalStyle`
body {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding:10px;

  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;
