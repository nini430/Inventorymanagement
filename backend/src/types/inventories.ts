export interface QueryType {
  limit: string;
  page: string;
  filter: string;
  sort: string;
  sortDir: string;
}

export interface BodyType {
  name_en: string;
  name_ka: string;
  location: string;
  price: number;
}
