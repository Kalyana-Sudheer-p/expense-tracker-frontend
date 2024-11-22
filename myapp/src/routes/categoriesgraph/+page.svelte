<script>
  import { onMount } from "svelte";
  import Chart from "../../components/Chart.svelte";
  import Layout from "../../components/Layout.svelte";

  let categories = []; // Categories fetched from API
  let selectedCategory = null; // Selected category
  let graphData = []; // Data for the chart
  let token, userId;

  // Retrieve token and userId from localStorage
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
    userId = localStorage.getItem("userId");
  }

  // Fetch categories from the API
  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/categories/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      categories = await response.json();
      console.log("Fetched categories:", categories); // Log the fetched categories
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch expenses for the selected category
  // Fetch expenses for the selected category
  const fetchExpenses = async (categoryId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/expenses/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const expenses = await response.json();
      console.log("Fetched expenses:", expenses);

      // Adjust the filtering, map to include description, and sort by Date object
      graphData = expenses
        .filter((expense) => expense.categoryId._id === categoryId)
        .map((expense) => ({
          date: new Date(expense.date), // Store as Date object for correct sorting
          amount: expense.amount,
          description: expense.description, // Include description
        }))
        .sort((a, b) => a.date - b.date); // Sort by Date object in ascending order

      // Format the date as dd/mm/yyyy after sorting
      graphData = graphData.map((expense) => ({
        ...expense,
        date: expense.date.toLocaleDateString("en-GB"), // Convert to dd/mm/yyyy format
      }));

      console.log("Filtered graph data:", graphData);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  // Handle category selection
  const handleCategoryChange = async (event) => {
    const categoryId = event.target.value;
    selectedCategory = categories.find((cat) => cat._id === categoryId);
    console.log("Selected Category:", selectedCategory); // Log selected category
    await fetchExpenses(categoryId); // Fetch expenses for the selected category
  };

  // Load categories on mount
  onMount(() => {
    fetchCategories();
  });
</script>

<Layout>
  <div class="categories-graph">
    <!-- Dropdown to select category -->
    <div class="category-selector">
      <select on:change={handleCategoryChange}>
        <option value="" disabled selected>Select a category</option>
        {#each categories as category}
          <option value={category._id}>{category.name}</option>
        {/each}
      </select>
    </div>

    <!-- Chart component -->
    {#if graphData.length > 0}
      <Chart
        expenses={graphData}
        xLabel="Date"
        yLabel="Amount"
        title={`Expenses for ${selectedCategory?.name || ""}`}
      />
    {/if}
  </div>
</Layout>

<style>
  .categories-graph {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f9f9f9;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 800px;
    margin: 2rem auto;
  }

  .category-selector {
    width: 100%;
    max-width: 300px;
    margin-bottom: 1.5rem;
    background-color: #ffffff;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  .category-selector select {
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1.1rem;
    border: none;
    background-color: #f5f5f5;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .category-selector select:hover {
    background-color: #e1e1e1;
  }

  .category-selector select:focus {
    outline: none;
    background-color: #d8d8d8;
  }

  .categories-graph h1 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: #333;
  }

  /* Chart Styling */
  .chart-container {
    width: 100%;
    height: 400px;
    max-width: 800px;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
  }

  canvas {
    width: 100% !important;
    height: 100% !important;
    border-radius: 8px;
  }

  /* Responsive design */
  @media (max-width: 768px) {
    .categories-graph {
      padding: 1.5rem;
    }
    .category-selector {
      max-width: 100%;
    }
  }
</style>
