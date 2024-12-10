import React, { useState } from 'react';
import { Composition } from 'remotion';
import { MyComposition } from './MyComposition';

export const RemotionRoot = () => {
  const [durationPerImage, setDurationPerImage] = useState(100);
  const [showControls, setShowControls] = useState(true);
  const transitionDuration = 10;

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
              top: 10,
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
                top: 200,
                left: 20,
                zIndex: 1,
                background: 'rgba(255, 255, 255, 0.8)',
                padding: '10px',
                borderRadius: '5px',
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                setShowControls(false);
              }} // Prevent right-click
            >
              <input
                type="range"
                min={1}
                max={200}
                value={durationPerImage}
                onChange={(e) => setDurationPerImage(parseInt(e.target.value))}
                style={{ width: 200 }}
              />
              <p>durationPerImage: {durationPerImage}</p>
              <p>Total frames: {(durationPerImage * 10)+50}</p>
            </div>
          )}
        </>
      )}

      {/* Register the composition */}
      <Composition
        id="video"
        component={MyComposition}
        durationInFrames={(durationPerImage * 10)+50}
        fps={25}
        width={1920}
        height={1080}
        defaultProps={{ durationPerImage, transitionDuration }}
      />
    </>
  );
};
