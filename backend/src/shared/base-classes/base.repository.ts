import { DeleteResult, Model, PipelineStage, QueryOptions } from 'mongoose';

export class BaseRepository<T> {
  constructor(private readonly model: Model<T>) {}

  /**
   * Create a new document in the database
   * @param entity - The document to create
   * @returns The created document
   */
  async create(entity: Partial<T>): Promise<T> {
    const createdDocument = new this.model(entity);
    return createdDocument.save() as Promise<T>;
  }

  /**
   * Find all documents in the database
   * @returns An array of documents
   */
  async findAll(): Promise<T[]> {
    return this.model.find().exec();
  }

  /**
   * Find documents by an aggregation pipeline
   * @param pipeline - The aggregation pipeline to use
   * @returns An array of documents
   */
  async findByAggregate(pipeline: PipelineStage[]): Promise<T[]> {
    return this.model.aggregate(pipeline).exec();
  }

  /**
   * Find documents by a query
   * @param query - The query to use
   * @returns An array of documents
   */
  async findByQuery(query: QueryOptions<T>): Promise<T[]> {
    return this.model.find(query).exec();
  }

  /**
   * Find a single document in the database
   * @param filter - The filter to use
   * @returns The found document or null if not found
   */
  async findOne(filter: Partial<T>): Promise<T | null> {
    return this.model.findOne(filter).exec();
  }

  /**
   * Find a single document by its ID
   * @param id - The ID of the document to find
   * @returns The found document or null if not found
   */
  async findById(id: string) {
    return this.model.findById(id).exec();
  }

  /**
   * Update a document in the database
   * @param id - The ID of the document to update
   * @param entity - The new data to update the document with
   * @returns The updated document or null if not found
   */
  async findByIdAndUpdate(id: string, entity: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, entity, { new: true, runValidators: true }).exec();
  }

  /**
   * Update a document in the database
   * @param filter - The filter to use
   * @param entity - The new data to update the document with
   * @returns The updated document or null if not found
   */
  async updateOne(filter: Partial<T>, entity: Partial<T>): Promise<T | null> {
    return this.model.findOneAndUpdate(filter, entity, { new: true, runValidators: true }).exec();
  }

  /**
   * Delete a document from the database
   * @param id - The ID of the document to delete
   * @returns The deleted document or null if not found
   */
  async findByIdAndDelete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }

  /**
   * Delete a document from the database
   * @param filter - The filter to use
   * @returns The deleted document or null if not found
   */
  async deleteOne(filter: Partial<T>): Promise<T | null> {
    return this.model.findOneAndDelete(filter).exec();
  }

  /**
   * Delete multiple documents from the database
   * @param filter - The filter to use
   * @returns The deleted documents
   */
  async deleteMany(filter: Partial<T>): Promise<DeleteResult> {
    return this.model.deleteMany(filter).exec();
  }

  /**
   * Count the number of documents in the database
   * @param filter - The filter to use
   * @returns The number of documents
   */
  async count(filter: PipelineStage[]): Promise<number> {
    filter.push({ $count: 'count' });
    const result = await this.model.aggregate(filter).exec();
    return result?.[0]?.count ?? 0;
  }
}
