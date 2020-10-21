import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

export const useDelayedState = (
  initialState: boolean,
  delayIn: number,
  delayOut: number,
): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [state, setState] = useState(initialState);
  const [mirror, setMirror] = useState(state);

  useEffect(() => {
    const tm = setTimeout(setState, mirror ? delayIn : delayOut, mirror);
    return () => clearTimeout(tm);
  }, [delayIn, delayOut, mirror]);

  return [state, setMirror];
};

export const useHover = (delayIn: number, delayOut: number) => {
  const [hovered, setHovered] = useDelayedState(false, delayIn, delayOut);
  const [focused, setFocused] = useDelayedState(false, delayIn, delayOut);

  return [
    hovered || focused,
    {
      onMouseEnter: useCallback(() => setHovered(true), [setHovered]),
      onMouseLeave: useCallback(() => setHovered(false), [setHovered]),
      onFocus: useCallback(() => setFocused(true), [setFocused]),
      onBlur: useCallback(() => setFocused(false), [setFocused]),
    },
  ];
};
