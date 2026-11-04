import type { NewsService } from '../../../services/news/NewsService';

export class ListNewsUseCase {
  #news: NewsService;

  constructor(news: NewsService) {
    this.#news = news;
  }

  async execute() {
    return await this.#news.getAll();
  }
}
