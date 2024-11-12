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
    isAuthenticated = false; // Update authentication state
    goto('/login'); // Redirect to login page
  }

  // Navigate to login or register page
  function navigateTo(path) {
    goto(path);
  }
</script>

<nav class="navbar">
  <div class="navbar-content">
    <h3 class="logo">MyApp</h3>
    
    <div class="nav-links">
      {#if isAuthenticated}
        <button class="nav-button" on:click={logout}>Logout</button>
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
    background-color: #2563eb; /* Blue background */
    color: white;
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed; /* Fixed at the top */
    top: 0;
    left: 0;
    right: 0;
    z-index: 10; /* Ensure it stays above other content */
  }

  /* Navbar content */
  .navbar-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  /* Logo styling */
  .logo {
    font-size: 24px;
    font-weight: bold;
    margin: 0;
  }

  /* Navigation links container */
  .nav-links {
    display: flex;
    gap: 15px;
  }

  /* Button styling */
  .nav-button {
    padding: 10px 20px;
    background-color: white;
    color: #2563eb; /* Blue text */
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }

  .nav-button:hover {
    background-color: #f3f4f6;
  }
</style>
