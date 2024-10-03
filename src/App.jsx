import { useState , useCallback , useEffect , useRef } from 'react'

function App() {
  const [password, setPassword] = useState()
  const [length , setLength] = useState(8)
  const [numberAllowed , setNumberAllowed] = useState('false')
  const [charAllowed , setCharAllowed] = useState('false')
  const passwordref = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if(numberAllowed){
      str += "1234567890"
    }
    if(charAllowed){
      str += "!@#$%^&*(){}[]_+-=`~"
    }

    for(let i = 1; i<=length; i++){
      let char = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length , numberAllowed , charAllowed , setPassword])

  const copyToClipboard = useCallback(()=>{
    passwordref.current?.select()
    window.navigator.clipboard.writeText(password)
  } , [password])

  useEffect(()=>{
    passwordGenerator()
  },[passwordGenerator , length , charAllowed , numberAllowed])

  return (
    <>
      <div className='w-screen max-w-md mx-auto shadow-md rounded-lg p-4 my-8 text-orange-500 bg-gray-800'>
        <h1 className='flex items-center justify-center pb-2'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
          type="text"
          value={password} 
          placeholder='password'
          className='w-full outline-none py-1 px-3'
          readOnly
          ref={passwordref}
          />
          <button
          onClick={copyToClipboard} 
          className='bg-blue-700 px-4 text-blue-300 hover:bg-blue-900 translate transition ease-in-out outline-none'>Copy</button>
        </div>
        <div className='flex items-center gap-4'>
          <div className='flex gap-2'>
            <input type="range" 
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}
            />
            <label> length: {length}</label>
          </div>
          <div className='flex gap-2'>
            <input type="checkbox" 
            defaultChecked={numberAllowed}
            onChange={()=>{setNumberAllowed((prev)=>!prev)}}
            />
            <label>Number</label>
          </div>
          <div className='flex gap-2'>
            <input type="checkbox" 
            defaultChecked={charAllowed}
            onChange={()=>{setCharAllowed((prev)=>!prev)}}
            />
            <label>Char</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
