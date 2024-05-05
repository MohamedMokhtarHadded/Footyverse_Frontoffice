import { Component } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {

  articles: any[] = [];
  constructor(
    private newService: NewsService
  ) { }

  imageUrls: string[] = [
    'assets/images/blog/img-14.jpg',
    'assets/images/blog/img-15.jpg',
    'assets/images/blog/img-16.jpg'
  ];

  getRandomImageUrl(): string {
    const randomIndex = Math.floor(Math.random() * this.imageUrls.length);
    return this.imageUrls[randomIndex];
  }

  ngOnInit() {
    this.newService.getSportsHeadlines().subscribe(
      (data: any) => {
        console.log('News:', data);
        this.articles = data.articles;
        console.log('Articles:', this.articles);
      }
    );
  }

}
