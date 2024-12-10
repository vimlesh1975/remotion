import React, { useState } from 'react'
import { Rnd } from 'react-rnd';


const timeline = ({ clockinpoint, setclockinpoint, clockduration, setclockduration }) => {


    return (
        <div>
            <Rnd
                style={{ backgroundColor: '#0d4a82', textAlign: 'center' }}
                size={{ width: clockduration, height: 20 }}
                position={{ x: clockinpoint, y: 0, }}
                enableResizing={{ top: false, right: true, bottom: false, left: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}
                onDrag={(e, d) => {
                    setclockinpoint(d.x);
                }}
                onResize={(e, direction, ref, delta, position) => {
                    setclockduration(parseInt(ref.style.width));
                }}
            >
                Rnd
            </Rnd>
        </div>
    )
}

export default timeline