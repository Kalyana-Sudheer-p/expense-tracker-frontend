<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let userData = null;
  let errorMessage = '';

  // Check for user data and handle token verification
  onMount(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const res = await fetch('http://localhost:5000/api/auth/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (res.ok) {
          userData = await res.json();
        } else {
          errorMessage = 'Unauthorized or session expired';
          goto('/login'); // Redirect to login on unauthorized access
        }
      } catch (error) {
        errorMessage = 'An error occurred';
      }
    } else {
      goto('/login'); // Redirect to login if no token is found
    }
  });

  // Logout function
  function logout() {
    localStorage.removeItem('token'); // Remove the token from localStorage
    goto('/login'); // Redirect to login page
  }
</script>

<main>
  <div class="container">
    <div class="form-container">
      {#if userData}
        <h2>Welcome, {userData.username}!</h2>
        <p>Your expenses: {userData.expenses}</p>
        
        <!-- Logout button -->
        <button on:click={logout} class="submit-btn">Logout</button>
      {:else}
        <p>{errorMessage ? errorMessage : 'Loading...'}</p>
      {/if}
    </div>
  </div>
</main>

<style>
  /* Global styles for the container and background */
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f3f4f6;
  }

  /* Form container styling */
  .form-container {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 380px;
    border: 1px solid #e5e7eb; /* Light border to match repo style */
  }

  .form-container h2 {
    text-align: center;
    font-size: 24px;
    color: #111827; /* Dark text */
    margin-bottom: 20px;
  }

  .form-container p {
    text-align: center;
    color: #111827;
  }

  /* Button styling */
  .submit-btn {
    width: 100%;
    padding: 14px;
    background-color: #2563eb; /* Blue background */
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
    margin-top: 20px;
  }

  .submit-btn:hover {
    background-color: #1d4ed8; /* Darker blue on hover */
  }

  /* Error message */
  .error-message {
    color: #dc2626; /* Red for errors */
    text-align: center;
    margin-top: 10px;
  }
</style>
