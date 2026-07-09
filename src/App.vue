<template>
  <div class="global-layout">
    <nav class="navbar">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/about" class="nav-link">About</router-link>
    </nav>

    <router-view />
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  background-color: #f8fafc;
  border-bottom: 1px solid #e5e7eb;
  justify-content: center;
}

.nav-link {
  text-decoration: none;
  color: #64748b;
  font-weight: 600;
  transition: color 0.2s;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #42b883;
}
</style>
