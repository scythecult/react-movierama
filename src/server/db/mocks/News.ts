import type { NewsData } from '../../../client/entities/news';

export class MockNewsDb {
  #news: NewsData[] = [];
  constructor(news: NewsData[]) {
    this.#news = news;
  }

  async findMany() {
    return this.#news;
  }

  async findUnique(id: number) {
    return this.#news.find((item) => item.id === id);
  }

  async create(news: NewsData) {
    return this.#news.push(news);
  }

  async update() {
    return this.#news;
  }
}
