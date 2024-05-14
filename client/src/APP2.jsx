import React, { useCallback, useState } from 'react'

const APP2 = () => {
    const [state,setState] = useState(0);
    const handler  = useCallback(()=>{
      setState((prev)=>prev+1);
    },[])
  return (
    <div>
      <button onClick={handler} >{state}</button>
    </div>
  )
}

export default APP2
