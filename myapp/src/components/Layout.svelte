<script>
  import Navbar from './Navbar.svelte';
  import Sidebar from './Sidebar.svelte';
</script>

<div style="display: flex; flex-direction: column; height: 100vh;">
  <!-- Navbar at the top -->
  <Navbar />

  <!-- Main content and sidebar -->
  <div style="display: flex; flex-grow: 1; position: relative;">
    <!-- Sidebar (only visible if user is authenticated) -->
    <Sidebar />

    <!-- Main content area -->
    <div style="margin-left: 250px; padding-top: 70px; flex-grow: 1; overflow-y: auto;">
      <!-- Slot for rendering child pages -->
      <slot></slot>
    </div>
  </div>
</div>
