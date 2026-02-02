export interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  author: {
    name: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt?: string;
  tags?: string[];
  imageUrl?: string;
}

export interface BlogFormData {
  id?: string;
  title: string;
  content: string;
  excerpt?: string;
  tags?: string[];
  imageUrl?: string;
  author: string;
}
