export type Book = {
    id: string;
    title: string;
    author: string;
    year: number;
  };

  export type BooksCentury = {
    century: string;
    count: number;
  };

  export type BooksPageSize = 5 | 10 | 25 | 50 | 0;
  
  export type BooksState = {
    pageSize: BooksPageSize;
    onPage: number;
  };