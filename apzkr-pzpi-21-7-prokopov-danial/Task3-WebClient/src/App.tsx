import React from 'react';
import { AppRouter } from './components/AppRouter/AppRouter';
import './styles/App.css';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
