export interface CreatePostData {
  media?: File;
  content: string;
}

export type UpdatePostData = Omit<CreatePostData, 'media'>;
