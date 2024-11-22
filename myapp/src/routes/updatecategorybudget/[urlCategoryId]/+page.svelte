<script>
  import { onMount } from "svelte";
  // @ts-ignore
  import { goto } from "$app/navigation"; // For navigation
  import Layout from "../../../components/Layout.svelte";

  let selectedCategoryId = "";
  let newBudget = ""; // newBudget should be empty by default
  let categoryName = ""; // categoryName will be filled upon fetching category data
  let isLoading = false;
  let successMessage = "";
  let errorMessage = "";
  let userId = "";
  let isEditing = true; // Add this for controlling editing state

  // Accessing URL params using $page store
  import { page } from "$app/stores";

  // Capture categoryId from URL params
  let { urlCategoryId } = $page.params;

  onMount(() => {
    // @ts-ignore
    userId = localStorage.getItem("userId");
    if (!userId) {
      errorMessage =
        "User is not logged in. Please log in to update categories.";
      return;
    }
    if (urlCategoryId) {
      selectedCategoryId = urlCategoryId;
      fetchCategoryData();
    }
  });

  // Fetch category data from the backend using the /edit/:id route
  async function fetchCategoryData() {
    console.log(selectedCategoryId); // Log the category ID
    try {
      const response = await fetch(
        `http://localhost:5000/api/categories/edit/${selectedCategoryId}`, // Updated to call the /edit/:id route
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        const category = await response.json();
        console.log(category); // Log the entire category data
        categoryName = category.name;
        console.log(categoryName); // Log the category name
        newBudget = ""; // Set newBudget as an empty string
      } else {
        const errorData = await response.json();
        errorMessage = errorData.message || "Error fetching category.";
      }
    } catch (error) {
      errorMessage = "An error occurred while fetching the category data.";
    }
  }

  // Update the category budget
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
        fetchCategoryData(); // Refresh the category data after update
      } else {
        const errorData = await response.json();
        errorMessage = errorData.message || "Error updating category.";
      }
    } catch (error) {
      errorMessage = "An error occurred while updating the category.";
    } finally {
      isLoading = false;
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
        <label for="categoryName">Category Name:</label>
        <input
          id="categoryName"
          type="text"
          bind:value={categoryName}
          disabled={!isEditing}
          placeholder="Category name"
        />

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
      </div>
    {/if}
  </main>
</Layout>

<style>
  main {
    padding: 20px;
    max-width: 600px;
    margin: 40px auto 0; /* Adjusted top margin to 40px */
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f9fafb; /* Light background for the main section */
  }

  h1 {
    text-align: center;
    color: #5a67d8; /* Calming blue */
    font-size: 2rem;
    margin-bottom: 20px;
  }

  .form-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-width: 400px;
    margin: 0 auto;
  }

  label {
    font-weight: 600;
    color: #4a5568; /* Neutral text color */
    margin-bottom: 5px;
  }

  input {
    padding: 12px;
    border: 1px solid #cbd5e0; /* Softer border color */
    border-radius: 6px;
    width: 100%;
    font-size: 15px;
    background-color: #ffffff;
    transition:
      box-shadow 0.2s ease-in-out,
      border-color 0.2s ease-in-out;
  }

  input:focus {
    outline: none;
    border-color: #5a67d8; /* Matching primary color */
    box-shadow: 0 0 5px rgba(90, 103, 216, 0.5);
  }

  input[disabled] {
    background-color: #edf2f7; /* Slightly darker disabled background */
    color: #a0aec0; /* Muted text for disabled inputs */
  }

  button {
    background-color: #6b46c1; /* Vibrant purple for buttons */
    color: white;
    padding: 11px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    border-radius: 6px;
    transition:
      background-color 0.3s,
      transform 0.2s ease-in-out;
  }

  button:hover {
    background-color: #553c9a; /* Darker shade on hover */
  }

  button:active {
    background-color: #45358c; /* Slightly darker on click */
  }

  .success {
    color: #38a169; /* Green for success messages */
    text-align: center;
    font-weight: 600;
  }

  .error {
    color: #e53e3e; /* Red for error messages */
    text-align: center;
    font-weight: 600;
  }
</style>
