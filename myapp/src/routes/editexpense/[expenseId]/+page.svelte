<script>
  import { page } from "$app/stores"; // To access URL params
  import { onMount } from "svelte";
  import Layout from "../../../components/Layout.svelte";
  import { addNotification, expenses } from "../../../lib/stores"; // Adjust path as needed
  import { goto } from "$app/navigation";

  let category = "";
  let amount = "";
  let description = "";
  let expenseId = null;
  let categories = [];
  let userId = null;

  // Capture the expenseId from URL params
  onMount(() => {
    if (typeof window !== "undefined") {
      // Check if we are in the browser before accessing localStorage
      userId = localStorage.getItem("userId"); // Get the user ID from localStorage
    }
    expenseId = $page.params.expenseId;
    if (userId) {
      fetchCategories(userId); // Fetch categories using the userId
    }
    if (expenseId) {
      fetchExpenseData(expenseId);
    }
  });

  // Fetch categories based on the userId from the backend
  async function fetchCategories(userId) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/categories/${userId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.ok) {
        categories = await response.json();
      } else {
        console.error("Failed to fetch categories:", response.status);
        alert("Failed to load categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  // Fetch existing expense data
  async function fetchExpenseData(expenseId) {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:5000/api/expenses/edit/${expenseId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        const expense = await response.json();
        if (expense) {
          category = expense.category || "";
          amount = expense.amount || "";
          description = expense.description || "";
        } else {
          console.error("Expense not found for the given ID");
        }
      } else {
        console.error("Failed to fetch expense:", response.status);
        alert("Failed to fetch expense data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Handle form submission for creating/updating expenses
  async function handleExpenseSubmit() {
    const token = localStorage.getItem("token");
    const url = expenseId
      ? `http://localhost:5000/api/expenses/${expenseId}`
      : "http://localhost:5000/api/expenses";
    const method = expenseId ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ category, amount, description, userId }),
    });

    if (response.ok) {
      const updatedExpense = await response.json();
      expenses.update((current) =>
        expenseId
          ? current.map((expense) =>
              expense._id === expenseId ? updatedExpense : expense
            )
          : [...current, updatedExpense]
      );
      alert("Expense saved successfully!");
      // After adding an expense
      addNotification("Creating/Updating expenses!");
      goto("/dashboard");
    } else {
      alert("Failed to save expense");
    }
  }
</script>

<Layout>
  <div class="expense-form">
    <h2>{expenseId ? "Edit Expense" : "Add Expense"}</h2>
    <div class="form-group">
      <label for="category">Category</label>
      <select id="category" bind:value={category}>
        <option value="" disabled>Select a category</option>
        {#each categories as cat}
          <option value={cat._id}>{cat.name}</option>
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
      <button on:click={handleExpenseSubmit}>
        {expenseId ? "Update Expense" : "Add Expense"}
      </button>
    </div>
  </div>
</Layout>

<style>
  .expense-form {
    max-width: 400px;
    margin: 40px auto;
    padding: 20px;
    background-color: #fdfdfd;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
    color: #444;
  }

  .expense-form h2 {
    text-align: center;
    color: #222;
    margin-bottom: 16px;
    font-size: 20px;
    font-weight: 600;
  }

  .form-group {
    margin-bottom: 14px;
  }

  .form-group label {
    display: block;
    margin-bottom: 6px;
    font-size: 12px;
    color: #666;
  }

  .form-group select,
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 8px;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid #ccc;
    outline: none;
    transition: border-color 0.3s ease;
  }

  .form-group select:focus,
  .form-group input:focus,
  .form-group textarea:focus {
    border-color: #7b4fe1;
  }

  .form-group textarea {
    resize: vertical;
    min-height: 80px;
  }

  .form-group button {
    width: 100%;
    padding: 12px;
    font-size: 15px;
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
