import { Component, inject, Input } from '@angular/core';
import { Article } from '../shared/article.interface';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  standalone:false,
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent {
  @Input() article!: Article;
  @Input() keywords: string = '';
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);

  onArticleClick(){
    this.router.navigate(['article/', this.article.id]);
  }

  highlightKeywords(text: string) {
    if (!this.keywords || this.keywords.trim() === '') {
      return text;
    }
    const keywordArray = this.keywords.trim().split(/\s+/).filter(keyword => keyword.length > 0);    
    if (keywordArray.length === 0) {
      return text;
    }
    const pattern = keywordArray.map(keyword => keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
    const regex = new RegExp(`(${pattern})`, 'gi');
    
    const highlightedText = text.replace(regex, '<span class="highlight">$1</span>');
    return this.sanitizer.bypassSecurityTrustHtml(highlightedText);
  }

  getTruncatedSummary() {
    const truncated = this.article.summary.length > 100 
      ? this.article.summary.slice(0, 100) + '...'
      : this.article.summary;
    
    return this.highlightKeywords(truncated);
  }
}
