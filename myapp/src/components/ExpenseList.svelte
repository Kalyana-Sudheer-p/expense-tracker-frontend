<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  /**
   * @type {any[]}
   */
  let expenses = [];

  // Function to fetch expenses, only runs in the browser
  async function fetchExpenses() {
    if (browser) {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId'); // Assuming user ID is stored in localStorage
      if (token && userId) {
        const response = await fetch(`http://localhost:5000/api/expenses/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          expenses = await response.json();
        } else {
          console.error("Failed to fetch expenses");
        }
      }
    }
  }

  // Use `onMount` to run `fetchExpenses` only on the client side
  onMount(fetchExpenses);
</script>

<!-- List of expenses -->
<ul>
{#each expenses as expense}
  <li>
    {expense.category} - {expense.amount} - {expense.description}
    <!-- Add buttons here for updating or deleting if needed -->
  </li>
{/each}
</ul>
