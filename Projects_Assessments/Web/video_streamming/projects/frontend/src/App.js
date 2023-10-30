import React from 'react';

function App() {
  return (
    <div className="App">
      <video controls width="640" height="360">
        <source src="http://localhost:4000/video" type="video/mp4" />
      </video>
    </div>
  );
}

export default App;
