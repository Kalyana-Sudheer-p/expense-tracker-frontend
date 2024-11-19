<script>
  import { onMount } from "svelte";
  // @ts-ignore
  import { goto } from "$app/navigation";
  import Layout from "../../components/Layout.svelte";

  let name = "";
  let budget = "";
  let userId = "";

  let isLoading = false;
  let errorMessage = "";
  let successMessage = "";

  // Retrieve userId from localStorage on mount
  onMount(() => {
    // @ts-ignore
    userId = localStorage.getItem("userId");
    if (!userId) {
      errorMessage =
        "User is not logged in. Please log in to create a category.";
    }
  });

  // Submit form to create a new category
  /**
   * @param {{ preventDefault: () => void; }} event
   */
  async function createCategory(event) {
    event.preventDefault();
    errorMessage = "";
    successMessage = "";

    if (!name || !budget) {
      errorMessage = "Please fill in all fields.";
      return;
    }

    isLoading = true;

    try {
      const response = await fetch("http://localhost:5000/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authentication
        },
        body: JSON.stringify({ userId, name, budget: parseFloat(budget) }),
      });

      if (response.ok) {
        const data = await response.json();
        successMessage = "Category created successfully!";
        name = "";
        budget = "";
        console.log("New Category:", data);
      } else {
        const errorData = await response.json();
        errorMessage = errorData.message || "Error creating category.";
      }
    } catch (error) {
      errorMessage = "An error occurred. Please try again later.";
    } finally {
      isLoading = false;
    }
  }
</script>

<Layout>
  <main>
    <h1>Create New Category</h1>
    <form on:submit|preventDefault={createCategory}>
      <div class="form-group">
        <label for="name">Category Name</label>
        <input
          type="text"
          id="name"
          bind:value={name}
          placeholder="Enter category name"
          required
        />
      </div>

      <div class="form-group">
        <label for="budget">Budget</label>
        <input
          type="number"
          id="budget"
          bind:value={budget}
          placeholder="Enter budget amount"
          min="0"
          step="0.01"
          required
        />
      </div>

      {#if errorMessage}
        <p class="error">{errorMessage}</p>
      {/if}

      {#if successMessage}
        <p class="success">{successMessage}</p>
      {/if}

      <button type="submit" class="submit-button" disabled={isLoading}>
        {isLoading ? "Creating..." : "Create Category"}
      </button>
    </form>
  </main>
</Layout>

<style>
  main {
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }

  h1 {
    text-align: center;
    color: #4a4a4a;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  label {
    font-size: 16px;
    color: #4a4a4a;
    margin-bottom: 8px;
  }

  input {
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  input:focus {
    outline: none;
    border-color: #7b4fe1;
  }

  .error {
    color: #e63946;
    font-size: 14px;
  }

  .success {
    color: #2a9d8f;
    font-size: 14px;
  }

  .submit-button {
    padding: 12px;
    font-size: 16px;
    color: white;
    background-color: #7b4fe1;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .submit-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .submit-button:hover:not(:disabled) {
    background-color: #6d33d7;
  }
</style>
