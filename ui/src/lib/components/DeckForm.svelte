<script lang="ts">
  import { deckStore } from '../stores/deck.svelte'
  import type { Deck } from '../types'

  interface Props {
    deck?: Deck
    handleDeckSaved?: (deck: Deck) => void
    handleCancel?: () => void
  }

  let { deck, handleDeckSaved, handleCancel }: Props = $props()

  let name = $state(deck?.name || '')
  let description = $state(deck?.description || '')
  let isSubmitting = $state(false)
  let errors = $state<{ name?: string; general?: string }>({})

  const isEditing = !!deck

  function validateForm() {
    errors = {}
    
    if (!name.trim()) {
      errors.name = 'Deck name is required'
    } else if (name.trim().length < 2) {
      errors.name = 'Deck name must be at least 2 characters'
    } else if (name.trim().length > 100) {
      errors.name = 'Deck name must be less than 100 characters'
    }

    if (description && description.length > 500) {
      errors.general = 'Description must be less than 500 characters'
    }

    return Object.keys(errors).length === 0
  }

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    if (!validateForm()) return

    isSubmitting = true
    errors = {}

    try {
      const trimmedName = name.trim()
      const trimmedDescription = description.trim() || undefined

      let savedDeck: Deck

      if (isEditing) {
        savedDeck = await deckStore.updateDeck(deck.id, {
          name: trimmedName,
          description: trimmedDescription
        })
      } else {
        savedDeck = await deckStore.createDeck(trimmedName, trimmedDescription)
      }

      handleDeckSaved?.(savedDeck)
      
      // Reset form if creating new deck
      if (!isEditing) {
        name = ''
        description = ''
      }
    } catch (error) {
      errors.general = error.message || `Failed to ${isEditing ? 'update' : 'create'} deck`
    } finally {
      isSubmitting = false
    }
  }

  function onCancel() {
    // Reset form to original values
    name = deck?.name || ''
    description = deck?.description || ''
    errors = {}
    handleCancel?.()
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault()
      const form = event.target?.closest('form')
      if (form) {
        const submitEvent = new SubmitEvent('submit', { bubbles: true, cancelable: true })
        handleSubmit(submitEvent)
      }
    } else if (event.key === 'Escape') {
      event.preventDefault()
      onCancel()
    }
  }
</script>

<form class="deck-form" onsubmit={handleSubmit}>
  <div class="form-header">
    <h2>{isEditing ? 'Edit Deck' : 'Create New Deck'}</h2>
  </div>

  {#if errors.general}
    <div class="error-banner">
      {errors.general}
    </div>
  {/if}

  <div class="form-group">
    <label for="deck-name">Deck Name *</label>
    <input
      id="deck-name"
      type="text"
      bind:value={name}
      placeholder="Enter deck name..."
      class:error={errors.name}
      onkeydown={handleKeydown}
      disabled={isSubmitting}
      required
    />
    {#if errors.name}
      <span class="error-text">{errors.name}</span>
    {/if}
  </div>

  <div class="form-group">
    <label for="deck-description">Description</label>
    <textarea
      id="deck-description"
      bind:value={description}
      placeholder="Enter deck description (optional)..."
      rows="3"
      onkeydown={handleKeydown}
      disabled={isSubmitting}
    ></textarea>
    <span class="char-count">
      {description.length}/500 characters
    </span>
  </div>

  <div class="form-actions">
    <button
      type="button"
      class="btn btn-secondary"
      onclick={onCancel}
      disabled={isSubmitting}
    >
      Cancel
    </button>
    <button
      type="submit"
      class="btn btn-primary"
      disabled={isSubmitting || !name.trim()}
    >
      {#if isSubmitting}
        {isEditing ? 'Updating...' : 'Creating...'}
      {:else}
        {isEditing ? 'Update Deck' : 'Create Deck'}
      {/if}
    </button>
  </div>

  <div class="form-shortcuts">
    <span>Shortcuts: Cmd/Ctrl + Enter to save, Esc to cancel</span>
  </div>
</form>

<style>
  .deck-form {
    max-width: 500px;
    margin: 0 auto;
    padding: 2rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .form-header h2 {
    margin: 0 0 1.5rem 0;
    color: #333;
    text-align: center;
  }

  .error-banner {
    background: #ffebee;
    border: 1px solid #f44336;
    color: #c62828;
    padding: 0.75rem;
    border-radius: 4px;
    margin-bottom: 1rem;
    text-align: center;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #333;
  }

  input, textarea {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e0e0e0;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.2s;
    box-sizing: border-box;
  }

  input:focus, textarea:focus {
    outline: none;
    border-color: #ff3e00;
  }

  input.error, textarea.error {
    border-color: #f44336;
  }

  input:disabled, textarea:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
  }

  textarea {
    resize: vertical;
    min-height: 80px;
    font-family: inherit;
  }

  .error-text {
    color: #f44336;
    font-size: 0.85rem;
    margin-top: 0.25rem;
    display: block;
  }

  .char-count {
    color: #666;
    font-size: 0.85rem;
    margin-top: 0.25rem;
    display: block;
    text-align: right;
  }

  .form-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    margin-top: 2rem;
  }

  .btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.2s;
    min-width: 120px;
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
  }

  .btn-secondary {
    background: #f5f5f5;
    color: #666;
    border: 1px solid #ddd;
  }

  .btn-secondary:hover:not(:disabled) {
    background: #e9e9e9;
  }

  .form-shortcuts {
    margin-top: 1rem;
    text-align: center;
  }

  .form-shortcuts span {
    color: #999;
    font-size: 0.8rem;
  }
</style>