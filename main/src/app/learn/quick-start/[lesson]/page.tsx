import { notFound } from "next/navigation";
import LearningHeader from "@/components/learning/LearningHeader";
import LearningWorkspace from "@/components/learning/LearningWorkspace";
import {
  getLearningLesson,
  quickStart,
} from "@/content/learning/curriculum";
import { requireLearningAccess } from "@/learning/server";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return quickStart.lessons.map((lesson) => ({ lesson: lesson.id }));
}

export default async function QuickStartLessonPage({
  params,
}: {
  params: Promise<{ lesson: string }>;
}) {
  const access = await requireLearningAccess("quick-start");
  const { lesson: lessonId } = await params;
  const lesson = getLearningLesson(quickStart, lessonId);
  if (!lesson) notFound();
  const lessonIndex = quickStart.lessons.findIndex(
    (item) => item.id === lesson.id,
  );

  return (
    <>
      <LearningHeader
        email={access.email}
        product={{
          id: quickStart.id,
          name: quickStart.name,
          label: "FREE",
        }}
      />
      <LearningWorkspace
        product={quickStart}
        lesson={lesson}
        lessonIndex={lessonIndex}
      />
    </>
  );
}
