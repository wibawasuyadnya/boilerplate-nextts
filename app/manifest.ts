// app/manifest.ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  // Environment detection
  // use this if have you have two separate production and staging env with different manifest
  // if not just remove if and comment isProduction
  const isProduction = process.env.NEXT_PUBLIC_ENV === 'production';

  if (isProduction) {
    // Production manifest
    return {
      name: "Boilerplate-NextTS",
      short_name: "Boilerplate-NextTS",
      description: "Boilerplate-NextTS",
      start_url: "/",
      theme_color: "#ffffff",
      background_color: "#ffffff",
      display: "standalone",
      icons: [
        {
          src: "/production/favicon-16x16.png",
          sizes: "16x16",
          type: "image/png",
          purpose: "maskable"
        },
        {
          src: "/production/favicon-32x32.png",
          sizes: "32x32",
          type: "image/png",
          purpose: "maskable"
        },
        {
          src: "/production/favicon-64x64.png",
          sizes: "64x64",
          type: "image/png",
          purpose: "maskable"
        },
        {
          src: "/production/favicon-128x128.png",
          sizes: "128x128",
          type: "image/png",
          purpose: "maskable"
        },
        {
          src: "/production/favicon-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable"
        },
        {
          src: "/production/favicon-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable"
        }
      ]
    };
  }

  // Staging manifest (default)
  return {
    name: "Boilerplate-NextTS",
    short_name: "Boilerplate-NextTS",
    description: "Boilerplate-NextTS",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/staging/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: "/staging/favicon-64x64.png",
        sizes: "64x64",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: "/staging/favicon-128x128.png",
        sizes: "128x128",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: "/staging/favicon-256x256.png",
        sizes: "256x256",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: "/staging/favicon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }
    ]
  };
}