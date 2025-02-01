<template>
  <!-- sidebar -->
  <div class="sidebar">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/next">Next</RouterLink>
  </div>

  <!-- content -->
  <div>
    <RouterView />
  </div>
</template>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  width: 200px;
}
</style>
