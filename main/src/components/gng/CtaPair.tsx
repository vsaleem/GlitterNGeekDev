import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { youtubeUrl } from "./pageData";

type CtaPairProps = {
  dark?: boolean;
  isCoursesPageReleased?: boolean; // add this line
};
// add flag isCoursesPageReleased to props and use it to conditionally render the cta text and styles

export function CtaPair({ dark = false, isCoursesPageReleased }: CtaPairProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      {isCoursesPageReleased && (
      <Link
        href="/courses"
        className={`inline-flex h-12 items-center justify-center gap-2 rounded-lg px-5 text-sm font-bold shadow-sm transition ${
          dark
            ? "bg-pink-400 text-purple-950 hover:bg-pink-300"
            : "bg-purple-800 text-white hover:bg-purple-900"
        }`}
      >
        Start Learning <ArrowRight className="h-4 w-4" />
      </Link>
      )}
      <a
        href={youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex h-12 items-center justify-center gap-2 rounded-lg border px-5 text-sm font-bold transition ${
          dark
            ? "border-white/25 text-white hover:bg-white/10"
            : "border-purple-200 bg-white text-purple-900 hover:bg-purple-50"
        }`}
      >
        <Play className="h-4 w-4" /> Watch Tutorials
      </a>
    </div>
  );
}

export default CtaPair;
