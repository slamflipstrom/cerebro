<script lang="ts">
  import { deckStore } from '../stores/deck.svelte'
  import type { Deck } from '../types'

  interface Props {
    showCreateForm?: () => void
    showEditForm?: (deck: Deck) => void
    handleSelectDeck?: (deck: Deck) => void
  }

  let { showCreateForm, showEditForm, handleSelectDeck }: Props = $props()

  let showDeleteConfirm = $state<string | null>(null)

  async function handleDelete(deck: Deck) {
    if (showDeleteConfirm === deck.id) {
      try {
        await deckStore.deleteDeck(deck.id)
        showDeleteConfirm = null
      } catch (error) {
        console.error('Failed to delete deck:', error)
      }
    } else {
      showDeleteConfirm = deck.id
    }
  }

  function cancelDelete() {
    showDeleteConfirm = null
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString()
  }
</script>

<div class="deck-list">
  <div class="header">
    <h2>Your Decks</h2>
    <button class="btn btn-primary" onclick={showCreateForm}>
      + Create Deck
    </button>
  </div>

  {#if deckStore.error}
    <div class="error">
      <p>{deckStore.error}</p>
      <button onclick={() => deckStore.clearError()}>Dismiss</button>
    </div>
  {/if}

  {#if deckStore.isLoading}
    <div class="loading">Loading decks...</div>
  {:else if deckStore.decks.length === 0}
    <div class="empty-state">
      <p>No decks yet. Create your first deck to get started!</p>
      <button class="btn btn-primary" onclick={showCreateForm}>
        Create Your First Deck
      </button>
    </div>
  {:else}
    <div class="deck-grid">
      {#each deckStore.decks as deck (deck.id)}
        <div class="deck-card" class:selected={deckStore.selectedDeck?.id === deck.id}>
          <div class="deck-header">
            <h3>{deck.name}</h3>
            <div class="deck-actions">
              <button 
                class="btn-icon" 
                onclick={() => showEditForm?.(deck)}
                title="Edit deck"
              >
                ✏️
              </button>
              <button 
                class="btn-icon btn-danger" 
                onclick={() => handleDelete(deck)}
                title="Delete deck"
              >
                {showDeleteConfirm === deck.id ? '✓' : '🗑️'}
              </button>
              {#if showDeleteConfirm === deck.id}
                <button 
                  class="btn-icon" 
                  onclick={cancelDelete}
                  title="Cancel"
                >
                  ✕
                </button>
              {/if}
            </div>
          </div>
          
          {#if deck.description}
            <p class="description">{deck.description}</p>
          {/if}
          
          <div class="deck-meta">
            <span class="created">Created {formatDate(deck.created)}</span>
          </div>
          
          <button 
            class="btn btn-outline study-btn"
            onclick={() => handleSelectDeck?.(deck)}
          >
            Study Deck
          </button>
          
          {#if showDeleteConfirm === deck.id}
            <div class="delete-confirm">
              <p>Delete "{deck.name}"? This cannot be undone.</p>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .deck-list {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .header h2 {
    margin: 0;
    color: #333;
  }

  .btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s;
  }

  .btn-primary {
    background: #ff3e00;
    color: white;
  }

  .btn-primary:hover {
    background: #e63900;
  }

  .btn-outline {
    background: transparent;
    border: 2px solid #ff3e00;
    color: #ff3e00;
  }

  .btn-outline:hover {
    background: #ff3e00;
    color: white;
  }

  .btn-icon {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.25rem;
    font-size: 1rem;
    border-radius: 4px;
  }

  .btn-icon:hover {
    background: #f0f0f0;
  }

  .btn-danger:hover {
    background: #ffebee;
  }

  .error {
    background: #ffebee;
    border: 1px solid #f44336;
    color: #c62828;
    padding: 1rem;
    border-radius: 6px;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .loading {
    text-align: center;
    padding: 2rem;
    color: #666;
  }

  .empty-state {
    text-align: center;
    padding: 3rem;
    color: #666;
  }

  .empty-state p {
    margin-bottom: 1rem;
  }

  .deck-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .deck-card {
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    padding: 1.5rem;
    background: white;
    transition: all 0.2s;
    position: relative;
  }

  .deck-card:hover {
    border-color: #ff3e00;
    box-shadow: 0 4px 12px rgba(255, 62, 0, 0.1);
  }

  .deck-card.selected {
    border-color: #ff3e00;
    background: #fff5f5;
  }

  .deck-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
  }

  .deck-header h3 {
    margin: 0;
    color: #333;
    font-size: 1.25rem;
  }

  .deck-actions {
    display: flex;
    gap: 0.5rem;
  }

  .description {
    color: #666;
    margin-bottom: 1rem;
    line-height: 1.5;
  }

  .deck-meta {
    margin-bottom: 1rem;
    color: #999;
    font-size: 0.85rem;
  }

  .study-btn {
    width: 100%;
  }

  .delete-confirm {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(244, 67, 54, 0.95);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    padding: 1rem;
    text-align: center;
  }

  .delete-confirm p {
    margin: 0;
    font-weight: 500;
  }
</style>