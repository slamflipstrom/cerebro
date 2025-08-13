<script lang="ts">
  import { onMount } from 'svelte'
  import { authStore } from './lib/stores/auth.svelte'
  import DeckManager from './lib/components/DeckManager.svelte'
  import AuthLayout from './lib/components/AuthLayout.svelte'

  onMount(() => {
    authStore.init()
  })
</script>

{#if authStore.isLoading}
  <div class="loading">
    <h1>Spaced Repetition Trainer</h1>
    <p>Loading...</p>
  </div>
{:else if !authStore.isAuthenticated}
  <AuthLayout />
{:else}
  <DeckManager />
{/if}

<style>
  .loading {
    padding: 2rem;
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  .loading h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 3rem;
    font-weight: 100;
    margin-bottom: 1rem;
  }
</style>