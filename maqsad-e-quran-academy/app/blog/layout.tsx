import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Islamic Blog & Resources | Maqsad-e-Quran Academy",
  description: "Read our latest articles on Quranic studies, Tajweed, Hifz, and Islamic education.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
