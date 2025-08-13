import { pb } from '../pocketbase'
import type { Card, CardSchedule } from '../types'

export class CardService {
  private collection = 'cards'
  private scheduleCollection = 'card_schedules'

  async getCards(deckId: string): Promise<Card[]> {
    return await pb.collection(this.collection).getFullList<Card>({
      filter: `deck = "${deckId}"`,
      sort: '-created'
    })
  }

  async getCard(id: string): Promise<Card> {
    return await pb.collection(this.collection).getOne<Card>(id)
  }

  async createCard(data: { deck: string; front: string; back: string; tags?: string[] }): Promise<Card> {
    const card = await pb.collection(this.collection).create<Card>(data)
    
    // Create initial schedule for new card
    await this.createInitialSchedule(card.id)
    
    return card
  }

  async updateCard(id: string, data: Partial<Pick<Card, 'front' | 'back' | 'tags'>>): Promise<Card> {
    return await pb.collection(this.collection).update<Card>(id, data)
  }

  async deleteCard(id: string): Promise<boolean> {
    await pb.collection(this.collection).delete(id)
    return true
  }

  async getCardSchedule(cardId: string): Promise<CardSchedule> {
    return await pb.collection(this.scheduleCollection).getFirstListItem<CardSchedule>(
      `card = "${cardId}"`
    )
  }

  async getDueCards(userId: string, limit = 50): Promise<Array<Card & { schedule: CardSchedule }>> {
    const now = new Date().toISOString()
    
    // Get cards that are due for review
    const schedules = await pb.collection(this.scheduleCollection).getList<CardSchedule>(1, limit, {
      filter: `due <= "${now}"`,
      sort: 'due',
      expand: 'card,card.deck'
    })

    return schedules.items.map(schedule => ({
      ...schedule.expand!.card,
      schedule
    }))
  }

  private async createInitialSchedule(cardId: string): Promise<CardSchedule> {
    const initialData = {
      card: cardId,
      due: new Date().toISOString(),
      stability: 0,
      difficulty: 5,
      elapsed_days: 0,
      scheduled_days: 0,
      reps: 0,
      lapses: 0,
      state: 'new' as const
    }

    return await pb.collection(this.scheduleCollection).create<CardSchedule>(initialData)
  }

  async updateCardSchedule(cardId: string, data: Partial<CardSchedule>): Promise<CardSchedule> {
    const schedule = await this.getCardSchedule(cardId)
    return await pb.collection(this.scheduleCollection).update<CardSchedule>(schedule.id, data)
  }
}

export const cardService = new CardService()