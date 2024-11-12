<!-- routes/+page.svelte -->
<script>
  import Layout from '../components/Layout.svelte';
</script>

<Layout>
  <!-- The <slot> here will render the child components based on the route -->
  <slot></slot>
</Layout>
