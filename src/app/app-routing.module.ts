import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { ArticlePageComponent } from './article-page/article-page.component';

const routes: Routes = [
  { path:'', component: MainPageComponent },
  { path:'article/:id' , component: ArticlePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
