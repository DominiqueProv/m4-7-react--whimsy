import React from 'react';
import { useSpring, animated } from 'react-spring'


const Parent = () => {

  const fade = useSpring({
    from: {
      opacity: 0
    }, 
    to{
      opacity: 1}
    {
      tension: 210,
      friction: 20,
      clamp: true
    }
   
  });

  //Shorte version
  //const fade = useSPring({ from: {opacity: 0}, opacity: 1});
  return (
    <animated.div style={fade}> 
    <header>
      
    </header>

    </animated.div>

  );
}