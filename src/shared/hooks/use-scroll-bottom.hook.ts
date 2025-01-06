import { MutableRefObject } from 'react';

type Callback = () => void;

const useScrollBottom = (ref: MutableRefObject<HTMLDivElement | undefined>): ((callback?: Callback) => void) => {
  return (callback) => {
    setTimeout(() => {
      if (ref.current) {
        const target = ref.current.scrollHeight - ref.current.clientHeight;
        ref.current.scrollTo(0, target);
        callback && callback();
      }
    }, 0);
  };
};

export default useScrollBottom;
