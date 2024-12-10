import React, { useState } from 'react';
import { Composition } from 'remotion';
import { MyComposition } from './MyComposition';
import { Clock } from './Clock';
import Timeline from "./Timeline";

export const RemotionRoot = () => {
  const [durationPerImage, setDurationPerImage] = useState(100);
  const [showControls, setShowControls] = useState(true);

  const [clockinpoint, setclockinpoint] = useState(75);
  const [clockduration, setclockduration] = useState(50);

  const transitionDuration = 10;

  const [rect, setrect] = useState([]);





  // Check if the app is rendering a video
  const isRendering = process.env.NODE_ENV === 'production';

  // Method to toggle controls
  const toggleControls = () => {
    setShowControls(!showControls);
  };

  return (
    <>
      {/* Show controls only if NOT rendering */}
      {!isRendering && (
        <>
          <button
            onClick={toggleControls}
            style={{
              position: 'fixed',
              top: 0,
              right: 10,
              zIndex: 1000,
              padding: '10px 15px',
              background: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {showControls ? 'Hide Controls' : 'Show Controls'}
          </button>

          {showControls && (
            <div
              style={{
                position: 'fixed',
                top: 400,
                left: 0,
                zIndex: 1,
                background: 'rgba(255, 255, 255, 0.8)',
                padding: '10px',
                borderRadius: '5px',
                height: 100,
                width: 240
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                setShowControls(false);
              }} // Prevent right-click
            >
              <Timeline  clockinpoint={clockinpoint} setclockinpoint={setclockinpoint} clockduration={clockduration} setclockduration={setclockduration }/>
              <button onClick={()=>setrect(val=>[...val, 1])}> Add</button>

            </div>
          )}
        </>
      )}

      {/* Register the composition */}
      <Composition
        id="video"
        component={MyComposition}
        durationInFrames={(durationPerImage * 10) + 50}
        fps={25}
        width={1920}
        height={1080}
        defaultProps={{ durationPerImage, transitionDuration }}
      />
      <Composition
        id="clock"
        component={Clock}
        durationInFrames={500}
        fps={25}
        width={1920}
        height={1080}
        defaultProps={{ fps: 25, clockinpoint, clockduration , rect}}
      />


    </>
  );
};
