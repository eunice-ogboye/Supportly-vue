<template>
  <div class="auth-page container">
    <div class="auth-card" role="region" aria-label="Signup form">
      <h2>Create your Supportly account</h2>
      <form @submit.prevent="handleSubmit" novalidate>
        <label for="name">Full Name</label>
        <input
          id="name"
          name="name"
          type="text"
          v-model="form.name"
          placeholder="John Doe"
        />
        <div v-if="errors.name" class="field-error">{{ errors.name }}</div>

        <label for="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          v-model="form.email"
          placeholder="you@example.com"
        />
        <div v-if="errors.email" class="field-error">{{ errors.email }}</div>

        <label for="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          v-model="form.password"
          placeholder="Choose a strong password"
        />
        <div v-if="errors.password" class="field-error">{{ errors.password }}</div>

        <button class="btn primary-btn" type="submit">Sign Up</button>
      </form>

      <div class="auth-footer">
        <p>Already have an account? <router-link to="/auth/login">Login</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { validateEmail, validatePassword } from "../utils/validations";
import { addUser, findUserByEmail, setSession } from "../utils/auth";

const router = useRouter();

const form = ref({ name: "", email: "", password: "" });
const errors = ref({});

function runValidation() {
  const e = {};
  if (!form.value.name.trim()) e.name = "Name is required.";
  const emailErr = validateEmail(form.value.email);
  const passErr = validatePassword(form.value.password);
  if (emailErr) e.email = emailErr;
  if (passErr) e.password = passErr;
  return e;
}

function handleSubmit() {
  const v = runValidation();
  if (Object.keys(v).length) {
    errors.value = v;
    toast.error("Please fix the highlighted errors.");
    return;
  }

  if (findUserByEmail(form.value.email)) {
    toast.error("An account with this email already exists.");
    return;
  }

  const user = addUser(form.value);
  setSession(user);
  toast.success("Account created successfully! Redirecting...");
  router.push("/dashboard");
}
</script>

<style scoped>
@import "../styles/auth.css";
</style>
