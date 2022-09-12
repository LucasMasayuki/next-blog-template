/* eslint-disable no-bitwise */

import { Grid } from '@mui/material';
import { Article } from 'domain/models/article-model';
import ArticlePreview from './artcicle-preview';

type Props = {
  articles: Article[];
};

const ArticlesList: React.FC<Props> = ({ articles }) => {
  return (
    <Grid container>
      {articles.map((article) => (
        <ArticlePreview article={article} key={article.title} />
      ))}
    </Grid>
  );
};

export default ArticlesList;
