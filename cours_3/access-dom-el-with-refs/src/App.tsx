import './App.css'
import { useRef } from 'react';


function App() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  function pickImage(){
  fileInputRef.current?.click();
}
  return (
    <div id="app">
      <p>Please select an image</p>
      <p>
        <input data-testid="file-picker" type="file" ref={fileInputRef} accept="image/*" />
        <button onClick={pickImage}>Pick Image</button>
      </p>
    </div>
  );
}

export default App;