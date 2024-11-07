import { Routes } from '@angular/router';
import { BooksComponent } from './books.component';
import { BooksService } from './services/books.service';
import { BooksStore } from './services/books.store';

export const BOOKS_ROUTES: Routes = [
  {
    path: '',
    component: BooksComponent,
    providers: [BooksService, BooksStore],
    children: [],
  },
];