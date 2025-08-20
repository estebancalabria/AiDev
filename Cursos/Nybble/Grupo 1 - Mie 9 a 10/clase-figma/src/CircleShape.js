
import React from 'react';

function CircleShape({ color, size, extraClasses = '' }) {
  return (
    <div className={`flex shrink-0 bg-${color} rounded-full ${size} ${extraClasses}`} />
  );
}

export default CircleShape;