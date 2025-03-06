import { Inter, Russo_One } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  weight : ['300', '400', '500', '600'],
  variable: '--font-inter',
});

export const russoOne = Russo_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-russo-one',
});
