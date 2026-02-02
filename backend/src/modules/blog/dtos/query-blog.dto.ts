import { BasePaginationDto } from '@/shared/base-classes/base.pagination';

export class QueryBlogDto extends BasePaginationDto {
  get searchQuery() {
    return {
      $or: [{ title: { $regex: this.search, $options: 'i' } }, { body: { $regex: this.search, $options: 'i' } }],
    };
  }
}
