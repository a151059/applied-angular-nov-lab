import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Book } from '../types';

@Component({
  selector: 'app-books-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="card rounded-xl shadow-xl bg-base-200 mt-4 mb-10">
      <div class="card-body shadow-lg">
        <h3 class="card-title font-semibold text-2xl">Books</h3>
        <div class="overflow-x-auto">
          <table
            class="table table-zebra table-sm table-pin-cols"
            data-theme="dim"
          >
            <caption class="caption-bottom pt-2 italic">
              Table 1.1: Book titles, authors, and year of publication.
            </caption>
            <!-- head -->
            <thead class="bg-primary">
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Author</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              <!-- row 1 -->
              @for (book of books(); track book.id) {
                <tr class="hover">
                  <th>{{ book.id }}</th>
                  <td>{{ book.author }}</td>
                  <td>{{ book.title }}</td>
                  <td>{{ book.year }}</td>
                </tr>
              }
              <!-- row 2 -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class BooksTableComponent {
  books = input.required<Book[]>();
}
