import { useRef } from 'react';

// interface Props {
//   fn(text: string): void;
//   delay: number;
// }

export default function useDebounce(fn: ((text: string) => void) | undefined, delay: number){

  const timeoutRef = useRef(null);
  
  function debouncedFn(...params: any[]){
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      fn(...params);
    }, delay);
  }
  
  return debouncedFn;
}
