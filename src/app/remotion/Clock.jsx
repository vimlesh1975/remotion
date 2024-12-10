import React from 'react';
import { useCurrentFrame, interpolate , AbsoluteFill, Sequence } from 'remotion';

export const Clock = ({ fps, clockinpoint, clockduration }) => {
  const frame = useCurrentFrame();

  // Calculate the time (HH:MM:SS) based on the current frame
  const totalSeconds = Math.floor(frame / fps);
  const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');

  // Animate opacity for a subtle blinking effect
  const opacity = interpolate(
    frame % fps,
    [0, fps / 2, fps],
    [1, 0.5, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
    style={{
      backgroundColor: 'rgba(0, 0, 0, 0)', // Fully transparent background
      justifyContent: 'center',
      alignItems: 'center',
      fontSize:500,
      color:'red',
      opacity
    }}
  >
    <Sequence
      from={clockinpoint}
      durationInFrames={clockduration}
    >
    {hours}:{minutes}:{seconds}
    </Sequence>
      </AbsoluteFill>
  );
};
