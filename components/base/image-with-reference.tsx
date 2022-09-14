import { Box, Link, Typography } from '@mui/material';
import Image from 'next/image';

type Position = {
  right?: string | number;
  bottom?: string | number;
  top?: string | number;
  left?: string | number;
};

export const ReferencePosition = {
  BOTTOM_RIGHT: { right: '1%', bottom: 0 },
  TOP_RIGHT: { right: '1%', top: 0 },
};

type Props = {
  referenceURL: string;
  href: string;
  height: string | { xs: string; md: string } | number;
  width: string | { xs: string; md: string } | number;
  referencePosition: Position;
};

export default function ImageWithReference({
  referenceURL,
  referencePosition,
  href,
  height,
  width,
}: Props) {
  return (
    <Box height={height} width={width} sx={{ position: 'relative' }}>
      <Typography
        color="white"
        fontSize={12}
        sx={{ position: 'absolute', zIndex: 1, ...referencePosition }}
      >
        Designed by{' '}
        <Link href={referenceURL} target="_blank">
          freepik
        </Link>
      </Typography>
      <Image loading="lazy" src={href} alt="doubts" layout="fill" />
    </Box>
  );
}
