import { deckService } from '../services/deckService'
import { authService } from '../services/authService'
import type { Deck } from '../types'

class DeckStore {
  decks = $state<Deck[]>([])
  selectedDeck = $state<Deck | null>(null)
  isLoading = $state(false)
  error = $state<string | null>(null)

  async loadDecks() {
    const userId = authService.getUserId()
    if (!userId) return

    this.isLoading = true
    this.error = null
    
    try {
      this.decks = await deckService.getDecks(userId)
    } catch (error) {
      this.error = error.message || 'Failed to load decks'
    } finally {
      this.isLoading = false
    }
  }

  async createDeck(name: string, description?: string) {
    const userId = authService.getUserId()
    if (!userId) throw new Error('Not authenticated')

    this.isLoading = true
    this.error = null

    try {
      const newDeck = await deckService.createDeck({ name, description, user: userId })
      this.decks = [newDeck, ...this.decks]
      return newDeck
    } catch (error) {
      this.error = error.message || 'Failed to create deck'
      throw error
    } finally {
      this.isLoading = false
    }
  }

  async updateDeck(id: string, data: { name?: string; description?: string }) {
    this.isLoading = true
    this.error = null

    try {
      const updatedDeck = await deckService.updateDeck(id, data)
      this.decks = this.decks.map(d => d.id === id ? updatedDeck : d)
      if (this.selectedDeck?.id === id) {
        this.selectedDeck = updatedDeck
      }
      return updatedDeck
    } catch (error) {
      this.error = error.message || 'Failed to update deck'
      throw error
    } finally {
      this.isLoading = false
    }
  }

  async deleteDeck(id: string) {
    this.isLoading = true
    this.error = null

    try {
      await deckService.deleteDeck(id)
      this.decks = this.decks.filter(d => d.id !== id)
      if (this.selectedDeck?.id === id) {
        this.selectedDeck = null
      }
    } catch (error) {
      this.error = error.message || 'Failed to delete deck'
      throw error
    } finally {
      this.isLoading = false
    }
  }

  selectDeck(deck: Deck | null) {
    this.selectedDeck = deck
  }

  clearError() {
    this.error = null
  }
}

export const deckStore = new DeckStore()