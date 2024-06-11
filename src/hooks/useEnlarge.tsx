import { useRef } from 'react';

const useEnlarge = () => {
  const elementRef = useRef<HTMLDivElement | null>(null);

  const handleMouseOver = () => {
    if (elementRef.current) {
      elementRef.current.style.transform = 'scale(1)';
    }
  };

  const handleMouseOut = () => {
    if (elementRef.current) {
      elementRef.current.style.transform = 'scale(0.99)';
    }
  };

  return { elementRef, handleMouseOver, handleMouseOut };
};

export default useEnlarge;
