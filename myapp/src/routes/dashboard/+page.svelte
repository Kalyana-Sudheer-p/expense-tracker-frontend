<script>
  import Layout from '../../components/Layout.svelte';
  import ExpenseList from '../../components/ExpenseList.svelte';
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation'; // Import goto to redirect

  let isAuthenticated = false;

  // Check for authentication token only in the browser environment
  if (browser) {
    isAuthenticated = localStorage.getItem('token') ? true : false;
    if (!isAuthenticated) {
      window.location.href = '/login'; // Redirect to login if unauthenticated
    }
  }

  // Function to handle button click and navigate to AddExpense component
  const navigateToAddExpense = () => {
    goto('/addexpense'); // Redirect to /add-expense route
  };
</script>

<Layout>
  <div class="dashboard">
    <!-- <h2>Dashboard</h2> -->
    
    <!-- Add Expense Button -->
    <button class="add-expense-btn" on:click={navigateToAddExpense}>Add Expense</button>

    <!-- Expense List -->
    <ExpenseList />
  </div>
</Layout>

<style>
  .dashboard {
    padding: 20px;
    position: relative; /* Needed for positioning the button */
  }

  /* Styling for the Add Expense button */
  .add-expense-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    background-color: #7b4fe1; /* Button color */
    color: white;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .add-expense-btn:hover {
    background-color: #5e3cc7; /* Darker variant on hover */
  }
</style>
