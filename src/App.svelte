<script lang="ts">
  // This will be our main app component
  let title = 'Spaced Repetition Trainer'
</script>

<main>
  <h1>{title}</h1>
  <p>Building your FSRS-powered spaced repetition trainer!</p>
  
  <div class="status">
    <p>🚀 Svelte SPA + PocketBase ready to go</p>
  </div>
</main>

<style>
  main {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 100;
  }
  
  .status {
    margin-top: 2rem;
    padding: 1rem;
    background: #f0f8ff;
    border-radius: 8px;
    border-left: 4px solid #ff3e00;
  }
</style>