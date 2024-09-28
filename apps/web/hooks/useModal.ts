import { useReducer } from 'react';

const useModals = () => {
  const initState = {
    addProjectModal: false
  };

  const [modals, updateModals] = useReducer(
    (prev: typeof initState, next: Partial<typeof initState>): typeof initState => {
      return { ...prev, ...next };
    },
    initState
  );

  return { modals, updateModals };
};

export { useModals }