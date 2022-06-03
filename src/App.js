import React from 'react';
import { ChakraProvider, theme } from "@chakra-ui/react";
import AppRouter from './AppRouter';
function App() {
  return (
    <ChakraProvider resetCSS={false} theme={theme}>
      <AppRouter />
    </ChakraProvider>
  );
}

export default App;
