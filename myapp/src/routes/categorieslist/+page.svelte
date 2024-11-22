<script>
  import { onMount } from "svelte";
  import Layout from "../../components/Layout.svelte";
  import { goto } from "$app/navigation";

  let categories = [];
  let errorMessage = "";
  let isLoading = false;
  let userId = "";

  onMount(() => {
    userId = localStorage.getItem("userId");
    if (!userId) {
      errorMessage = "User is not logged in. Please log in to view categories.";
      return;
    }
    fetchCategories();
  });

  async function fetchCategories() {
    isLoading = true;
    errorMessage = "";
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
    } finally {
      isLoading = false;
    }
  }

  async function deleteCategory(id) {
    const confirmDelete = confirm("Are you sure you want to delete this category and its related expenses?");
    if (!confirmDelete) return;
    try {
      const response = await fetch(`http://localhost:5000/api/categories/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        fetchCategories();
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Error deleting category.");
      }
    } catch (error) {
      alert("An error occurred while deleting the category.");
    }
  }

  function editCategory(urlCategoryId) {
    goto(`/updatecategorybudget/${urlCategoryId}`);
  }

  function addCategory() {
    goto("/categoryform");
  }
</script>

<Layout>
  <main>
    <div class="header">
      <h1>Your Categories</h1>
      <button class="add-expense-btn" on:click={addCategory}>Add Category</button>
    </div>

    {#if isLoading}
      <p>Loading categories...</p>
    {:else if errorMessage}
      <p class="error">{errorMessage}</p>
    {:else if categories.length === 0}
      <p>No categories found. Create a new one to get started.</p>
    {:else}
      <div class="table-wrapper">
        <table class="category-table">
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Budget</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {#each categories as category}
              <tr>
                <td>{category.name}</td>
                <td>{category.budget.toFixed(2)}/-</td>
                <td class="actions">
                  <button class="edit-btn" on:click={() => editCategory(category._id)}>
                    Edit
                  </button>
                  <button class="delete-btn" on:click={() => deleteCategory(category._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </main>
</Layout>

<style>
  /* Global Styles */
  * {
    box-sizing: border-box;
  }

  body {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f4f7fc;
    margin: 0;
    padding: 0;
    color: #333;
  }

  main {
    padding: 24px;
    max-width: 900px; /* Increased width for better layout */
    margin: 0 auto;
    font-size: 16px;
  }

  h1 {
    color: #2c3e50;
    font-weight: 600;
    font-size: 2rem; /* Increased font size */
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px; /* Add spacing below header */
  }

  .error {
    color: #e74c3c;
    text-align: center;
  }

  .table-wrapper {
    margin-top: 32px;
    overflow-x: auto;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Enhanced shadow */
  }

  .category-table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Deeper shadow */
  }

  .category-table th,
  .category-table td {
    padding: 10px 14px; /* Increased padding */
    text-align: left;
    border-bottom: 1px solid #f0f0f0;
  }

  .category-table th {
    background-color: #f8f9fa;
    color: #7b4fe1;
    font-weight: 600;
  }

  .category-table tr:hover {
    background-color: #f9f9f9;
  }

  .category-table td {
    color: #555;
  }

  .actions button {
    margin-right: 12px; /* Increased spacing */
    padding: 8px 16px; /* Larger buttons */
    font-size: 16px; /* Larger font */
    border-radius: 8px; /* Rounded corners */
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease; /* Smooth transitions */
    font-weight: 500;
  }

  .edit-btn {
    background-color: #7b4fe1;
    color: white;
  }

  .delete-btn {
    background-color: #7b4fe1;
    color: white;
  }

  .edit-btn:hover {
    background-color: #6a3fcb;
  }

  .delete-btn:hover {
    background-color: #6a3fcb;
  }

  /* Styling for the Add Category button */
  .add-expense-btn {
    background-color: #6d33d7;
    color: white;
    padding: 10px 14px;
    font-size: 15px;
    font-weight: 300;
    border: none;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .add-expense-btn:hover {
    background-color: #5e3cc7;
    transform: translateY(-3px);
  }

  .add-expense-btn:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(113, 56, 232, 0.5);
  }
</style>
