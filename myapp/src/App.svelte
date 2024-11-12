<!-- App.svelte -->
<script>
  import './styles/tailwind.css'; 
</script>

<main>
  <!-- The routes will be automatically managed by SvelteKit, and the layout is wrapped around all of them -->
  <slot></slot>
</main>
