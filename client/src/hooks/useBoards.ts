import { useState, useEffect } from 'react';
import { getBoards } from '@api';
import type { BoardType } from '@types';

export const useBoards = () => {
  const [boards, setBoards] = useState<BoardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);

      try {
        const data = await getBoards();

        if (active) {
          setBoards(data);
          setError(null);
        }
      } catch (e: any) {
        if (active) {
          setError(e.response?.data?.message || e.message || 'Failed to load boards');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  return { boards, loading, error, setBoards };
};
