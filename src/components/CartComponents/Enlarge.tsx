import React, { FC } from 'react';
import useEnlarge from '../../hooks/useEnlarge';

interface EnlargeProps {
  children: React.ReactNode;
}

const Enlarge: FC<EnlargeProps> = ({ children }) => {
  const { elementRef, handleMouseOver, handleMouseOut } = useEnlarge();

  return (
    <div
      ref={elementRef}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      style={{ transition: 'transform 0.3s' }} // Add smooth transition
    >
      {children}
    </div>
  );
};

export default Enlarge;
