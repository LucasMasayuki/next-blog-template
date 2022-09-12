/* eslint-disable no-bitwise */

import { Grid } from '@mui/material';
import { Post } from 'domain/models/post.model';
import PostPreview from './post-preview';

type Props = {
  posts: Post[];
};

const PostsList: React.FC<Props> = ({ posts }) => {
  console.log(posts);
  return (
    <Grid container>
      {posts.map((post) => (
        <PostPreview post={post} key={post.title} />
      ))}
    </Grid>
  );
};

export default PostsList;
