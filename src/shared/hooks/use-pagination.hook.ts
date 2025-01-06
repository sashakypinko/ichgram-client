import { useState } from 'react';

type Cb = () => void;

interface PaginationControl {
  offset: number;
  limit: number;
  next: Cb;
  prev: Cb;
  reset: Cb;
}

const usePagination = (limit = 10): PaginationControl => {
  const [offset, setOffset] = useState<number>(0);

  const next = () => {
    setOffset(offset + limit);
  };

  const prev = () => {
    setOffset(offset - limit);
  };

  const reset = () => {
    setOffset(0);
  };

  return { offset, limit, next, prev, reset };
};

export default usePagination;
