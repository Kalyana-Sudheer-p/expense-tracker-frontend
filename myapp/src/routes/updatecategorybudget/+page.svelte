<script>
  import { onMount } from "svelte";
  import Layout from "../../components/Layout.svelte";

  /**
   * @type {string | any[]}
   */
  let categories = [];
  let selectedCategoryId = "";
  let newBudget = "";
  let isLoading = false;
  let successMessage = "";
  let errorMessage = "";
  let userId = "";

  // Fetch categories on component mount
  onMount(() => {
    // @ts-ignore
    userId = localStorage.getItem("userId");
    if (!userId) {
      errorMessage =
        "User is not logged in. Please log in to update categories.";
      return;
    }
    fetchCategories();
  });

  async function fetchCategories() {
    try {
      const response = await fetch(
        `http://localhost:5000/api/categories/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        categories = await response.json();
      } else {
        const errorData = await response.json();
        errorMessage = errorData.message || "Error fetching categories.";
      }
    } catch (error) {
      errorMessage = "An error occurred while fetching categories.";
    }
  }

  async function updateBudget() {
    if (!selectedCategoryId || !newBudget) {
      errorMessage = "Please select a category and enter a valid budget.";
      return;
    }

    isLoading = true;
    errorMessage = "";
    successMessage = "";

    try {
      const response = await fetch(
        `http://localhost:5000/api/categories/${selectedCategoryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ budget: Number(newBudget) }),
        }
      );

      if (response.ok) {
        const updatedCategory = await response.json();
        successMessage = `Budget updated successfully for ${updatedCategory.name}.`;
        // Refresh categories after update
        fetchCategories();
      } else {
        const errorData = await response.json();
        errorMessage = errorData.message || "Error updating category.";
      }
    } catch (error) {
      errorMessage = "An error occurred while updating the category.";
    } finally {
      isLoading = false;
      newBudget = ""; // Clear the input field
    }
  }
</script>

<Layout>
  <main>
    <h1>Update Category Budget</h1>

    {#if isLoading}
      <p>Loading...</p>
    {:else}
      <div class="form-container">
        {#if categories.length > 0}
          <label for="categories">Select Category:</label>
          <select id="categories" bind:value={selectedCategoryId}>
            <option value="" disabled selected>Select a category</option>
            {#each categories as category}
              <option value={category._id}>{category.name}</option>
            {/each}
          </select>

          <label for="budget">New Budget:</label>
          <input
            id="budget"
            type="number"
            min="0"
            step="0.01"
            bind:value={newBudget}
            placeholder="Enter new budget"
          />

          <button on:click={updateBudget}>Update Budget</button>

          {#if successMessage}
            <p class="success">{successMessage}</p>
          {/if}
          {#if errorMessage}
            <p class="error">{errorMessage}</p>
          {/if}
        {:else}
          <p>No categories found. Please add categories first.</p>
        {/if}
      </div>
    {/if}
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

  .form-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  label {
    font-weight: bold;
    color: #4a4a4a;
  }

  select,
  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    width: 100%;
  }

  button {
    padding: 10px 20px;
    background-color: #7b4fe1;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #6d33d7;
  }

  .success {
    color: #38a169;
    font-size: 14px;
  }

  .error {
    color: #e63946;
    font-size: 14px;
  }
</style>
