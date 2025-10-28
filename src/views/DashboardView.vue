<!-- src/views/Dashboard.vue -->
<template>
  <div class="dashboard container">
    <header class="dash-header">
      <h2>Welcome, {{ user?.name || 'User' }} 👋</h2>
      <button class="logout-btn" @click="handleLogout">Logout</button>
    </header>

    <section class="stats-section">
      <div class="stat-card total">
        <h3>{{ stats.total }}</h3>
        <p>Total Tickets</p>
      </div>
      <div class="stat-card open">
        <h3>{{ stats.open }}</h3>
        <p>Open Tickets</p>
      </div>
      <div class="stat-card ongoing">
        <h3>{{ stats.ongoing }}</h3>
        <p>Ongoing Tickets</p>
      </div>
      <div class="stat-card resolved">
        <h3>{{ stats.resolved }}</h3>
        <p>Resolved Tickets</p>
      </div>
    </section>

    <section class="actions-section">
      <h3>Manage Your Tickets</h3>
      <p>View, edit, and track all your tickets in one place.</p>
      <RouterLink to="/tickets" class="btn">
        Go to Ticket Management
      </RouterLink>
    </section>

    <footer class="footer">
      <p>© 2025 Supportly. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { getSession, clearSession } from "../utils/auth";
import { getTickets } from "../utils/tickets";
import "../styles/dashboard.css";

const router = useRouter();
const user = ref(null);
const stats = ref({
  total: 0,
  open: 0,
  ongoing: 0,
  resolved: 0,
});

onMounted(() => {
  const session = getSession();
  if (!session) {
    router.push("/login");
    return;
  }
  user.value = session.user;

  updateStats();
});

function updateStats() {
  const tickets = getTickets();
  const open = tickets.filter(t => t.status === "open").length;
  const ongoing = tickets.filter(t => t.status === "in_progress").length;
  const resolved = tickets.filter(t => t.status === "closed").length;

  stats.value = {
    total: tickets.length,
    open,
    ongoing,
    resolved,
  };
}

function handleLogout() {
  clearSession();
  router.push("/");
}
</script>
