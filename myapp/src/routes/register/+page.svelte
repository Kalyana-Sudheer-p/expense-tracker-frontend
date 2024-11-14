<script>
  import { goto } from '$app/navigation';
  import Layout from '../../components/Layout.svelte';

  let username = '';
  let password = '';
  let errorMessage = '';

  const handleRegister = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        goto('/login'); // Redirect on success
      } else {
        errorMessage = 'Registration failed';
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
        <h2>Register</h2>
        
        <form on:submit|preventDefault={handleRegister}>
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

          <button type="submit" class="submit-btn">Register</button>

          {#if errorMessage}
            <p class="error-message">{errorMessage}</p>
          {/if}
          
          <p class="login-link">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  </main>
</Layout>

<style>
  /* Global styles for the container */
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f9fafb; /* Light background */
  }

  /* Form container styling */
  .form-container {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 380px;
    border: 1px solid #d1d5db; /* Light border */
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
    background-color: #f3f4f6; /* Light gray background */
  }

  .input-field:focus {
    outline: none;
    border-color: #7b4fe1; /* Purple border on focus */
    box-shadow: 0 0 0 2px rgba(123, 79, 225, 0.2); /* Light purple glow */
  }

  /* Button styling */
  .submit-btn {
    width: 100%;
    padding: 14px;
    background-color: #7b4fe1; /* Purple background */
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }

  .submit-btn:hover {
    background-color: #6b38c7; /* Darker purple on hover */
  }

  /* Error message */
  .error-message {
    color: #dc2626; /* Red for errors */
    text-align: center;
    margin-top: 10px;
  }

  /* Link to login */
  .login-link {
    font-size: 14px;
    color: #6b7280;
    text-align: center;
    margin-top: 10px;
  }

  .login-link a {
    color: #7b4fe1; /* Purple for the link */
    font-weight: bold;
    text-decoration: none;
  }

  .login-link a:hover {
    text-decoration: underline;
  }
</style>
