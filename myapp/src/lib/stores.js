import { writable } from 'svelte/store';

function createUserStore() {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const { subscribe, set, update } = writable(storedUser);

  return {
    subscribe,
    set: (user) => {
      localStorage.setItem('user', JSON.stringify(user));
      set(user);
    },
    logout: () => {
      localStorage.removeItem('user');
      set(null);
    }
  };
}

export const user = createUserStore();
