import React from 'react';
import {Composition} from 'remotion';
import {MyComposition} from './MyComposition';
 
export const RemotionRoot= () => {
  return (
    <>
      <Composition
        id="video"
        component={MyComposition}
        durationInFrames={1000}
        fps={25}
        width={1920}
        height={1080}
      />
    </>
  );
};