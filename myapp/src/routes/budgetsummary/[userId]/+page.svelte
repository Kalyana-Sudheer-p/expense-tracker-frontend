<script>
  import Layout from '../../../components/Layout.svelte';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  /**
   * @type {string | any[]}
   */
  let summary = []; // To store the fetched summary data
  let isAuthenticated = false;

  // Check authentication in browser environment
  if (browser) {
    isAuthenticated = localStorage.getItem('token') ? true : false;
    if (!isAuthenticated) {
      window.location.href = '/login';
    }
  }

  // Fetch budget summary from the backend
  async function fetchSummary() {
    if (browser) {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (token && userId) {
        try {
          const response = await fetch(`http://localhost:5000/api/categories/budgetsummary/${userId}`, {
            headers: { 'Authorization': `Bearer ${token}` },
          });

          if (response.ok) {
            summary = await response.json();
          } else {
            console.error('Failed to fetch budget summary');
          }
        } catch (error) {
          console.error('Error fetching summary:', error);
        }
      }
    }
  }

  onMount(fetchSummary);
</script>

<Layout>
  <div class="budget-summary-container">
    <h2>Budget Summary</h2>

    {#if summary.length > 0}
      <table class="summary-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Budget</th>
            <th>Remaining</th>
          </tr>
        </thead>
        <tbody>
          {#each summary as { name, budget, remaining }}
            <tr>
              <td>{name}</td>
              <td>${budget.toFixed(2)}</td>
              <td>${remaining.toFixed(2)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    {:else}
      <p class="no-data">No summary data available.</p>
    {/if}
  </div>
</Layout>

<style>
  .budget-summary-container {
    max-width: 800px;
    margin: 40px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
    color: #333;
  }

  h2 {
    text-align: center;
    color: #444;
    margin-bottom: 20px;
  }

  .summary-table {
    width: 100%;
    border-collapse: collapse;
    margin: 0 auto;
  }

  .summary-table th,
  .summary-table td {
    padding: 12px 15px;
    border: 1px solid #e0e0e0;
    text-align: left;
    font-size: 14px;
  }

  .summary-table th {
    background-color: #f4f4f4;
    font-weight: bold;
  }

  .summary-table tr:nth-child(even) {
    background-color: #fafafa;
  }

  .no-data {
    text-align: center;
    font-size: 16px;
    color: #888;
    margin-top: 20px;
  }
</style>
