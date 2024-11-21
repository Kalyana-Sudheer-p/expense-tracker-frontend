<script>
  import Layout from '../../components/Layout.svelte';
  import ExpenseList from '../../components/ExpenseList.svelte';
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';

  let isAuthenticated = false;

  if (browser) {
    isAuthenticated = localStorage.getItem('token') ? true : false;
    if (!isAuthenticated) {
      window.location.href = '/login';
    }
  }

  const navigateToAddExpense = () => {
    goto('/addexpense');
  };
</script>

<Layout>
  <div class="dashboard">
    <!-- Add Expense Button -->
    <button class="add-expense-btn" on:click={navigateToAddExpense}>Add Expense</button>

    <!-- Expense List -->
    <ExpenseList />
  </div>
</Layout>

<style>
  .dashboard {
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  /* Styling for Total Amount Section */
  .total-amount {
    font-size: 20px;
    font-weight: 600;
    color: #333;
    margin-bottom: 20px;
  }

  .amount {
    font-size: 24px;
    color: #7b4fe1;
    font-weight: 700;
  }

  /* Styling for the Add Expense button */
  .add-expense-btn {
    align-self: flex-end;
    background-color: #6d33d7;
    color: white;
    padding: 10px 14px;
    font-size: 15px;
    font-weight: 300;
    border: none;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .add-expense-btn:hover {
    background-color: #5e3cc7;
    transform: translateY(-3px);
  }

  .add-expense-btn:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(113, 56, 232, 0.5);
  }

  /* Responsive design */
  @media (max-width: 768px) {
    .dashboard {
      padding: 20px;
    }

    .add-expense-btn {
      padding: 10px 20px;
      font-size: 16px;
    }

    .total-amount {
      font-size: 18px;
    }

    .amount {
      font-size: 22px;
    }
  }
</style>
