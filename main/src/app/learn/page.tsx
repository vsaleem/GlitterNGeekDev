import LearningHeader from "@/components/learning/LearningHeader";
import LearningLibrary from "@/components/learning/LearningLibrary";
import { requireLearningAccess } from "@/learning/server";

export const dynamic = "force-dynamic";

export default async function LearningLibraryPage() {
  const access = await requireLearningAccess();

  return (
    <>
      <LearningHeader email={access.email} />
      <LearningLibrary
        name={access.name}
        entitlements={access.entitlements}
        isPreview={access.isPreview}
      />
      <footer className="learn-footer">
        <span>© 2026 GlitterNGeek.dev</span>
        <div>
          <span>Private access · Human-reviewed learning</span>
          <a href="mailto:support@glitterngeek.dev">Contact support</a>
        </div>
      </footer>
    </>
  );
}
