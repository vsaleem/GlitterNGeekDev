import { notFound } from "next/navigation";
import LearningHeader from "@/components/learning/LearningHeader";
import LearningWorkspace from "@/components/learning/LearningWorkspace";
import {
  getLearningLesson,
  toolkit,
} from "@/content/learning/curriculum";
import { requireLearningAccess } from "@/learning/server";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return toolkit.lessons.map((lesson) => ({ lesson: lesson.id }));
}

export default async function ToolkitLessonPage({
  params,
}: {
  params: Promise<{ lesson: string }>;
}) {
  const access = await requireLearningAccess("toolkit");
  const { lesson: lessonId } = await params;
  const lesson = getLearningLesson(toolkit, lessonId);
  if (!lesson) notFound();
  const lessonIndex = toolkit.lessons.findIndex(
    (item) => item.id === lesson.id,
  );

  return (
    <>
      <LearningHeader
        email={access.email}
        product={{ id: toolkit.id, name: toolkit.name }}
      />
      <LearningWorkspace
        product={toolkit}
        lesson={lesson}
        lessonIndex={lessonIndex}
      />
    </>
  );
}
