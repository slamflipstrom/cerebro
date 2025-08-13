import { pb } from '../pocketbase'
import type { Deck } from '../types'

export class DeckService {
  private collection = 'decks'

  async getDecks(userId: string): Promise<Deck[]> {
    return await pb.collection(this.collection).getFullList<Deck>({
      filter: `user = "${userId}"`,
      sort: '-created'
    })
  }

  async getDeck(id: string): Promise<Deck> {
    return await pb.collection(this.collection).getOne<Deck>(id)
  }

  async createDeck(data: { name: string; description?: string; user: string }): Promise<Deck> {
    return await pb.collection(this.collection).create<Deck>(data)
  }

  async updateDeck(id: string, data: Partial<Pick<Deck, 'name' | 'description'>>): Promise<Deck> {
    return await pb.collection(this.collection).update<Deck>(id, data)
  }

  async deleteDeck(id: string): Promise<boolean> {
    await pb.collection(this.collection).delete(id)
    return true
  }
}

export const deckService = new DeckService()