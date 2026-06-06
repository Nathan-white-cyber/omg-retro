import type { Metadata } from "next";

export const siteUrl = "https://omg-retro.vercel.app";
export const ogImageUrl = `${siteUrl}/images/og-placeholder.png`;
export const siteName = "OMG Retro";

type MetadataOptions = {
  title: string;
  description: string;
  path?: string;
  index?: boolean;
  image?: string;
};

export function createMetadata({
  title,
  description,
  path = "/",
  index = true,
  image = ogImageUrl,
}: MetadataOptions): Metadata {
  const url = `${siteUrl}${path}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: {
      index,
      follow: index,
    },
  };
}

export function noIndexMetadata(title: string, description: string, path: string): Metadata {
  return createMetadata({ title, description, path, index: false });
}
