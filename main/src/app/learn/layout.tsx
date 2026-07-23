import type { Metadata } from "next";
import "./learning.css";

export const metadata: Metadata = {
  title: "My Learning | GlitterNGeek",
  description:
    "Your private GlitterNGeek Quick Start and Small Business AI Toolkit workspace.",
  robots: { index: false, follow: false },
};

export default function LearningLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="learning-root">{children}</div>;
}
