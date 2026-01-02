import type { NewsItem } from '../../../common/types/news';

export class MockNewsDb {
  #news: NewsItem[] = [];
  constructor(news: NewsItem[]) {
    this.#news = news;
  }

  async findMany() {
    return this.#news;
  }

  async findUnique(id: number) {
    return this.#news.find((item) => item.id === id);
  }

  async create(news: NewsItem) {
    return this.#news.push(news);
  }

  async update() {
    return this.#news;
  }
}
