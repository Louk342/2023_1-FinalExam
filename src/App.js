import React from 'react';
import Header from './components/header';
import Menu from './components/menu';
import Body from './components/body';
import './style.css'
function App() {
  return (
    <div className="App">
      <Header/>
      <div className='main'>
        <Menu/><Body/>
      </div>
    </div>
  );
}

export default App;
