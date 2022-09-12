import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Article } from 'domain/models/article.model';
import Link from 'next/link';

type Props = {
  article: Article;
};

const ArticlePreview: React.FC<Props> = ({ article }) => {
  return (
    <Grid item xs={4}>
      <Link href={`/blog/${article.slug}`} passHref key={article.title}>
        <Card
          sx={{
            cursor: 'pointer',
            padding: 2,
            transition: 'all .25s cubic-bezier(.02,.01,.47,1)',
            ':hover': { transform: 'translateY(-5px)' },
          }}
        >
          <CardMedia
            component="img"
            height="140"
            image={article.coverImage}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {article.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {article.excerpt}
            </Typography>
            <p className="date">
              {new Date(article.publishedAt).toLocaleDateString('pt-br')}{' '}
              &mdash; {article.readingTime}
            </p>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
};

export default ArticlePreview;
