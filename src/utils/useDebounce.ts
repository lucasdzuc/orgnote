import { useRef } from 'react';

// interface Props {
//   fn(text: string): void;
//   delay: number;
// }

export default function useDebounce(fn: (arg0: any) => void, delay: any){

  const timeoutRef = useRef(null);
  
  function debouncedFn(...params: any[]){
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      fn(...params);
    }, delay);
  }
  
  return debouncedFn;
}
