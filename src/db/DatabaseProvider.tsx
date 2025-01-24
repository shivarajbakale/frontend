import { createContext, useContext, useEffect, useState } from 'react';
import appDatabase from './database';

const DatabaseContext = createContext<typeof appDatabase | null>(null);

export function DatabaseProvider({ children }: { children: React.ReactNode }) {
  const [db, setDb] = useState<typeof appDatabase | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initDb = async () => {
      try {
        setDb(appDatabase);
      } catch (err) {
        console.error('Failed to initialize database:', err);
        setError(
          err instanceof Error
            ? err
            : new Error('Failed to initialize database')
        );
      }
    };

    initDb();
  }, []);

  if (error) {
    return <div>Error initializing database: {error.message}</div>;
  }

  if (!db) {
    return <div>Loading database...</div>;
  }

  return (
    <DatabaseContext.Provider value={db}>{children}</DatabaseContext.Provider>
  );
}

export const useDatabase = () => {
  const db = useContext(DatabaseContext);
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
};
