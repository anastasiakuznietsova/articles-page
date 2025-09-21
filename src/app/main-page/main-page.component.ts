import { Component, inject, OnInit, signal } from '@angular/core';
import { ArticleService } from '../shared/article.service';
import { take } from 'rxjs';
import { Article, PageableArticle } from '../shared/article.interface';

@Component({
  standalone:false,
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  private service = inject(ArticleService);
  resNumber = signal<number>(0);
  articles = signal<Article[]>([]);
  keywords = '';

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles(){
    this.service.loadArticles().pipe(take(1)).subscribe({
      next: (resData:PageableArticle)=>{
        this.articles.set(resData.results);
        this.resNumber.set(this.articles().length);
      },
      error: (error)=>{
        console.log(error);
      }
    });
  }

  getFilteredCards(){
    setTimeout(() => {
      this.service.loadFiltered(this.keywords).pipe(take(1)).subscribe({
        next: (resData:PageableArticle)=>{
          this.articles.set(resData.results);
          this.resNumber.set(this.articles().length);
        },
        error: (error)=>{
          console.log(error);
        }
      });
    }, 300);
  }
}
