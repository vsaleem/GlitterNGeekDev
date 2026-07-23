"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  Download,
  FileText,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  learningProducts,
  type LearningProduct,
  type LearningProductId,
} from "@/content/learning/curriculum";
import { useLearningProgress } from "./useLearningProgress";

type Props = {
  name: string;
  entitlements: readonly LearningProductId[];
  isPreview: boolean;
};

function ProductCard({
  product,
  entitled,
  completed,
  lastVisited,
}: {
  product: LearningProduct;
  entitled: boolean;
  completed: number;
  lastVisited?: string;
}) {
  const percent = Math.round((completed / product.lessons.length) * 100);
  const nextLesson =
    lastVisited ??
    product.lessons[Math.min(completed, product.lessons.length - 1)].id;
  const href = entitled
    ? `/learn/${product.id}/${nextLesson}`
    : "/learn/no-access";

  return (
    <article className={`learn-product-card accent-${product.id}`}>
      <div className="learn-product-visual" aria-hidden="true">
        {product.id === "quick-start" ? (
          <BookOpenCheck />
        ) : (
          <Sparkles />
        )}
      </div>
      <div className="learn-product-copy">
        <div className="learn-card-title-row">
          <h2>{product.name}</h2>
          <span>{entitled ? product.label : "Locked"}</span>
        </div>
        <p>{product.description}</p>
        <div className="learn-progress-copy">
          <span>
            {completed === 0
              ? "Ready to start"
              : `${completed} of ${product.lessons.length} complete`}
          </span>
          <strong>{percent}%</strong>
        </div>
        <div
          className="learn-progress-track"
          role="progressbar"
          aria-label={`${product.name} progress`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
        >
          <span style={{ width: `${percent}%` }} />
        </div>
      </div>
      <div className="learn-card-actions">
        <Link href={href} className="learn-primary-button">
          {completed > 0 ? "Continue" : "Start"}
          <ArrowRight aria-hidden="true" />
        </Link>
        <a
          href={`/api/learn/download/${product.id}`}
          className="learn-secondary-button"
        >
          <Download aria-hidden="true" />
          Download PDF
        </a>
      </div>
    </article>
  );
}

export default function LearningLibrary({
  name,
  entitlements,
  isPreview,
}: Props) {
  const { progress, ready, reset } = useLearningProgress();

  const handleReset = () => {
    if (
      window.confirm(
        "Delete all worksheet responses, checklist choices, and progress saved in this browser?",
      )
    ) {
      reset();
    }
  };

  return (
    <>
      {isPreview ? (
        <div className="learn-preview-banner">
          Development preview · Customer identity and entitlement services are
          not connected.
        </div>
      ) : null}

      <section className="learn-welcome">
        <div>
          <p className="learn-eyebrow">Customer library</p>
          <h1>Welcome back, {name}</h1>
          <p>Continue where you left off or download a keepsake.</p>
        </div>
        <div className="learn-welcome-art" aria-hidden="true">
          <FileText />
          <CheckCircle2 />
        </div>
      </section>

      <section className="learn-library-section" aria-labelledby="my-learning">
        <div className="learn-section-heading">
          <div>
            <p className="learn-eyebrow">Your workspace</p>
            <h2 id="my-learning">My Learning</h2>
          </div>
          <span className="learn-local-note">
            <ShieldCheck aria-hidden="true" />
            Saved only in this browser
          </span>
        </div>

        <div className="learn-product-grid" aria-busy={!ready}>
          {learningProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              entitled={entitlements.includes(product.id)}
              completed={product.lessons.filter((lesson) =>
                progress.completed.includes(`${product.id}:${lesson.id}`),
              ).length}
              lastVisited={progress.lastVisited[product.id]}
            />
          ))}
        </div>
      </section>

      <section className="learn-safety-band">
        <ShieldCheck aria-hidden="true" />
        <div>
          <h2>Human review stays in the loop.</h2>
          <p>
            AI can draft, but people decide. Always review before you publish
            or share.
          </p>
        </div>
        <button type="button" onClick={handleReset}>
          <RefreshCcw aria-hidden="true" />
          Delete saved data
        </button>
      </section>

      <section id="downloads" className="learn-download-note">
        <Download aria-hidden="true" />
        <div>
          <h2>Printable keepsakes</h2>
          <p>
            Release-ready PDFs will appear here after the final review labels
            and placeholder links are removed from the exports.
          </p>
        </div>
      </section>
    </>
  );
}
