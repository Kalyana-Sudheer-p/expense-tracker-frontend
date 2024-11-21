<script>
  import { goto } from "$app/navigation";

  let token, userId;

  // Retrieve token and userId from localStorage
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
    userId = localStorage.getItem("userId");
  }

  // Function to navigate to different sections
  function navigateTo(path) {
    goto(path);
  }
</script>

{#if token}
  <div class="sidebar">
    <button class="sidebar-button" on:click={() => navigateTo(`/budgetsummary/${userId}`)}>
      Budget Summary
    </button>
    <button class="sidebar-button" on:click={() => navigateTo(`/categorieslist`)}>
      Categories List
    </button>
    <button class="sidebar-button" on:click={() => navigateTo(`/categoryform`)}>
      Category Form
    </button>
    <button class="sidebar-button" on:click={() => navigateTo(`/updatecategorybudget`)}>
      Update Category Budget
    </button>
  </div>
{/if}

<style>
  .sidebar {
    position: fixed;
    top: 70px; /* Below the navbar */
    left: 0;
    width: 250px;
    height: calc(100vh - 70px); /* Full height minus navbar height */
    background-color: #ffffff; /* Light background for a cleaner look */
    padding: 20px;
    box-shadow: 2px 0 12px rgba(0, 0, 0, 0.1);
    z-index: 5;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  /* Sidebar Button Styling to match the Add Expense Button */
  .sidebar-button {
    padding: 10px 14px;
    background: none;
    color: #7b4fe1; /* Purple color for links */
    font-size: 15px; /* Matching font size with Add Expense button */
    font-weight: 500; /* Consistent font weight */
    text-align: left;
    border: none;
    border-radius: 8px; /* Rounded corners for consistency */
    cursor: pointer;
    transition: all 0.3s ease; /* Smooth transition for hover and focus effects */
    text-decoration: none;
    outline: none;
  }

  /* Hover effect for buttons */
  .sidebar-button:hover {
    background-color: #f4f2ff; /* Light background on hover */
    color: #6d33d7; /* Darker purple color on hover */
    transform: translateX(5px); /* Slight move effect */
  }

  /* Focus effect for buttons */
  .sidebar-button:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(113, 56, 232, 0.5); /* Box shadow focus effect */
  }
</style>
