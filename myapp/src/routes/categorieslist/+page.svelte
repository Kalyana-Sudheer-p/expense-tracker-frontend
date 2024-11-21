<script>
  import { onMount } from "svelte";
  import Layout from "../../components/Layout.svelte";

  /**
   * @type {string | any[]}
   */
  let categories = [];
  let errorMessage = "";
  let isLoading = false;
  let userId = "";

  // Fetch categories on component mount
  onMount(() => {
    // @ts-ignore
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
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authentication
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
</script>

<Layout>
  <main>
    <h1>Your Categories</h1>

    {#if isLoading}
      <p>Loading categories...</p>
    {:else if errorMessage}
      <p class="error">{errorMessage}</p>
    {:else if categories.length === 0}
      <p>No categories found. Create a new one to get started.</p>
    {:else}
      <ul class="category-list">
        {#each categories as category}
          <li>
            <h3>{category.name}</h3>
            <p><strong>Budget:</strong> {category.budget.toFixed(2)}/-</p>
            <!-- <p><strong>Credits:</strong>{category.credits.toFixed(2)}/-</p> -->
            <p><strong>Debits:</strong> {category.debits.toFixed(2)}/-</p>
          </li>
        {/each}
      </ul>
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

  .error {
    color: #e63946;
    font-size: 14px;
    text-align: center;
  }

  .category-list {
    list-style: none;
    padding: 0;
  }

  .category-list li {
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .category-list li h3 {
    margin: 0 0 10px;
    color: #4a4a4a;
    font-size: 18px;
  }

  .category-list li p {
    margin: 5px 0;
    font-size: 14px;
    color: #6b6b6b;
  }

  .category-list li p strong {
    color: #4a4a4a;
  }
</style>
