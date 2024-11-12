<!-- /src/routes/dashboard/+page.svelte -->
<script>
  import Layout from '../../components/Layout.svelte';
  import ExpenseList from '../../components/ExpenseList.svelte';
  import AddExpense from '../../components/AddExpense.svelte';
  import { browser } from '$app/environment';

  let isAuthenticated = false;

  // Check for authentication token only in the browser environment
  if (browser) {
    isAuthenticated = localStorage.getItem('token') ? true : false;
    if (!isAuthenticated) {
      window.location.href = '/login'; // Redirect to login if unauthenticated
    }
  }
</script>

<Layout>
  <div class="dashboard">
    <h2>Dashboard</h2>
    <AddExpense />
    <ExpenseList />
  </div>
</Layout>

<style>
  .dashboard {
    padding: 20px;
  }
</style>
