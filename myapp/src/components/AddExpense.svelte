<script>
  let category = '';
  let amount = '';
  let description = '';

  async function handleAddExpense() {
    // Fetch token and userId from localStorage
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId'); // Retrieve userId

    const response = await fetch('http://localhost:5000/api/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ category, amount, description, userId }) // Include userId in the body
    });

    if (response.ok) {
      // Handle success (e.g., clear input fields or show a success message)
      category = '';
      amount = '';
      description = '';
      alert('Expense added successfully!');
    } else {
      // Handle error (e.g., show an error message)
      alert('Failed to add expense');
    }
  }
</script>

<input bind:value={category} placeholder="Category">
<input type="number" bind:value={amount} placeholder="Amount">
<textarea bind:value={description} placeholder="Description"></textarea>
<button on:click={handleAddExpense}>Add Expense</button>
