import { FilterQuery, PipelineStage } from 'mongoose';

export class AggregationBuilder<T> {
  private query: PipelineStage[] = [];

  match(query: FilterQuery<T>) {
    this.query.push({ $match: query });
    return this;
  }

  lookup(from: string, localField: string, foreignField: string, as: string) {
    this.query.push({ $lookup: { from, localField, foreignField, as } });
    this.query.push({ $unwind: `$${as}` });
    return this;
  }

  addFields(query: FilterQuery<T>) {
    this.query.push({ $addFields: query });
    return this;
  }

  project(query: FilterQuery<T>) {
    this.query.push({ $project: query });
    return this;
  }

  group(query: FilterQuery<T>) {
    this.query.push({ $group: query });
    return this;
  }

  limit(limit: number) {
    this.query.push({ $limit: limit });
    return this;
  }

  sort(query: FilterQuery<T>) {
    this.query.push({ $sort: query });
    return this;
  }

  skip(skip: number) {
    this.query.push({ $skip: skip });
    return this;
  }

  addStage(stage: PipelineStage) {
    this.query.push(stage);
    return this;
  }

  build() {
    return this.query;
  }
}
