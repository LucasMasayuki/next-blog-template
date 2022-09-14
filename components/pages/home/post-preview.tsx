import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from '@mui/material';
import { Post } from 'domain/models/post.model';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AuthorLine from '../../base/author-line';

type Props = {
  post: Post;
};

const PostPreview: React.FC<Props> = ({ post }) => {
  const { locale } = useRouter();

  return (
    <Grid item xs={4}>
      <Link
        href={`${locale ?? ''}/blog/${post.slug}`}
        passHref
        key={post.title}
      >
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
            <Grid container alignItems="center" justifyItems="justify">
              <Grid item xs={12}>
                <Typography gutterBottom variant="h5" component="div">
                  {post.title}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Chip label={post.tags[0]} color="primary" size="small" />
              </Grid>
              <Grid item xs={12}>
                <AuthorLine name={post.author.name} align="left" />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  {post.excerpt}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  {new Date(post.publishedAt).toLocaleDateString('pt-br')}{' '}
                  &mdash; {post.readingTime}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
};

export default PostPreview;
