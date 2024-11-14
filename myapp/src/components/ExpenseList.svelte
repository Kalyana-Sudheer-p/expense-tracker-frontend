<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { expenses } from '../lib/stores'; // Adjust path as needed
  import { goto } from '$app/navigation'; // Import for navigation

  let isAuthenticated = false;

  // Check if the user is authenticated in the browser environment
  if (browser) {
    isAuthenticated = localStorage.getItem('token') ? true : false;
    if (!isAuthenticated) {
      window.location.href = '/login'; // Redirect to login if unauthenticated
    }
  }

  // Fetch expenses from backend
  async function fetchExpenses() {
    if (browser) {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      if (token && userId) {
        const response = await fetch(`http://localhost:5000/api/expenses/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          expenses.set(data); // Update the store with fetched expenses
        } else {
          console.error("Failed to fetch expenses");
        }
      }
    }
  }

  onMount(fetchExpenses);

  // Edit expense function
  /**
   * @param {any} expenseId
   */
  async function editExpense(expenseId) {
    const token = localStorage.getItem('token');
    if (token) {
      // Navigate to edit page (example, this route will display a form for editing)
      goto(`/editexpense/${expenseId}`);
    }
  }

  // Delete expense function
  /**
   * @param {any} expenseId
   */
  async function deleteExpense(expenseId) {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await fetch(`http://localhost:5000/api/expenses/${expenseId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        // Remove deleted expense from the store
        // @ts-ignore
        expenses.update(current => current.filter(expense => expense._id !== expenseId));
        console.log('Expense deleted');
      } else {
        console.error('Failed to delete expense');
      }
    }
  }
</script>

<table class="expense-table">
  <thead>
    <tr>
      <th>Category</th>
      <th>Amount</th>
      <th>Description</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {#each $expenses as expense}
      <tr>
        <td>{expense.category}</td>
        <td>{expense.amount}/-</td>
        <td>{expense.description}</td>
        <td class="actions-cell">
          <button class="action-btn" on:click={() => editExpense(expense._id)}>Edit</button>
          <button class="action-btn" on:click={() => deleteExpense(expense._id)}>Delete</button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  .expense-table {
    width: 80%;
    max-width: 800px;
    margin: 20px auto;
    border-collapse: collapse;
    font-family: Arial, sans-serif;
    color: #444;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  }

  .expense-table th,
  .expense-table td {
    padding: 12px 15px;
    border: 1px solid #eaeaea;
    text-align: left;
    font-size: 14px;
  }

  .expense-table th {
    background-color: #f4f4f4;
    font-weight: bold;
  }

  .expense-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  .action-btn {
    padding: 4px 8px;
    font-size: 12px;
    color: #fff;
    background-color: #7b4fe1;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .action-btn:hover {
    background-color: #6a3ec7;
  }

  .action-btn:active {
    background-color: #5d36b0;
  }

  .actions-cell {
    display: flex;
    gap: 8px;
  }
</style>
