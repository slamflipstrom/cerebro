<script lang="ts">
  import LoginForm from './LoginForm.svelte'
  import RegisterForm from './RegisterForm.svelte'
  import { authStore } from '../stores/auth.svelte'

  let currentView = $state<'login' | 'register'>('login')

  function switchToLogin() {
    currentView = 'login'
  }

  function switchToRegister() {
    currentView = 'register'
  }

  function handleForgotPassword() {
    // For now, just show an alert. In a real app, you'd implement password reset
    alert('Password reset functionality would be implemented here. Please contact support for now.')
  }
</script>

<div class="auth-layout">
  <div class="auth-container">
    <div class="auth-header">
      <h1>Spaced Repetition Trainer</h1>
      <p class="tagline">Master anything with intelligent spaced repetition</p>
    </div>

    <div class="auth-forms">
      {#if currentView === 'login'}
        <LoginForm 
          onSwitchToRegister={switchToRegister}
          onSwitchToForgotPassword={handleForgotPassword}
        />
      {:else}
        <RegisterForm 
          onSwitchToLogin={switchToLogin}
        />
      {/if}
    </div>

    <div class="auth-footer">
      <div class="features">
        <div class="feature">
          <span class="icon">🧠</span>
          <span>FSRS Algorithm</span>
        </div>
        <div class="feature">
          <span class="icon">📊</span>
          <span>Progress Tracking</span>
        </div>
        <div class="feature">
          <span class="icon">🎯</span>
          <span>Optimized Learning</span>
        </div>
      </div>
      
      <div class="status-info">
        {#if authStore.isLoading}
          <p>Connecting to PocketBase...</p>
        {:else}
          <p>Ready to get started!</p>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .auth-layout {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .auth-container {
    width: 100%;
    max-width: 480px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .auth-header {
    text-align: center;
    color: white;
    margin-bottom: 1rem;
  }

  .auth-header h1 {
    margin: 0 0 0.5rem 0;
    font-size: 2.5rem;
    font-weight: 700;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .tagline {
    margin: 0;
    font-size: 1.1rem;
    opacity: 0.9;
    font-weight: 300;
  }

  .auth-forms {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    padding: 0;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  :global(.auth-forms .login-form),
  :global(.auth-forms .register-form) {
    background: transparent;
    box-shadow: none;
    border-radius: 0;
  }

  .auth-footer {
    color: white;
    text-align: center;
  }

  .features {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }

  .feature {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    opacity: 0.9;
  }

  .feature .icon {
    font-size: 1.5rem;
    display: block;
  }

  .feature span:last-child {
    font-size: 0.9rem;
    font-weight: 500;
  }

  .status-info {
    margin-top: 1rem;
    opacity: 0.8;
  }

  .status-info p {
    margin: 0;
    font-size: 0.9rem;
  }

  /* Mobile responsiveness */
  @media (max-width: 640px) {
    .auth-layout {
      padding: 1rem;
    }

    .auth-header h1 {
      font-size: 2rem;
    }

    .tagline {
      font-size: 1rem;
    }

    .features {
      gap: 1rem;
    }

    .feature span:last-child {
      font-size: 0.8rem;
    }
  }

  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    .auth-layout {
      background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%);
    }
  }
</style>