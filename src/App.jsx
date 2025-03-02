import { useCallback, useEffect, useRef, useState } from 'react'

import './index.css'

function App() {
  const[length,setlength] = useState(8);
  const[numberAllowed,setnumberAllowed] = useState(false);
  const[charAllowed,setcharAllowed] = useState(false);
  const[Password,setPassword] = useState("");
  const passwordref = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str+= "!@#$%^&*(){}[]~`"
    for(let i =1; i<=length ; i++){
      let char = Math.floor (Math.random() * str.length + 1) 
      pass += str.charAt(char) 
      setPassword(pass)
    }
  } ,[numberAllowed,charAllowed,length,setPassword])
const copypasswordtoclipboard = useCallback(()=>{
  passwordref.current?.select();
  window.navigator.clipboard.writeText(Password)
},[Password])
  
  useEffect(() => {passwordGenerator()},[length,numberAllowed,charAllowed,passwordGenerator])
  return (
    <>
  <div className='w-full max-w-md  mx-auto shadow-md rounded-lg px-4 my-8 py-4 bg-gray-700'>
  <h1 className='text-white text-3xl text-center my-3'>Password Generator</h1>
  <div className='flex shadow rounded-lg  overflow-hidden mb-4'><input type="text" ref={passwordref} value={Password} placeholder='Password' className='outline-none w-full py-2 px-3 readOnly bg-white' /><button onClick={copypasswordtoclipboard} className='bg-blue-700 outline-none text-white px-3 py-0.5 shrink-0 '>Copy</button></div>
 
 <div className='flex gap-x-2 text-sm'>
  <div className='flex items-center gap-x-1'>
    <input type="range" min={8} max={20} className='cursor-pointer' onChange={(e) => {setlength(e.target.value)}} /><label htmlFor="">Length: {length}</label>
  </div>
  <div className='flex items-center gap-x-1'><input type="checkbox" id="numberinput" defaultChecked={numberAllowed} onChange={() => setnumberAllowed((prev) => !prev)} /> <label htmlFor="numberinput">Numbers</label> </div>
  <div className='flex items-center gap-x-1'><input type="checkbox" id="charinput" defaultChecked={charAllowed} onChange={() => setcharAllowed((prev) => !prev)} /> <label htmlFor="charinput">Chracters</label> </div>
  
  </div> 
  </div>
   </>
  )
}

export default App
