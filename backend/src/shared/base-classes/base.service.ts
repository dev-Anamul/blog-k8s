import { NotFoundException } from '@nestjs/common';
import { BaseRepository } from './base.repository';

export class BaseService<T, CreateDto, UpdateDto, Repository extends BaseRepository<T>> {
  constructor(private readonly repository: Repository) {}

  /**
   * Create a new document in the database
   * @param createDto - The data to create the document with
   * @returns The created document
   */
  async create(createDto: CreateDto): Promise<T> {
    return this.repository.create(createDto as unknown as T);
  }

  /**
   * Find all documents in the database
   * @returns An array of documents
   */
  async findAll(): Promise<T[]> {
    return this.repository.findAll();
  }

  /**
   * Find a single document in the database
   * @param filter - The filter to use
   * @returns The found document or null if not found
   */
  async findOneById(id: string): Promise<T | null> {
    const resultDoc = await this.repository.findById(id);
    if (!resultDoc) throw new NotFoundException('Document not found');
    return resultDoc;
  }

  /**
   * Find a single document in the database
   * @param filter - The filter to use
   * @returns The found document or null if not found
   */
  async findOne(filter: Partial<T>): Promise<T | null> {
    const resultDoc = await this.repository.findOne(filter);
    if (!resultDoc) throw new NotFoundException('Document not found');
    return resultDoc;
  }

  /**
   * Update a document in the database
   * @param id - The ID of the document to update
   * @param updateDto - The new data to update the document with
   * @returns The updated document or null if not found
   */
  async updateOneById(id: string, updateDto: UpdateDto): Promise<T | null> {
    // get the document
    const resultDoc = await this.repository.findById(id);

    // check if the document exists
    if (!resultDoc) throw new NotFoundException('Document not found');

    // update the document
    Object.assign(resultDoc, updateDto);

    // save the document
    await resultDoc.save();

    // return the document
    return resultDoc;
  }

  /**
   * Delete a document from the database
   * @param id - The ID of the document to delete
   * @returns The deleted document or null if not found
   */
  async deleteOneById(id: string) {
    // get the document
    const resultDoc = await this.repository.findById(id);

    // check if the document exists
    if (!resultDoc) throw new NotFoundException('Document not found');

    // delete the document
    await resultDoc.deleteOne();

    // return the document
    return { message: 'Document deleted successfully' };
  }
}
