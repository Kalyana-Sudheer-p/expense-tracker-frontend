<script>
  import Layout from "../components/Layout.svelte";
</script>

<Layout>
  <div class="main-container">
    <h1 class="main-heading">Welcome to My Expense Tracker</h1>
    <!-- Display overview or links to login/register -->
  </div>
</Layout>

<style>
  /* Main container styling */
  .main-container {
    padding: 16px;
    max-width: 1200px;
    margin-left: 250px; /* Adjusted for the sidebar width */
    margin-top: 80px; /* Adjusted for the navbar height */
    margin-right: 16px; /* Added right margin to avoid overlap */
    color: #333;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }

  /* Button styling */
  .button {
    padding: 10px 24px;
    background-color: #f3f4f6;
    color: #7b4fe1;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    font-size: 15px;
    font-weight: 500;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  .button:hover {
    background-color: #e5e7eb;
    color: #6d33d7;
    transform: translateY(-2px);
  }

  /* Heading styling */
  .main-heading {
    font-size: 32px;
    color: #4a4a4a;
    margin-bottom: 20px;
    text-align: center;
  }
</style>
