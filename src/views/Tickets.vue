<template>
  <div class="tickets-page">
    <!-- Header -->
    <header class="tickets-header">
      <h1>🎟️ Ticket Management</h1>
      <button class="back-btn" @click="router.push('/dashboard')">
        ← Back to Dashboard
      </button>
    </header>

    <!-- Form Section -->
    <section class="ticket-form">
      <h2>{{ editingTicket ? "Edit Ticket" : "Create New Ticket" }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>Title <span>*</span></label>
          <input
            type="text"
            name="title"
            placeholder="Enter ticket title"
            v-model="formData.title"
          />
        </div>

        <div class="form-group">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Describe the issue..."
            v-model="formData.description"
          ></textarea>
        </div>

        <div class="form-group">
          <label>Status <span>*</span></label>
          <select name="status" v-model="formData.status">
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div class="form-actions">
          <button type="submit" class="save-btn">
            {{ editingTicket ? "Update" : "Create" }}
          </button>
          <button
            v-if="editingTicket"
            type="button"
            class="cancel-btn"
            @click="resetForm"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>

    <!-- Ticket List Section -->
    <section class="ticket-list">
      <h2>All Tickets</h2>
      <p v-if="tickets.length === 0" class="empty-msg">
        No tickets yet. Create one above.
      </p>

      <div v-else class="ticket-grid">
        <div class="ticket-card" v-for="t in tickets" :key="t.id">
          <h3>{{ t.title }}</h3>
          <p class="desc">{{ t.description || "No description" }}</p>
          <span class="status-tag" :class="t.status">
            {{ t.status.replace("_", " ") }}
          </span>
          <div class="actions">
            <button class="edit-btn" @click="handleEdit(t)">Edit</button>
            <button class="delete-btn" @click="handleDelete(t.id)">
              Delete
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getSession } from "../utils/auth";
import {
  getTickets,
  addTicket,
  updateTicket,
  deleteTicket,
} from "../utils/tickets";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const router = useRouter();
const tickets = ref([]);
const editingTicket = ref(null);
const formData = ref({
  title: "",
  description: "",
  status: "open",
});

onMounted(() => {
  const session = getSession();
  if (!session) {
    toast.error("Unauthorized access. Please log in.");
    router.push("/login");
    return;
  }
  tickets.value = getTickets();
});

const resetForm = () => {
  formData.value = { title: "", description: "", status: "open" };
  editingTicket.value = null;
};

const handleSubmit = () => {
  if (!formData.value.title.trim()) {
    toast.error("Title is required");
    return;
  }

  if (!["open", "in_progress", "closed"].includes(formData.value.status)) {
    toast.error("Invalid status value");
    return;
  }

  if (editingTicket.value) {
    const updated = { ...formData.value, id: editingTicket.value.id };
    updateTicket(updated);
    toast.success("Ticket updated successfully!");
  } else {
    addTicket(formData.value);
    toast.success("Ticket created successfully!");
  }

  tickets.value = getTickets();
  resetForm();
};

const handleEdit = (ticket) => {
  editingTicket.value = ticket;
  formData.value = { ...ticket };
};

const handleDelete = (id) => {
  if (confirm("Are you sure you want to delete this ticket?")) {
    deleteTicket(id);
    tickets.value = getTickets();
    toast.success("Ticket deleted successfully!");
  }
};
</script>

<style scoped src="../styles/tickets.css"></style>
