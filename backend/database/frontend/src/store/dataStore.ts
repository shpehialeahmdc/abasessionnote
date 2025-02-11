// /frontend/src/store/dataStore.ts
import create from 'zustand';

interface Behavior {
  id: string;
  name: string;
  timestamp: Date;
  duration?: number;
}

interface DataStore {
  behaviors: Behavior[];
  addBehavior: (behavior: Omit<Behavior, 'id'>) => void;
  removeBehavior: (id: string) => void;
}

export const useDataStore = create<DataStore>((set) => ({
  behaviors: [],
  addBehavior: (behavior) => set((state) => ({
    behaviors: [...state.behaviors, { ...behavior, id: Math.random().toString(36).substr(2, 9) }]
  })),
  removeBehavior: (id) => set((state) => ({
    behaviors: state.behaviors.filter((b) => b.id !== id)
  }))
}));

// /frontend/src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
