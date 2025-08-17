import "@mantine/core/styles.css";
import "mantine-react-table/styles.css";

import {
  DirectionProvider,
  MantineProvider,
  ColorSchemeScript,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { Analytics } from "@vercel/analytics/react";
import { inter } from "@/styles/fonts";
import { theme } from "@/styles/theme";


export const metadata = {
  metadataBase: new URL("https://www.neargami.com/"),
  title: { default: "NearGami" },
  robots: {
    index: false,  
    follow: false,
  },
  description: "Play to learn & learn to earn",
  keywords: [
    "NearGami",
    "Play to learn",
    "Learn to earn",
    "Gamification",
    "E-learning",
    "Education",
    "Learning",
    "Gamification",
    "E-learning",
    "Education",
    "Learning",
  ],
  authors: [
    {
      name: "NearGami",
      url: "",
    },
  ],
  creator: "NearGami",
  manifest: "",
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en-US">
      <head>
      <ColorSchemeScript />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords.join(", ")} />
        <meta name="author" content={metadata.authors.map((author) => author.name).join(", ")} />
        <title>{metadata.title.default}</title>
      </head>
      <body className={inter.className}>

        <DirectionProvider>
          <MantineProvider theme={theme} defaultColorScheme="dark">
            <ModalsProvider>
              {children} 
              <Analytics />
            </ModalsProvider>
            <Notifications />
          </MantineProvider>
        </DirectionProvider>

      </body>
    </html>
  );
}
