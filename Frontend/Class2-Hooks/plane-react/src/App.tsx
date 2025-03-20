
import { useState } from 'react'
import './App.css'
import HeroImage from './components/Hero'
import HookStateComponent from './components/HookStateComponent'

function App() {

  const [first, setFirst] = useState(false)
console.log(first)
  const handleClick = ()=>{
    
    setFirst((prevValue)=>{
      console.log('prevValue',prevValue)
      return !prevValue
    })
    

  }
  return (
    <div>
      <HeroImage/>
    <div>Hi</div>
    {/* <button onClick={()=>setFirst("second")}></button> */}
    <button className='' onClick={handleClick}>BTN</button>
    <div>Hello {first}</div>
    <HookStateComponent/>
    </div>
  )
}

export default App
