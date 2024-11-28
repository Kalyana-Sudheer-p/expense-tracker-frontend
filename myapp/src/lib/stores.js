// stores.js
import { writable } from 'svelte/store';

// Create a writable store to hold the expenses
export const expenses = writable([]);

// Create a writable store to hold the categories
export const categories = writable([]);

// Notifications store
export const notifications = writable([]);

// Function to add a notification
/**
 * @param {any} message
 */
export function addNotification(message) {
  notifications.update((current) => {
    // Add the new notification to the start of the list
    const updated = [{ message, timestamp: new Date() }, ...current];
    // Optional: limit to last 10 notifications
    return updated.slice(0, 10);
  });
}

// Function to clear all notifications
export function clearNotifications() {
  notifications.set([]);
}

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
