<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let isAuthenticated = false;

  // Check if user is authenticated based on the token
  onMount(() => {
    const token = localStorage.getItem('token');
    if (token) {
      isAuthenticated = true;
    } else {
      isAuthenticated = false;
    }
  });

  // Logout function
  function logout() {
    localStorage.removeItem('token'); // Remove the token
    localStorage.removeItem('userId');
    isAuthenticated = false; // Update authentication state
    goto('/login'); // Redirect to login page
  }

  // Navigate to login or register page
  function navigateTo(path) {
    goto(path);
  }

  // Navigate to home page
  function navigateHome() {
    goto('/');
  }
</script>

<nav class="navbar">
  <div class="navbar-content">
    <!-- Make the logo clickable and navigate to the home page -->
    <h3 class="logo" on:click={navigateHome}>MyApp</h3>
    
    <div class="nav-links">
      {#if isAuthenticated}
        <button class="nav-button" on:click={() => navigateTo('/dashboard')}>Dashboard</button>
        <button class="nav-button logout-button" on:click={logout}>Logout</button>
      {:else}
        <button class="nav-button" on:click={() => navigateTo('/login')}>Login</button>
        <button class="nav-button" on:click={() => navigateTo('/register')}>Register</button>
      {/if}
    </div>
  </div>
</nav>

<style>
  /* Navbar container - fixed at the top */
  .navbar {
    background: linear-gradient(90deg, #7b4fe1, #6d33d7); /* Adjusted to use #7b4fe1 */
    color: white;
    padding: 12px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed; /* Fixed at the top */
    top: 0;
    left: 0;
    right: 0;
    z-index: 10; /* Ensure it stays above other content */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  }

  /* Navbar content */
  .navbar-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1200px; /* Centered layout */
    margin: 0 auto;
  }

  /* Logo styling */
  .logo {
    font-size: 26px;
    font-weight: bold;
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #f3f4f6; /* Light color for contrast */
    letter-spacing: 1px;
    cursor: pointer;
    transition: color 0.3s ease;
  }

  .logo:hover {
    color: #dbeafe;
  }

  /* Navigation links container */
  .nav-links {
    display: flex;
    gap: 20px;
  }

  /* Button styling */
  .nav-button {
    padding: 10px 24px;
    background-color: #f3f4f6;
    color: #7b4fe1; /* Changed button text color to match the navbar */
    border: none;
    border-radius: 25px;
    cursor: pointer;
    font-size: 15px;
    font-weight: 500;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  .nav-button:hover {
    background-color: #e5e7eb;
    color: #6d33d7; /* Adjusted to match the second gradient color */
    transform: translateY(-2px);
  }

  /* Logout button with specific style */
  .logout-button {
    background-color: #f87171; /* Slightly different color for emphasis */
    color: white;
  }

  .logout-button:hover {
    background-color: #ef4444;
  }
</style>
