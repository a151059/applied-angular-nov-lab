import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { setEntities, withEntities } from '@ngrx/signals/entities';
import { Book, BooksPageSize, BooksState } from '../types';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap } from 'rxjs';
import { BooksService } from './books.service';
import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

export const BooksStore = signalStore(
  withDevtools('books'),
  withState<BooksState>({
    pageSize: 25,
    onPage: 1,
  }),
  withEntities<Book>(),
  withComputed((store) => {
    return {
      pages: computed(() => {
        const numberOfBooks = store.ids().length;
        const size = store.pageSize();
        let pages = numberOfBooks / size;
        if (Math.abs(pages) < pages) {
          pages += 1;
        }
        // need an array from 1 - pages

        return Array.from({ length: pages }, (_, i) => i + 1);
      }),
      currentPage: computed(() => {
        switch (store.pageSize()) {
          case 0:
            return store.entities();
          default: {
            let startAt: number;
            if (store.onPage() === 1) {
              startAt = 0;
            } else {
              startAt = (store.onPage() - 1) * store.pageSize();
            }

            return [...store.entities()].slice(
              startAt,
              startAt + store.pageSize(),
            );
          }
        }
      }),
    };
  }),

  withMethods((store) => {
    const service = inject(BooksService);
    return {
      setCurrentPage: (page: number) => patchState(store, { onPage: page }),
      setPageSize: (size: BooksPageSize) =>
        patchState(store, { pageSize: size }),
      _load: rxMethod<void>(
        switchMap(() =>
          service.getBooks().pipe(
            tapResponse({
              next(value) {
                patchState(store, setEntities(value));
              },
              error(error) {
                console.log(error);
              },
            }),
          ),
        ),
      ),
    };
  }),
  withHooks({
    onInit(store) {
      store._load();
    },
  }),
);
