<script>
  import { goto } from "$app/navigation";
  import Layout from "../../components/Layout.svelte";

  let username = "";
  let password = "";
  let confirmPassword = ""; // New field for confirmation
  let errorMessage = "";
  let passwordField; // Reference to the password input field
  let confirmPasswordField; // Reference to the confirm password input field

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      errorMessage = "Passwords do not match";
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        goto("/login"); // Redirect on success
      } else {
        errorMessage = "Registration failed";
      }
    } catch (error) {
      errorMessage = "An error occurred";
    }
  };

  function showPassword(event) {
    const inputType = event.target.checked ? "text" : "password";
    if (passwordField) passwordField.type = inputType;
    if (confirmPasswordField) confirmPasswordField.type = inputType;
  }
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

          <div class="password-container">
            <input
              bind:value={password}
              bind:this={passwordField}
              type="password"
              placeholder="Enter Password"
              required
              class="input-field"
            />
            <input
              bind:value={confirmPassword}
              bind:this={confirmPasswordField}
              type="password"
              placeholder="Confirm Password"
              required
              class="input-field"
            />
            <div class="show-password">
              <input
                type="checkbox"
                id="show-password"
                on:change={showPassword}
              />
              <label for="show-password">Show password</label>
            </div>
          </div>

          <button type="submit" class="submit-btn">Register</button>

          {#if errorMessage}
            <p class="error-message">{errorMessage}</p>
          {/if}

          <p class="account-text">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  </main>
</Layout>

<style>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: transparent;
  }

  .form-container {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 290px;
    border: 1px solid #e5e7eb;
  }

  .form-container h2 {
    text-align: center;
    font-size: 24px;
    color: #111827;
    margin-bottom: 20px;
  }

  .input-field {
    width: 100%;
    padding: 12px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    margin-bottom: 15px;
    box-sizing: border-box;
    font-size: 16px;
    color: #111827;
    background-color: #f3f4f6;
  }
  .input-field:focus {
    outline: none;
    border-color: #7b4fe1;
    box-shadow: 0 0 0 2px rgba(123, 79, 225, 0.2);
  }

  .password-container {
    position: relative;
  }

  .show-password {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-top: -10px;
    margin-bottom: 15px;
  }

  .submit-btn {
    width: 100%;
    padding: 14px;
    background-color: #7b4fe1;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }

  .submit-btn:hover {
    background-color: #5e3cc7;
  }

  .error-message {
    color: #dc2626;
    text-align: center;
    margin-top: 10px;
  }

  .account-text {
    text-align: center;
    font-size: 14px;
    color: #6b7280;
    margin-top: 10px;
  }

  .account-text {
    text-align: center;
    font-size: 14px;
    color: #6b7280;
    margin-top: 10px;
  }
</style>
