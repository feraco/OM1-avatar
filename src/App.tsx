import { useEffect, useState } from 'react';
import Rive from '@rive-app/react-canvas';

import IDLEAnimation from './animations/face/IDLE.riv';
import loadingAnimation from './animations/openmind-logo.riv';

function Loading() {
  return (
    <div className='h-screen bg-white flex flex-col justify-center items-center'>
      <Rive src={loadingAnimation} />
    </div>
  )
}

function Animation() {
  return (
    <div className='h-screen bg-black flex flex-col justify-center items-center'>
      <Rive src={IDLEAnimation} />
    </div>
  )
}

export function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [setLoaded]);

  if (!loaded) {
    return <Loading />
  }

  return (
    <Animation />
  )
}

export default App;
