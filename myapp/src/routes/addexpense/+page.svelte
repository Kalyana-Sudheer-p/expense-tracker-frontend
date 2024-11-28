<script>
  import Layout from "../../components/Layout.svelte";
  import { addNotification, expenses } from "../../lib/stores"; // Adjust path as needed
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  /**
   * @type {any[]}
   */
  let categories = []; // Stores the fetched categories
  let selectedCategoryId = ""; // Selected category ID
  let amount = "";
  let description = "";
  let expenseDate = ""; // Store for the date input

  // Fetch available categories
  async function fetchCategories() {
    if (typeof window !== "undefined") {
      // Check for browser environment
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      try {
        const response = await fetch(
          `http://localhost:5000/api/categories/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          categories = await response.json(); // Set fetched categories
        } else {
          alert("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
  }

  // Use onMount to call fetchCategories in the browser
  onMount(() => {
    fetchCategories();
  });

  async function handleAddExpense() {
    if (typeof window !== "undefined") {
      // Check for browser environment
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      const response = await fetch("http://localhost:5000/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          categoryId: selectedCategoryId,
          amount,
          description,
          userId,
          date: expenseDate, // Send the selected date
        }),
      });

      if (response.ok) {
        const newExpense = await response.json(); // Assuming the backend returns the added expense
        expenses.update((currentExpenses) => [...currentExpenses, newExpense]); // Add new expense to the store
        selectedCategoryId = "";
        amount = "";
        description = "";
        expenseDate = ""; // Clear the date field
        alert("Expense added successfully!");
        // After adding an expense
        addNotification("New expense added!");
        goto("/dashboard");
      } else {
        alert("Failed to add expense");
      }
    }
  }
</script>

<Layout>
  <div class="expense-form">
    <h2>Add Expense</h2>
    <div class="form-group">
      <label for="category">Category</label>
      <select id="category" bind:value={selectedCategoryId}>
        <option value="" disabled selected>Select a category</option>
        {#each categories as category}
          <option value={category._id}>{category.name}</option>
        {/each}
      </select>
    </div>
    <div class="form-group">
      <label for="amount">Amount</label>
      <input
        id="amount"
        type="number"
        bind:value={amount}
        placeholder="Enter amount"
      />
    </div>
    <div class="form-group">
      <label for="description">Description</label>
      <textarea
        id="description"
        bind:value={description}
        placeholder="Enter description"
      ></textarea>
    </div>
    <div class="form-group">
      <label for="date">Date</label>
      <input id="date" type="date" bind:value={expenseDate} />
    </div>
    <div class="form-group">
      <button on:click={handleAddExpense}>Add Expense</button>
    </div>
  </div>
</Layout>

<style>
  .expense-form {
    max-width: 300px;
    margin: 40px auto;
    padding: 16px 20px;
    background-color: #fdfdfd;
    border-radius: 6px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    font-family: Arial, sans-serif;
    color: #444;
  }

  .expense-form h2 {
    text-align: center;
    color: #222;
    margin-bottom: 16px;
    font-size: 18px;
    font-weight: 600;
  }

  .form-group {
    margin-bottom: 12px;
  }

  .form-group label {
    display: block;
    margin-bottom: 4px;
    font-size: 11px;
    color: #666;
  }

  .form-group select,
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 8px;
    font-size: 13px;
    border-radius: 4px;
    border: 1px solid #ccc;
    outline: none;
    transition: border-color 0.2s ease;
  }

  .form-group select:focus,
  .form-group input:focus,
  .form-group textarea:focus {
    border-color: #7b4fe1;
  }

  .form-group textarea {
    resize: vertical;
    min-height: 60px;
  }

  .form-group button {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    color: #fff;
    background-color: #7b4fe1;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-weight: 500;
  }

  .form-group button:hover {
    background-color: #6a3ec7;
  }

  .form-group button:active {
    background-color: #5d36b0;
  }
</style>
