import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { youtubeUrl } from "./pageData";

type CtaPairProps = {
  dark?: boolean;
  isCoursesPageReleased?: boolean;
};

export function CtaPair({ dark = false, isCoursesPageReleased }: CtaPairProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Link
        href={isCoursesPageReleased ? "/courses" : "/products/small-business-ai-toolkit"}
        className={dark ? "gng-button-primary bg-pink-400 text-[#25143a] hover:bg-pink-300" : "gng-button-primary"}
      >
        {isCoursesPageReleased ? "Start Learning" : "Explore the AI Toolkit"}
        <ArrowRight className="h-4 w-4" />
      </Link>
      <a
        href={youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`gng-button-secondary ${
          dark
            ? "border-white/25 bg-white/5 text-white hover:bg-white/10"
            : ""
        }`}
      >
        <Play className="h-4 w-4" /> Watch Tutorials
      </a>
    </div>
  );
}

export default CtaPair;
