import { useRef } from 'react';

export default function useDebounce() {
  const timeoutId = useRef<NodeJS.Timeout>(null);
  
  function debounce(func: any, timeout?: 300) {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    timeoutId.current = setTimeout(() => {
      func();
    }, timeout);
  }
  return { debounce };
}
