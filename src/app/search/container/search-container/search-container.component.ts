import { Component } from '@angular/core';
import { SearchService } from 'src/app/shared/services/search.service';
import { Video } from 'src/app/shared/models/search.interface';

@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.scss']
})
export class SearchContainerComponent {

  inputTouched = false;
  loading = false;
  videos: Video[] = [];
  sortBy: 'name' | 'author' | 'date' = 'name';
  currentQuery: string = ''

  constructor(private searchService: SearchService) { }

  handleSearch(query: string) {

    if (query.trim() === '') {
      // Якщо користувач ввів лише пробіли, то просто завершуємо обробку
      return;
    }
    
    if (query.length >= 1) {
      this.loading = true;
      this.searchService.getVideos(query)
        .subscribe((items: any) => {
          this.videos = items.map((item: any) => {
            return {
              title: item.snippet.title,
              videoId: item.id.videoId,
              videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
              channelId: item.snippet.channelId,
              channelUrl: `https://www.youtube.com/channel/${item.snippet.channelId}`,
              channelTitle: item.snippet.channelTitle,
              description: item.snippet.description,
              publishedAt: new Date(item.snippet.publishedAt),
              thumbnail: item.snippet.thumbnails.high.url
            };
          });
          this.sortVideos();
          this.inputTouched = true;
          this.loading = false;
        });
    } else {
      this.inputTouched = false;
      this.videos = [];
    }
  }

  sortVideos() { // функція сортування відповідно до обраного користувачем параметру
    if (this.sortBy === 'name') {
      this.videos.sort((a, b) => a.title.localeCompare(b.title));
    } else if (this.sortBy === 'author') {
      this.videos.sort((a, b) => a.channelTitle.localeCompare(b.channelTitle));
    } else if (this.sortBy === 'date') {
      this.videos.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
    }
  }
}

