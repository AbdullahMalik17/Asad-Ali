import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Maqsad-e-Quran Academy | Online Quran Classes",
    short_name: "Maqsad Quran",
    description:
      "Learn Quran online 1-on-1 with qualified male and female certified teachers worldwide. Noorani Qaida, Tajweed, Hifz, and Translation.",
    start_url: "/",
    display: "standalone",
    background_color: "#022c22",
    theme_color: "#022c22",
    icons: [
      {
        src: "/logo.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
