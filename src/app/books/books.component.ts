import { Component, ChangeDetectionStrategy } from '@angular/core';
import { inject, Injectable } from '@angular/core';
import { BooksTableComponent } from './components/books-table.component';
import { BooksStore } from './services/books.store';

@Component({
  selector: 'app-books',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BooksTableComponent],
  template: `
    <div class="flex-auto gap-8">
      <div class="col-span-1">
        <app-books-table [books]="store.currentPage()" />
      </div>
    </div>
  `,
  styles: ``,
})
@Injectable()
export class BooksComponent {
  store = inject(BooksStore);
}
