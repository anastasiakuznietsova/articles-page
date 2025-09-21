import { inject, Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Article, PageableArticle } from "./article.interface";

@Injectable({providedIn: 'root'})
export class ArticleService{
    private http = inject(HttpClient);
    private baseUrl = 'https://api.spaceflightnewsapi.net/v4';

    loadArticles(){
        return this.http.get<PageableArticle>(`${this.baseUrl}/articles/`);
    }
    loadFiltered(keyword: string){
        return this.http.get<PageableArticle>(`${this.baseUrl}/articles/?search=${keyword}`);
    }

    loadArticleById(id:number){
        return this.http.get<Article>(`${this.baseUrl}/articles/${id}`);
    }
}