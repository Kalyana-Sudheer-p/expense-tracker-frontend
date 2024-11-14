<script>
    import Layout from '../../components/Layout.svelte';
    import { expenses } from '../../lib/stores'; // Adjust path as needed
    import { goto } from '$app/navigation';
  
    let category = '';
    let amount = '';
    let description = '';
  
    async function handleAddExpense() {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
  
      const response = await fetch('http://localhost:5000/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ category, amount, description, userId })
      });
  
      if (response.ok) {
        const newExpense = await response.json(); // Assuming the backend returns the added expense
        // @ts-ignore
        expenses.update(currentExpenses => [...currentExpenses, newExpense]); // Add new expense to the store
        category = '';
        amount = '';
        description = '';
        alert('Expense added successfully!');
        goto('/dashboard');
      } else {
        alert('Failed to add expense');
      }
    }
  </script>

  <Layout>
  <div class="expense-form">
    <h2>Add Expense</h2>
    <div class="form-group">
      <label for="category">Category</label>
      <input id="category" bind:value={category} placeholder="Enter category" />
    </div>
    <div class="form-group">
      <label for="amount">Amount</label>
      <input id="amount" type="number" bind:value={amount} placeholder="Enter amount" />
    </div>
    <div class="form-group">
      <label for="description">Description</label>
      <textarea id="description" bind:value={description} placeholder="Enter description"></textarea>
    </div>
    <div class="form-group">
      <button on:click={handleAddExpense}>Add Expense</button>
    </div>
  </div>
</Layout>
  
  <style>
    .expense-form {
      max-width: 300px; /* Narrower form width */
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
      font-size: 11px; /* Smaller label font size */
      color: #666;
    }
  
    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 2px;
      font-size: 13px; /* Slightly smaller font for inputs */
      border-radius: 4px;
      border: 1px solid #ccc;
      outline: none;
      transition: border-color 0.2s ease;
    }
  
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