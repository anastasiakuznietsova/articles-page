import { Component, inject, OnInit, signal } from '@angular/core';
import { ArticleService } from '../shared/article.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { Article } from '../shared/article.interface';

@Component({
  standalone:false,
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit{
  private service = inject(ArticleService)
  private activatedRoute = inject(ActivatedRoute);

  articleDef: Article = {
    id: 0,
    title: '',
    authors: [],
    url: '',
    image_url: '',
    news_site: '',
    summary: '',
    published_at: new Date,
    updated_at: new Date,
    featured: false,
    launches: [],
    events: []
  }

  articleId = signal<number>(0);
  article = signal<Article>(this.articleDef);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if(params['id']){
        this.articleId.set(params['id']);
      }
    });
    

    //For simply text and description display I could have just used Input, but if user wants to redirect using url, 
    // it would be better to add this service here.
    
    this.service.loadArticleById(this.articleId()).pipe(take(1)).subscribe({
      next: (resData:Article)=>{
        this.article.set(resData);
      },
      error: (error)=>{
        console.log(error);
      }
    });
  }
}
