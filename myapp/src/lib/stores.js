// stores.js
import { writable } from 'svelte/store';

// Create a writable store to hold the expenses
export const expenses = writable([]);

// Create a writable store to hold the categories
export const categories = writable([]);

// Function to fetch expenses and populate the store
export async function fetchExpenses() {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  if (token && userId) {
    const response = await fetch(`http://localhost:5000/api/expenses/${userId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (response.ok) {
      const data = await response.json();
      expenses.set(data);
    } else {
      console.error("Failed to fetch expenses");
    }
  }
}
