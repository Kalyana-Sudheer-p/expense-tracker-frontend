<!-- components/Layout.svelte -->
<script>
  import Navbar from './Navbar.svelte';
</script>

<div>
  <!-- Navbar stays fixed on top -->
  <Navbar />

  <!-- Slot for rendering child pages like Login, Register, etc. -->
  <div style="padding-top: 70px;">
    <slot></slot>
  </div>
</div>