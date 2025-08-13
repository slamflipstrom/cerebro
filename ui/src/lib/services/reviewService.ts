import { pb } from '../pocketbase'
import type { Review } from '../types'

export class ReviewService {
  private collection = 'reviews'

  async createReview(data: {
    card: string
    user: string
    rating: number
    duration: number
  }): Promise<Review> {
    return await pb.collection(this.collection).create<Review>(data)
  }

  async getCardReviews(cardId: string): Promise<Review[]> {
    return await pb.collection(this.collection).getFullList<Review>({
      filter: `card = "${cardId}"`,
      sort: '-created'
    })
  }

  async getUserReviews(userId: string, limit = 100): Promise<Review[]> {
    return await pb.collection(this.collection).getList<Review>(1, limit, {
      filter: `user = "${userId}"`,
      sort: '-created'
    }).then(result => result.items)
  }

  async getReviewStats(userId: string, days = 30): Promise<{
    totalReviews: number
    averageRating: number
    reviewsPerDay: number
  }> {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)
    
    const reviews = await pb.collection(this.collection).getFullList<Review>({
      filter: `user = "${userId}" && created >= "${startDate.toISOString()}"`,
    })

    const totalReviews = reviews.length
    const averageRating = reviews.length > 0 
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length 
      : 0
    const reviewsPerDay = totalReviews / days

    return {
      totalReviews,
      averageRating: Math.round(averageRating * 100) / 100,
      reviewsPerDay: Math.round(reviewsPerDay * 100) / 100
    }
  }
}

export const reviewService = new ReviewService()