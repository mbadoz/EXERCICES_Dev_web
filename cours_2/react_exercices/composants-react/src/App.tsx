import { useState, type FC } from 'react'
import './App.css'
import Header from './component/header'
import Main from './component/main'




const App: FC = () => {
  const [selectedTab, setSelectedTab] = useState("empty");

  function handleSelect(selectedButton: string) {
    setSelectedTab(selectedButton);
  }

  return (
    <div>
      <Header />
      <Main onSelect={handleSelect} selectedTab={selectedTab} />
      {selectedTab}
    </div>  
  )
}

export default App
