<script lang="ts">
  import { onMount } from 'svelte'
  import { deckStore } from '../stores/deck.svelte'
  import DeckList from './DeckList.svelte'
  import DeckForm from './DeckForm.svelte'
  import type { Deck } from '../types'

  let currentView = $state<'list' | 'create' | 'edit'>('list')
  let editingDeck = $state<Deck | null>(null)

  onMount(() => {
    deckStore.loadDecks()
  })

  function showCreateForm() {
    currentView = 'create'
    editingDeck = null
  }

  function showEditForm(deck: Deck) {
    currentView = 'edit'
    editingDeck = deck
  }

  function handleDeckSaved(deck: Deck) {
    currentView = 'list'
    editingDeck = null
    deckStore.selectDeck(deck)
  }

  function handleCancel() {
    currentView = 'list'
    editingDeck = null
  }

  function handleSelectDeck(deck: Deck) {
    deckStore.selectDeck(deck)
    // Here you would typically navigate to the study view
    console.log('Selected deck for study:', deck.name)
  }
</script>

<div class="deck-manager">
  {#if currentView === 'list'}
    <DeckList 
      {showCreateForm}
      {showEditForm}
      {handleSelectDeck}
    />
  {:else if currentView === 'create'}
    <div class="form-container">
      <DeckForm 
        {handleDeckSaved}
        {handleCancel}
      />
    </div>
  {:else if currentView === 'edit' && editingDeck}
    <div class="form-container">
      <DeckForm 
        deck={editingDeck}
        {handleDeckSaved}
        {handleCancel}
      />
    </div>
  {/if}
</div>

<style>
  .deck-manager {
    min-height: 100vh;
    background: #f8f9fa;
  }

  .form-container {
    padding: 2rem;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8f9fa;
  }
</style>