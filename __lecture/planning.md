# React unit 7

### Exercises

#### Hello button

```diff
  ...

  const Surface = styled(ButtonLayer)`
    ...

+   transition: transform 400ms cubic-bezier(0, 0.68, 0.67, 1.09);
+
+   &:hover {
+     transform: translate(-10px, -10px);
+   }
  `;
```

#### Lights on!

```diff
  ...

  const On = styled(Bulb)`
-   z-index: 1;
+   z-index: 2;
    background: linear-gradient(180deg, #ffea00, #ffb200);
    box-shadow: 0px 5px 25px hsla(42deg, 100%, 50%, 0.8);
    transition: opacity 450ms;
  `;

  ...

  const Gloss = styled.div`
    position: absolute;
-   z-index: 2;
+   z-index: 3;
    ...
  `;
```

#### Inflate!

```diff
+ import { useSpring, animated } from "react-spring";

  // Make the red square "inflate" more "naturally"
  const App = () => {
    const [inflatedAmount, setInflatedAmount] = React.useState(1);

    const inflateMore = () => {
      setInflatedAmount(inflatedAmount + 0.55);
    };
+
+  const inflateStyle = useSpring({
+    transform: `scale(${inflatedAmount})`,
+    config: {
+      tension: 120,
+      friction: 14
+    }
+  });

   return (
     <Wrapper>
       <Button onClick={inflateMore}>Inflate!</Button>
-      <Box
-        style={{
-          transform: `scale(${inflatedAmount})`
-        }}
-      >
+      <Box style={inflateStyle}>Inflated</Box>
     </Wrapper>
   );
 };

- const Box = styled.div`
+ const Box = styled(animated.div)`
  ...
  ...
`;
```

#### flip the card

```diff
+ import { useSpring, animated } from "react-spring";

  const Card = ({ isVisible, children }) => {
+   const spring = useSpring({
+     opacity: isVisible ? 1 : 0,
+     transform: isVisible ? "translateY(0px)" : "translateY(10px)"
+   });

    return (
      <CardWrapper
-       style={{
-         opacity: isVisible ? 1 : 0,
-         transform: isVisible ? "translateY(0px)" : "translateY(10px)",
-       }}
-     >
+     <CardWrapper style={spring}>
        {children}
      </CardWrapper>
    );
  };

  const CardWrapper = styled.div`
    ...
  `;

  const App = () => {
-  const [showCard, setShowCard] = React.useState(true);
+  const [showCard, setShowCard] = React.useState(false);

    return (
      <Wrapper style={{ textAlign: "center" }}>
-       <Button>Show Card</Button>
+       <Button onClick={() => setShowCard(!showCard)}>Show Card</Button>
        <Card isVisible={showCard}>Hello World</Card>
      </Wrapper>
    );
  };

  ...
```

### Fade-in demo

```diff
- import styled  from 'styled-components';
+ import styled, { keyframes } from 'styled-components';

  const Demo = ({ children = 'hello' }) => {
    return <Wrapper>{children}</Wrapper>;
  };

+   const riseIn = keyframes`
+     from {
+       opacity: 0;
+       transform: translateY(12px);
+     }
+     to {
+       opacity: 1;
+       transform: translateY(0px);
+     }
+   `;

  const Wrapper = styled.div`
    padding: 40px;
    box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.2);
    border-radius: 16px;
+   animation: ${riseIn} 400ms;
  `;
```

### Slide in demo

```diff
- import styled from 'styled-components';
+ import styled, { keyframes } from 'styled-components';

  const App = () => {
    return <Wrapper>ðŸ›¸</Wrapper>;
  };

+ const pow = keyframes`
+   from {
+     transform: translateX(-200px);
+   }
+   to {
+     transform: translateX(0px);
+   }
+ `;

  const Wrapper = styled.div`
    font-size: 72px;
+   animation: ${pow} 400ms cubic-bezier(0.68, 0.37, 0.64, 1.29);
  `;
```

## Accessibility

### Exercises

#### Hello button

```diff
  const Surface = styled(ButtonLayer)`
    ...
+
+   @media (prefers-reduced-motion: no-preference) {
      transition:
        transform
        400ms
        cubic-bezier(0, 0.68, 0.67, 1.09);

      &:hover {
        transform: translate(-10px, -10px);
      }
+   }
  `;
```

#### bouncing ball

```diff
  ...

  const Ball = styled.button`
    position: relative;
    width: 90px;
    height: 90px;
    background: red;
    border-radius: 50%;
    border: none;
+
+   @media (prefers-reduced-motion: no-preference) {
      animation: ${bounce} 600ms alternate ease-out infinite;
+   }
  `;
```

#### Toggle

```diff
  ...

  const Ball = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 20px;
+
+   @media (prefers-reduced-motion: no-preference) {
      transition: transform 250ms, background 400ms;
+   }
  `;
```

#### Hello World Card

```diff
  const Card = ({ isVisible, children }) => {
+   const [motion, setMotion] = useState(true);
+
+   useEffect(() => {
+     const mediaQuery = window.matchMedia(
+       '(prefers-reduced-motion: no-preference)'
+     );
+     setMotion(mediaQuery.matches);
+   }, []);

    const style = useSpring({
      opacity: isVisible ? 1 : 0,
      transform: isVisible
        ? 'translateY(0px)'
        : 'translateY(10px)',

+     immediate: !motion
    })

    return (
      <Wrapper style={style}>
        {children}
      </Wrapper>
    )
  }
```

#### Red Dot

```diff
  const App = ({ children = "Hello" }) => {
    const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

    React.useEffect(() => {
+     const mediaQuery = window.matchMedia(
+      "(prefers-reduced-motion: no-preference)"
+     );

      const handleMove = ev => {
        setMousePos({
          x: ev.clientX,
          y: ev.clientY
        });
      };

+     if (mediaQuery.matches) {
        window.addEventListener("mousemove", handleMove);
+     }

      return () => {
        window.removeEventListener("mousemove", handleMove);
      };
    }, []);

    const { x, y } = mousePos;

    const style = useSpring({
      transform: `translate(${x}px, ${y}px)`,
      config: {
        tension: 300,
        friction: 13
      }
    });

    return <Ball style={style} />;
  };

  const Ball = styled(animated.button)`
    position: fixed;
    top: -45px;
    left: -45px;
    width: 90px;
    height: 90px;
    background: red;
    border-radius: 50%;
    border: none;
    pointer-events: none;
  `;
```

For the prefers-reduced-motion media query, we're using it both within CSS as a media query, and within JS.

Within JS, here is a neat little hook, which checks the value of the media query as well as re-renders if that value changes (if the user tweaks the setting in their OS).

```js
import React from 'react';

export default function useReduceMotion() {
  if (typeof window === 'undefined') {
    return false;
  }

  const query = '(prefers-reduced-motion: no-preference)';

  const { current: mediaQueryList } = React.useRef(window.matchMedia(query));

  const [reduceMotion, setReduceMotion] = React.useState(
    !mediaQueryList.matches
  );

  React.useEffect(() => {
    const listener = event => {
      setReduceMotion(!event.matches);
    };

    mediaQueryList.addListener(listener);

    return () => {
      mediaQueryList.removeListener(listener);
    };
  }, [mediaQueryList, setReduceMotion]);

  return reduceMotion;
}
```
