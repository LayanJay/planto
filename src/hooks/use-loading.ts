import {Dispatch, SetStateAction, useState} from 'react';

export function useLoading(): {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
} {
  const [isLoading, setIsLoading] = useState(false);
  return {
    isLoading,
    setIsLoading,
  };
}
