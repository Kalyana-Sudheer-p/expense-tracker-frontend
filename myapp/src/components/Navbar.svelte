<script>
  import { notifications } from "../lib/stores";
  import { onMount } from "svelte";
  import { derived } from "svelte/store";
  import { goto } from "$app/navigation";

  let isAuthenticated = false;
  let showNotifications = false; // Toggle for the popup

  // Derived store to get the notification count
  const notificationCount = derived(
    notifications,
    ($notifications) => $notifications.length
  );

  onMount(() => {
    const token = localStorage.getItem("token");
    isAuthenticated = token ? true : false;
  });

  function logout() {
    localStorage.removeItem("token");
    isAuthenticated = false;
    goto("/login");
  }

  function toggleNotifications() {
    showNotifications = !showNotifications;
  }

  function clearAllNotifications() {
    notifications.set([]);
    showNotifications = false; // Close popup after clearing
  }
</script>

<nav class="navbar">
  <div class="navbar-content">
    <h3 class="logo" on:click={() => goto("/")}>ExpenseTracker</h3>

    <div class="nav-links">
      {#if isAuthenticated}
        <div class="notification" on:click={toggleNotifications}>
          <span class="bell-icon">🔔</span>
          {#if $notificationCount > 0}
            <span class="notification-count">{$notificationCount}</span>
          {/if}

          {#if showNotifications}
            <div class="notification-popup">
              {#if $notificationCount === 0}
                <p>No new notifications</p>
              {:else}
                <ul>
                  {#each $notifications as notification (notification.timestamp)}
                    <li>{notification.message}</li>
                  {/each}
                </ul>
                <button class="clear-button" on:click={clearAllNotifications}
                  >Clear All</button
                >
              {/if}
            </div>
          {/if}
        </div>
        <a class="nav-link logout-link" on:click={logout}>Logout</a>
      {:else}
        <a class="nav-link" on:click={() => goto("/login")}>Login</a>
        <a class="nav-link" on:click={() => goto("/register")}>Register</a>
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

  .notification {
    position: relative;
    cursor: pointer;
  }

  .bell-icon {
    font-size: 24px;
  }

  .notification-count {
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: red;
    color: white;
    font-size: 14px;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .notification-popup {
    position: absolute;
    top: 40px;
    right: 0;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 10px;
    width: 250px;
    z-index: 200;
  }

  .notification-popup ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .notification-popup li {
    padding: 8px 0;
    border-bottom: 1px solid #e5e5e5;
  }

  .notification-popup li:last-child {
    border-bottom: none;
  }

  .clear-button {
    width: 100%;
    background: #f87171;
    color: white;
    border: none;
    padding: 8px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }

  .clear-button:hover {
    background: #ef4444;
  }
</style>
