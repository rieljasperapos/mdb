export interface IBook {
  title: string;
  author: string;
  publishYear: number;
  [key: string]: any;
};

export const initialBooksInput = {
  title: "",
  author: "",
  description: "",
  publishYear: 0,
};

export interface BookParams {
  params: {
    title: string;
  }
};