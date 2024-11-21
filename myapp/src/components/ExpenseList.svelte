<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { expenses } from '../lib/stores'; // Adjust path as needed
  import { goto } from '$app/navigation';

  let isAuthenticated = false;

  // Check authentication
  if (browser) {
    isAuthenticated = localStorage.getItem('token') ? true : false;
    if (!isAuthenticated) {
      window.location.href = '/login';
    }
  }

  // Fetch expenses with category names
  async function fetchExpenses() {
    if (browser) {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      if (token && userId) {
        try {
          const response = await fetch(`http://localhost:5000/api/expenses/${userId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (response.ok) {
            const data = await response.json();
            expenses.set(data); // Update store with fetched expenses
          } else {
            console.error('Failed to fetch expenses:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching expenses:', error);
        }
      }
    }
  }

  onMount(fetchExpenses);

  // Edit expense function
  async function editExpense(expenseId) {
    goto(`/editexpense/${expenseId}`);
  }

  // Delete expense function
  async function deleteExpense(expenseId) {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await fetch(`http://localhost:5000/api/expenses/${expenseId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          expenses.update(current => current.filter(expense => expense._id !== expenseId));
          console.log('Expense deleted successfully');
        } else {
          console.error('Failed to delete expense:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting expense:', error);
      }
    }
  }
</script>

<!-- Expense Table -->
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
        <!-- Use categoryId.name to display the category name -->
        <td>{expense.categoryId.name || 'Unknown'}</td>
        <td>{expense.amount} /-</td>
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
    width: 90%;
    max-width: 1000px;
    margin: 20px auto;
    border-collapse: collapse;
    font-family: Arial, sans-serif;
    color: #333;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  .expense-table th,
  .expense-table td {
    padding: 12px 16px;
    border: 1px solid #ddd;
    text-align: left;
    font-size: 14px;
  }

  .expense-table th {
    background-color: #f8f8f8;
    font-weight: bold;
  }

  .expense-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  .action-btn {
    padding: 6px 12px;
    font-size: 13px;
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
    gap: 10px;
  }
</style>
