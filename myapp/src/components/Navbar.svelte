<script>
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  let isAuthenticated = false;

  onMount(() => {
    const token = localStorage.getItem("token");
    isAuthenticated = token ? true : false;
  });

  function logout() {
    localStorage.removeItem("token");
    isAuthenticated = false;
    goto("/login");
  }

  function navigateTo(path) {
    goto(path);
  }
</script>

<nav class="navbar">
  <div class="navbar-content">
    <h3 class="logo" on:click={() => goto("/")}>ExpenseTracker</h3>

    <div class="nav-links">
      {#if isAuthenticated}
        <a class="nav-link" on:click={() => navigateTo("/dashboard")}>Dashboard</a>
        <a class="nav-link logout-link" on:click={logout}>Logout</a>
      {:else}
        <a class="nav-link" on:click={() => navigateTo("/login")}>Login</a>
        <a class="nav-link" on:click={() => navigateTo("/register")}>Register</a>
      {/if}
    </div>
  </div>
</nav>

<style>
  /* Navbar */
  .navbar {
    background: linear-gradient(90deg, #7b4fe1, #6d33d7);
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Soft shadow */
    padding: 0 30px;
    height: 70px;
  }

  /* Navbar content container */
  .navbar-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  /* Logo */
  .logo {
    font-size: 28px;
    font-weight: 700;
    color: white;
    cursor: pointer;
    letter-spacing: 1.5px;
    transition: color 0.3s ease;
  }

  .logo:hover {
    color: #e5e7eb;
  }

  /* Navigation Links container */
  .nav-links {
    display: flex;
    gap: 20px;
    align-items: center;
    cursor: pointer;
  }

  /* Navigation Link styles */
  .nav-link {
    padding: 8px 16px;
    font-size: 16px;
    font-weight: 500;
    color: white;
    text-decoration: none;
    border-radius: 30px;
    transition: all 0.3s ease;
  }

  .nav-link:hover {
    background-color: #e5e7eb;
    color: #6d33d7;
    transform: translateY(-2px);
  }

  /* Logout Link style */
  .logout-link {
    background-color: #f87171;
    color: white;
    border-radius: 30px;
    padding: 8px 16px;
  }

  .logout-link:hover {
    background-color: #ef4444;
    transform: translateY(-2px);
  }
</style>
