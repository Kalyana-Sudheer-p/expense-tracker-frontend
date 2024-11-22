<script>
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import { expenses } from "../lib/stores";
  import { goto } from "$app/navigation";

  let isAuthenticated = false;
  let filterCategory = "";
  let filterDateFrom = "";
  let filterDateTo = "";
  let filterMinPrice = "";
  let filterMaxPrice = "";
  let filteredExpenses = [];

  // Authentication check
  if (browser) {
    isAuthenticated = localStorage.getItem("token") ? true : false;
    if (!isAuthenticated) {
      window.location.href = "/login";
    }
  }

  // Fetch expenses
  async function fetchExpenses() {
    if (browser) {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (token && userId) {
        try {
          const response = await fetch(
            `http://localhost:5000/api/expenses/${userId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (response.ok) {
            const data = await response.json();
            expenses.set(data);
            filteredExpenses = data; // Initialize filtered expenses
          } else {
            console.error("Failed to fetch expenses:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching expenses:", error);
        }
      }
    }
  }

  onMount(fetchExpenses);

  // Filter expenses
  function applyFilters() {
    filteredExpenses = $expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);

      // Date filter
      const dateFilter =
        (!filterDateFrom || expenseDate >= new Date(filterDateFrom)) &&
        (!filterDateTo || expenseDate <= new Date(filterDateTo));

      // Category filter (case-insensitive)
      const categoryFilter =
        !filterCategory ||
        expense.categoryId.name.toLowerCase() === filterCategory.toLowerCase();

      // Price filter
      const priceFilter =
        (!filterMinPrice || expense.amount >= Number(filterMinPrice)) &&
        (!filterMaxPrice || expense.amount <= Number(filterMaxPrice));

      return dateFilter && categoryFilter && priceFilter;
    });
  }

  // Clear filters
  function clearFilters() {
    filterCategory = "";
    filterDateFrom = "";
    filterDateTo = "";
    filterMinPrice = "";
    filterMaxPrice = "";
    filteredExpenses = $expenses; // Reset to original list
  }

  // Format date
  function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB").format(date);
  }

  // Edit expense function
  async function editExpense(expenseId) {
    goto(`/editexpense/${expenseId}`);
  }

  // Delete expense function with confirmation
  async function deleteExpense(expenseId) {
    const token = localStorage.getItem("token");
    const userConfirmed = confirm("Are you sure you want to delete this expense?");
    if (!userConfirmed) return;

    if (token) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/expenses/${expenseId}`,
          { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.ok) {
          expenses.update((current) =>
            current.filter((expense) => expense._id !== expenseId)
          );
          console.log("Expense deleted successfully");
        } else {
          console.error("Failed to delete expense:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting expense:", error);
      }
    }
  }
</script>

<!-- Filters Section -->
<div class="filters-wrapper">
  <div class="filters-container">
    <div class="filter-group">
      <input id="category" type="text" placeholder="Category" bind:value={filterCategory} />
    </div>

    <div class="filter-group">
      <input id="date-from" type="date" bind:value={filterDateFrom} />
    </div>

    <div class="filter-group">
      <input id="date-to" type="date" bind:value={filterDateTo} />
    </div>

    <div class="filter-group">
      <input id="min-price" type="number" placeholder="Min" bind:value={filterMinPrice} />
    </div>

    <div class="filter-group">
      <input id="max-price" type="number" placeholder="Max" bind:value={filterMaxPrice} />
    </div>

    <div class="filter-buttons">
      <button class="apply-filters-btn" on:click={applyFilters}>Apply Filters</button>
      <button class="clear-filters-btn" on:click={clearFilters}>Clear Filters</button>
    </div>
  </div>
</div>

<!-- Expense Table -->
<div class="table-wrapper">
  <table class="expense-table">
    <thead>
      <tr>
        <th>Category</th>
        <th>Amount</th>
        <th>Description</th>
        <th>Date</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each filteredExpenses as expense}
        <tr>
          <td>{expense.categoryId.name || "Unknown"}</td>
          <td>{expense.amount} /-</td>
          <td>{expense.description}</td>
          <td>{formatDate(expense.date)}</td>
          <td class="actions">
            <button class="edit-btn" on:click={() => editExpense(expense._id)}>
              Edit
            </button>
            <button class="delete-btn" on:click={() => deleteExpense(expense._id)}>
              Delete
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  /* Global Styles */
  * {
    box-sizing: border-box;
  }

  body {
    font-family: "Arial", sans-serif;
    background-color: #f3f4f6;
    margin: 0;
    padding: 0;
  }

  /* Filters Section */
  .filters-wrapper {
    display: flex;
    justify-content: center;
    margin: 15px 0;
  }

  .filters-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    max-width: 1000px;
    width: 100%;
    padding: 8px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .filter-group {
    display: flex;
    flex-direction: column;
    margin-right: 12px;
  }

  .filter-group input {
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 6px;
    outline: none;
    transition: border-color 0.2s ease;
    width: 130px;
  }

  .filter-group input:focus {
    border-color: #7b4fe1;
  }

  .filter-buttons {
    display: flex;
    gap: 8px;
    margin-left: 15px;
  }

  .apply-filters-btn,
  .clear-filters-btn {
    padding: 8px 14px;
    font-size: 14px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .apply-filters-btn {
    background-color: #7b4fe1;
    color: white;
  }

  .apply-filters-btn:hover {
    background-color: #6a3ec7;
  }

  .clear-filters-btn {
    background-color: #e0e0e0;
    color: #7b4fe1;
  }

  .clear-filters-btn:hover {
    background-color: #c2c2c2;
  }

  /* Expense Table */
  .table-wrapper {
    width: 100%;
    max-width: 1000px;
    overflow-x: auto;
    margin: 20px auto;
  }

  .expense-table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 6px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    background-color: white;
  }

  .expense-table th,
  .expense-table td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
  }

  .expense-table th {
    background-color: #f1f1f1;
    color: #7b4fe1;
  }

  tr:hover {
    background-color: #f5f5f5;
  }

  .actions button {
    margin-right: 8px;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 12px;
  }

  .edit-btn {
    background-color: #7b4fe1;
    color: white;
    border: none;
  }

  .edit-btn:hover {
    background-color: #6a3ec7;
  }

  .delete-btn {
    background-color: #7b4fe1;
    color: white;
    border: none;
  }

  .delete-btn:hover {
    background-color: #6a3ec7;
  }
</style>
