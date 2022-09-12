import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Post } from 'domain/models/post.model';
import Link from 'next/link';

type Props = {
  post: Post;
};

const PostPreview: React.FC<Props> = ({ post }) => {
  return (
    <Grid item xs={4}>
      <Link href={`/blog/${post.slug}`} passHref key={post.title}>
        <Card
          sx={{
            cursor: 'pointer',
            transition: 'all .25s cubic-bezier(.02,.01,.47,1)',
            ':hover': { transform: 'translateY(-5px)' },
          }}
        >
          <CardMedia
            component="img"
            height="140"
            image={post.coverImage}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {post.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {post.excerpt}
            </Typography>
            <p className="date">
              {new Date(post.publishedAt).toLocaleDateString('pt-br')} &mdash;{' '}
              {post.readingTime}
            </p>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
};

export default PostPreview;
