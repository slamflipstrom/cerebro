<script lang="ts">
  import { authStore } from '../stores/auth.svelte'

  interface Props {
    onSwitchToLogin?: () => void
  }

  let { onSwitchToLogin }: Props = $props()

  let email = $state('')
  let username = $state('')
  let password = $state('')
  let passwordConfirm = $state('')
  let isSubmitting = $state(false)
  let error = $state<string | null>(null)
  let success = $state(false)

  function validateForm() {
    if (!email.trim()) {
      error = 'Email is required'
      return false
    }
    
    if (!email.includes('@')) {
      error = 'Please enter a valid email address'
      return false
    }
    
    if (!username.trim()) {
      error = 'Username is required'
      return false
    }
    
    if (username.trim().length < 3) {
      error = 'Username must be at least 3 characters'
      return false
    }
    
    if (!/^[a-zA-Z0-9_]+$/.test(username.trim())) {
      error = 'Username can only contain letters, numbers, and underscores'
      return false
    }
    
    if (!password) {
      error = 'Password is required'
      return false
    }
    
    if (password.length < 8) {
      error = 'Password must be at least 8 characters'
      return false
    }
    
    if (password !== passwordConfirm) {
      error = 'Passwords do not match'
      return false
    }
    
    return true
  }

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    
    if (!validateForm()) return
    
    isSubmitting = true
    error = null
    success = false
    
    try {
      const result = await authStore.register(
        email.trim(),
        password,
        passwordConfirm,
        username.trim()
      )
      
      if (result.success) {
        success = true
        // Clear form
        email = ''
        username = ''
        password = ''
        passwordConfirm = ''
      } else {
        error = result.error || 'Registration failed'
      }
    } catch (err) {
      error = 'An unexpected error occurred'
      console.error('Registration error:', err)
    } finally {
      isSubmitting = false
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault()
      const form = event.target?.closest('form')
      if (form) {
        const submitEvent = new SubmitEvent('submit', { bubbles: true, cancelable: true })
        handleSubmit(submitEvent)
      }
    }
  }

  // Auto-generate username from email
  function updateUsernameFromEmail() {
    if (!username && email.includes('@')) {
      username = email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '_')
    }
  }
</script>

<form class="register-form" onsubmit={handleSubmit}>
  <div class="form-header">
    <h2>Create Account</h2>
    <p>Join us to start your spaced repetition journey!</p>
  </div>

  {#if success}
    <div class="success-banner">
      <h3>Account created successfully!</h3>
      <p>You have been automatically signed in. Welcome to Spaced Repetition Trainer!</p>
    </div>
  {/if}

  {#if error}
    <div class="error-banner">
      {error}
    </div>
  {/if}

  <div class="form-group">
    <label for="email">Email Address</label>
    <input
      id="email"
      type="email"
      bind:value={email}
      placeholder="Enter your email..."
      onkeydown={handleKeydown}
      onblur={updateUsernameFromEmail}
      disabled={isSubmitting}
      required
    />
  </div>

  <div class="form-group">
    <label for="username">Username</label>
    <input
      id="username"
      type="text"
      bind:value={username}
      placeholder="Choose a username..."
      onkeydown={handleKeydown}
      disabled={isSubmitting}
      required
    />
    <span class="field-hint">3+ characters, letters, numbers, and underscores only</span>
  </div>

  <div class="form-group">
    <label for="password">Password</label>
    <input
      id="password"
      type="password"
      bind:value={password}
      placeholder="Create a password..."
      onkeydown={handleKeydown}
      disabled={isSubmitting}
      required
    />
    <span class="field-hint">Minimum 8 characters</span>
  </div>

  <div class="form-group">
    <label for="password-confirm">Confirm Password</label>
    <input
      id="password-confirm"
      type="password"
      bind:value={passwordConfirm}
      placeholder="Confirm your password..."
      onkeydown={handleKeydown}
      disabled={isSubmitting}
      required
    />
  </div>

  <button
    type="submit"
    class="btn btn-primary submit-btn"
    disabled={isSubmitting || !email.trim() || !username.trim() || !password || !passwordConfirm}
  >
    {isSubmitting ? 'Creating Account...' : 'Create Account'}
  </button>

  {#if onSwitchToLogin}
    <div class="form-links">
      <p class="switch-form">
        Already have an account? 
        <button
          type="button"
          class="link-btn"
          onclick={onSwitchToLogin}
          disabled={isSubmitting}
        >
          Sign in
        </button>
      </p>
    </div>
  {/if}

  <div class="form-shortcuts">
    <span>Tip: Press Cmd/Ctrl + Enter to create account</span>
  </div>
</form>

<style>
  .register-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  .form-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .form-header h2 {
    margin: 0 0 0.5rem 0;
    color: #333;
    font-size: 1.75rem;
    font-weight: 600;
  }

  .form-header p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
  }

  .success-banner {
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    color: #166534;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .success-banner h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
    font-weight: 600;
  }

  .success-banner p {
    margin: 0;
    font-size: 0.9rem;
  }

  .error-banner {
    background: #fef2f2;
    border: 1px solid #fecaca;
    color: #dc2626;
    padding: 0.75rem 1rem;
    border-radius: 6px;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #374151;
    font-size: 0.9rem;
  }

  input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.2s;
    box-sizing: border-box;
  }

  input:focus {
    outline: none;
    border-color: #ff3e00;
    box-shadow: 0 0 0 3px rgba(255, 62, 0, 0.1);
  }

  input:disabled {
    background: #f9fafb;
    cursor: not-allowed;
    opacity: 0.6;
  }

  .field-hint {
    display: block;
    margin-top: 0.25rem;
    font-size: 0.8rem;
    color: #6b7280;
  }

  .btn {
    padding: 0.875rem 1.5rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    transition: all 0.2s;
    text-align: center;
  }

  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .btn-primary {
    background: #ff3e00;
    color: white;
  }

  .btn-primary:hover:not(:disabled) {
    background: #e63900;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(255, 62, 0, 0.3);
  }

  .submit-btn {
    width: 100%;
    margin-bottom: 1.5rem;
  }

  .form-links {
    text-align: center;
  }

  .link-btn {
    background: none;
    border: none;
    color: #ff3e00;
    cursor: pointer;
    font-size: 0.9rem;
    text-decoration: none;
    padding: 0;
    margin: 0;
  }

  .link-btn:hover:not(:disabled) {
    text-decoration: underline;
  }

  .link-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .switch-form {
    margin: 0;
    color: #6b7280;
    font-size: 0.9rem;
  }

  .form-shortcuts {
    margin-top: 1.5rem;
    text-align: center;
  }

  .form-shortcuts span {
    color: #9ca3af;
    font-size: 0.8rem;
  }
</style>