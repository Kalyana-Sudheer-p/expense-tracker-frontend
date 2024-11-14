<script>
  import { goto } from '$app/navigation';
  import Layout from '../../components/Layout.svelte';
  let username = '';
  let password = '';
  let errorMessage = '';

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('token', data.token);  // Store token in localStorage
        localStorage.setItem('userId', data.userId);  // Store userId in localStorage
        goto('/dashboard'); // Redirect on success
      } else {
        errorMessage = 'Invalid credentials';
      }
    } catch (error) {
      errorMessage = 'An error occurred';
    }
  };
</script>

<Layout>
  <main>
    <div class="container">
      <div class="form-container">
        <h2>Login</h2>
        
        <form on:submit|preventDefault={handleLogin}>
          <div>
            <input
              bind:value={username}
              placeholder="Username"
              required
              class="input-field"
            />
          </div>

          <div>
            <input
              bind:value={password}
              type="password"
              placeholder="Password"
              required
              class="input-field"
            />
          </div>

          <button
            type="submit"
            class="submit-btn"
          >
            Login
          </button>

          {#if errorMessage}
            <p class="error-message">{errorMessage}</p>
          {/if}
        </form>
      </div>
    </div>
  </main>
</Layout>

<style>
  /* Remove the global background, focus on the form container */
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: transparent; /* No background */
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

  /* Input fields */
  .input-field {
    width: 100%;
    padding: 12px;
    border: 1px solid #d1d5db; /* Light border */
    border-radius: 6px;
    margin-bottom: 15px;
    box-sizing: border-box;
    font-size: 16px;
    color: #111827;
    background-color: #f9fafb;
  }

  .input-field:focus {
    outline: none;
    border-color: #7b4fe1; /* Color updated to #7b4fe1 */
    box-shadow: 0 0 0 2px rgba(123, 79, 225, 0.2); /* Light glow with #7b4fe1 */
  }

  /* Button styling */
  .submit-btn {
    width: 100%;
    padding: 14px;
    background-color: #7b4fe1; /* Button color updated to #7b4fe1 */
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }

  .submit-btn:hover {
    background-color: #5e3cc7; /* Darker variant of #7b4fe1 */
  }

  /* Error message */
  .error-message {
    color: #dc2626; /* Red for errors */
    text-align: center;
    margin-top: 10px;
  }
</style>
