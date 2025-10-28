<template>
  <div class="auth-page container">
    <div class="auth-card" role="region" aria-label="Login form">
      <h2>Login to Supportly</h2>
      <form @submit.prevent="handleSubmit" novalidate>
        <label for="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          v-model="form.email"
          :aria-invalid="errors.email ? 'true' : 'false'"
          :aria-describedby="errors.email ? 'email-error' : undefined"
          placeholder="you@example.com"
          autocomplete="email"
        />
        <div v-if="errors.email" id="email-error" class="field-error">
          {{ errors.email }}
        </div>

        <label for="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          v-model="form.password"
          :aria-invalid="errors.password ? 'true' : 'false'"
          :aria-describedby="errors.password ? 'password-error' : undefined"
          placeholder="Your password"
          autocomplete="current-password"
        />
        <div v-if="errors.password" id="password-error" class="field-error">
          {{ errors.password }}
        </div>

        <button class="btn primary-btn" type="submit">Login</button>
      </form>

      <div class="auth-footer">
        <p>
          Don't have an account?
          <router-link to="/auth/signup">Sign up</router-link>
        </p>
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
import { findUserByEmail, setSession } from "../utils/auth";

const router = useRouter();

const form = ref({ email: "", password: "" });
const errors = ref({});

function runValidation() {
  const e = {};
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

  const user = findUserByEmail(form.value.email);
  if (!user || user.password !== form.value.password) {
    toast.error("Invalid credentials. Try again.");
    return;
  }

  setSession({ id: user.id, name: user.name, email: user.email });
  toast.success("Welcome back! Redirecting to dashboard...");
  router.push("/dashboard");
}
</script>

<style scoped>
@import "../styles/auth.css";
</style>
