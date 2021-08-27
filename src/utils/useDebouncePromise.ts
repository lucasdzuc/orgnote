import { useRef } from 'react';

// interface Props {
//   fn(text: string): any;
//   delay: number;
// }

export default function useDebounce(fn: (arg0: any) => any, delay: number){
  
  const timeoutRef = useRef(null);
  
  function handler(...params: any){

    return new Promise((resolve, reject) => {

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(async () => {
        try {
          const response = await fn(...params);
          resolve(response)
        } catch (e) {
          reject(e);
        }
      }, delay);

    });
    
  }
  
  return handler;
}
