import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import { ChatProvider } from './context/ChatContext';

function App() {
  return (
    <ChatProvider>
      <div className="App">
        <Dashboard />
      </div>
    </ChatProvider>
  );
}

export default App;
