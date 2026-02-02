import { BasePaginationDto } from '@/shared/base-classes/base.pagination';

export class QueryUserDto extends BasePaginationDto {
  get searchQuery() {
    return {
      $or: [{ email: { $regex: this.search, $options: 'i' } }],
    };
  }
}
