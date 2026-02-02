import { FilterQuery, QueryOptions } from 'mongoose';

export class QueryBuilder<T> {
  private query: QueryOptions<T> = {};

  where<K extends keyof T>(field: K, value: T[K]) {
    (this.query as FilterQuery<T>)[field] = value;
    return this;
  }

  in<K extends keyof T>(field: K, values: T[K][]) {
    (this.query as FilterQuery<T>)[field] = {
      $in: values,
    } as FilterQuery<T>[K];
    return this;
  }

  range<K extends keyof T>(field: K, from: T[K], to: T[K]) {
    (this.query as FilterQuery<T>)[field] = {
      $gte: from,
      $lte: to,
    } as FilterQuery<T>[K];
    return this;
  }

  sort<K extends keyof T>(field: K, order: 'asc' | 'desc' = 'asc') {
    (this.query as QueryOptions<T>).sort = {
      [field]: order === 'asc' ? 1 : -1,
    };
    return this;
  }

  limit(limit: number) {
    this.query.limit = limit;
    return this;
  }

  skip(skip: number) {
    this.query.skip = skip;
    return this;
  }

  select<K extends keyof T>(fields: K[]) {
    this.query.select = fields.join(' ') as FilterQuery<T>['select'];
    return this;
  }

  build() {
    return this.query;
  }
}
