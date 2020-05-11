import React, { useState } from 'react'




const Toggle = () => {

  const [isToggle, setToggle] = useState(false);

  return (
    <div>
      <h1>Hello</h1>
      <button onClick={() => setToggle(!isToggle)}>Toggle</button>
    </div>
  );
}

export default Toggle




