import { useState, useEffect } from 'react';
import type { Herb } from '../../types/herb';
import * as herbService from '../services/herbService';

export function useHerbs() {
  const [herbs, setHerbs] = useState<Herb[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadHerbs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await herbService.getHerbs();
      setHerbs(data);
    } catch (err) {
      setError('Failed to load herbs');
      console.error('Error loading herbs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHerbs();
  }, []);

  const deleteHerb = async (id: string) => {
    try {
      await herbService.deleteHerb(id);
      await loadHerbs();
    } catch (err) {
      setError('Failed to delete herb');
      console.error('Error deleting herb:', err);
    }
  };

  return {
    herbs,
    loading,
    error,
    loadHerbs,
    deleteHerb,
  };
}