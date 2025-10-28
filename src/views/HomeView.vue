<template>
  <div class="landing">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>
          Welcome to <span>Supportly</span>
        </h1>
        <p>
          Manage your support tickets seamlessly — track, resolve, and stay organized
          all in one beautiful dashboard.
        </p>

        <div class="hero-buttons">
          <button class="btn-primary" @click="goToLogin">Login</button>
          <button class="btn-secondary" @click="goToSignup">Get Started</button>
        </div>
      </div>

      <!-- Decorative Circle -->
      <div class="decor-circle"></div>

      <!-- Wavy Background -->
      <svg
        class="wave"
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#0ea5e9"
          fill-opacity="1"
          d="M0,64L48,74.7C96,85,192,107,288,133.3C384,160,480,192,576,186.7C672,181,768,139,864,128C960,117,1056,139,1152,138.7C1248,139,1344,117,1392,106.7L1440,96L1440,320L0,320Z"
        ></path>
      </svg>
    </section>

    <!-- Features Section -->
    <section class="features">
      <h2>Why Choose Supportly?</h2>
      <div class="feature-grid">
        <div class="feature-card">
          <h3>🔒 Secure Access</h3>
          <p>
            Your account and ticket data are safely stored with session-based protection.
          </p>
        </div>
        <div class="feature-card">
          <h3>⚡ Fast Management</h3>
          <p>
            Create, view, edit, and resolve tickets in seconds with smooth, real-time updates.
          </p>
        </div>
        <div class="feature-card">
          <h3>📊 Smart Dashboard</h3>
          <p>
            Get insights at a glance — open tickets, resolved issues, and progress tracking.
          </p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer>
      <p>© {{ currentYear }} Supportly. All Rights Reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "LandingView",
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
  methods: {
    goToLogin() {
      this.$router.push("/auth/login");
    },
    goToSignup() {
      this.$router.push("/auth/signup");
    },
  },
};
</script>

<style scoped>
/* ======== GLOBAL ======== */
.landing {
  font-family: "Poppins", sans-serif;
  color: #0f172a;
  background: #f8fafc;
  max-width: 1440px;
  margin: 0 auto;
  overflow-x: hidden;
}

/* ======== HERO ======== */
.hero {
  position: relative;
  text-align: center;
  padding: 6rem 1.5rem 10rem;
  background: linear-gradient(180deg, #f0f9ff 0%, #ffffff 100%);
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 700px;
  margin: 0 auto;
}

.hero h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #0f172a;
}

.hero h1 span {
  color: #0ea5e9;
}

.hero p {
  margin-top: 1rem;
  color: #475569;
  font-size: 1.1rem;
  line-height: 1.6;
}

.hero-buttons {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

/* Buttons */
.btn-primary,
.btn-secondary {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #0ea5e9;
  color: #fff;
}

.btn-primary:hover {
  background: #0284c7;
}

.btn-secondary {
  background: #fff;
  color: #0ea5e9;
  border: 2px solid #0ea5e9;
}

.btn-secondary:hover {
  background: #e0f2fe;
}

/* Decorative Circle */
.decor-circle {
  position: absolute;
  top: 80px;
  left: -60px;
  width: 150px;
  height: 150px;
  background: #bae6fd;
  border-radius: 50%;
  z-index: 1;
  opacity: 0.6;
}

/* Wavy Background */
.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  z-index: 1;
}

/* ======== FEATURES ======== */
.features {
  background: #fff;
  text-align: center;
  padding: 4rem 1.5rem;
}

.features h2 {
  font-size: 2rem;
  color: #0f172a;
  margin-bottom: 2rem;
}

.feature-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
}

.feature-card {
  background: #f1f5f9;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
  max-width: 320px;
  flex: 1;
  min-width: 260px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.feature-card h3 {
  color: #0ea5e9;
  margin-bottom: 1rem;
}

/* ======== FOOTER ======== */
footer {
  background: #0ea5e9;
  color: #fff;
  text-align: center;
  padding: 1rem;
  font-size: 0.9rem;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

/* ======== RESPONSIVE ======== */

/* Tablet */
@media (max-width: 1024px) {
  .hero h1 {
    font-size: 2rem;
  }
  .features h2 {
    font-size: 1.8rem;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .hero {
    padding: 4rem 1rem 8rem;
  }
  .hero-buttons {
    flex-direction: column;
  }
  .feature-grid {
    flex-direction: column;
    align-items: center;
  }
}
</style>
