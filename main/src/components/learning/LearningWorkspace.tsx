"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clipboard,
  ClipboardCheck,
  Copy,
  Download,
  FileCheck2,
  Lightbulb,
  LockKeyhole,
  Save,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  clearFields,
  humanReviewItems,
  type LearningLesson,
  type LearningProduct,
  type LessonBlock,
} from "@/content/learning/curriculum";
import { useLearningProgress } from "./useLearningProgress";

type Props = {
  product: LearningProduct;
  lesson: LearningLesson;
  lessonIndex: number;
};

function accentIcon(accent: LearningLesson["accent"]) {
  if (accent === "sky") return Lightbulb;
  if (accent === "mint") return ShieldCheck;
  if (accent === "yellow") return FileCheck2;
  if (accent === "violet") return Sparkles;
  return ClipboardCheck;
}

function PromptBlock({
  block,
  onCopy,
  copied,
}: {
  block: Extract<LessonBlock, { type: "prompt" }>;
  onCopy: () => void;
  copied: boolean;
}) {
  return (
    <details className="learn-prompt-block">
      <summary>
        <span>
          <Clipboard aria-hidden="true" />
          {block.title}
        </span>
        <span className="learn-summary-action">Open prompt</span>
      </summary>
      <div className="learn-prompt-body">
        <p>{block.prompt}</p>
        <div className="learn-prompt-footer">
          <span>
            <ShieldCheck aria-hidden="true" />
            <strong>Verify before use:</strong> {block.verify}
          </span>
          <button type="button" onClick={onCopy}>
            {copied ? (
              <Check aria-hidden="true" />
            ) : (
              <Copy aria-hidden="true" />
            )}
            {copied ? "Copied" : "Copy prompt"}
          </button>
        </div>
      </div>
    </details>
  );
}

export default function LearningWorkspace({
  product,
  lesson,
  lessonIndex,
}: Props) {
  const {
    progress,
    ready,
    setValue,
    setCheck,
    setCompleted,
    setLastVisited,
  } = useLearningProgress();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const lessonKey = `${product.id}:${lesson.id}`;
  const Icon = accentIcon(lesson.accent);
  const previous = product.lessons[lessonIndex - 1];
  const next = product.lessons[lessonIndex + 1];
  const isComplete = progress.completed.includes(lessonKey);

  useEffect(() => {
    if (ready) setLastVisited(product.id, lesson.id);
  }, [lesson.id, product.id, ready, setLastVisited]);

  const fieldKey = (id: string) => `${lessonKey}:field:${id}`;
  const checkKey = (blockIndex: number, itemIndex: number) =>
    `${lessonKey}:check:${blockIndex}:${itemIndex}`;

  const clearPrompt = useMemo(
    () =>
      clearFields
        .map((field) => {
          const value =
            progress.values[`${lessonKey}:field:clear-${field.id}`];
          return `${field.label.slice(0, 1)}: ${value || field.placeholder}`;
        })
        .join("\n"),
    [progress.values, lessonKey],
  );

  const copyText = async (key: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey(null), 1800);
  };

  const renderBlock = (block: LessonBlock, blockIndex: number) => {
    if (block.type === "note") {
      return (
        <section
          key={`${block.type}-${blockIndex}`}
          className={`learn-content-block learn-note tone-${block.tone ?? "default"}`}
        >
          <div className="learn-block-heading">
            {block.tone === "safety" ? (
              <ShieldAlert aria-hidden="true" />
            ) : (
              <Lightbulb aria-hidden="true" />
            )}
            <div>
              <h2>{block.title}</h2>
              <p>{block.body}</p>
            </div>
          </div>
          {block.bullets ? (
            <ul>
              {block.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </section>
      );
    }

    if (block.type === "fields") {
      return (
        <section
          key={`${block.type}-${blockIndex}`}
          className="learn-content-block"
        >
          <div className="learn-block-heading">
            <FileCheck2 aria-hidden="true" />
            <div>
              <h2>{block.title}</h2>
              {block.description ? <p>{block.description}</p> : null}
            </div>
          </div>
          <div className="learn-fields">
            {block.fields.map((field) => {
              const key = fieldKey(field.id);
              const shared = {
                id: key,
                value: progress.values[key] ?? "",
                placeholder: field.placeholder ?? "Type your response…",
                onChange: (
                  event: React.ChangeEvent<
                    HTMLInputElement | HTMLTextAreaElement
                  >,
                ) => setValue(key, event.target.value),
              };
              return (
                <label key={field.id} htmlFor={key}>
                  <span>{field.label}</span>
                  {field.multiline ? (
                    <textarea {...shared} rows={4} />
                  ) : (
                    <input {...shared} type="text" />
                  )}
                </label>
              );
            })}
          </div>
        </section>
      );
    }

    if (block.type === "checklist") {
      return (
        <section
          key={`${block.type}-${blockIndex}`}
          className="learn-content-block learn-checklist-block"
        >
          <div className="learn-block-heading">
            <ShieldCheck aria-hidden="true" />
            <div>
              <h2>{block.title}</h2>
              {block.description ? <p>{block.description}</p> : null}
            </div>
          </div>
          <div className="learn-checklist">
            {block.items.map((item, itemIndex) => {
              const key = checkKey(blockIndex, itemIndex);
              return (
                <label key={item}>
                  <input
                    type="checkbox"
                    checked={progress.checks[key] ?? false}
                    onChange={(event) => setCheck(key, event.target.checked)}
                  />
                  <span className="learn-checkbox" aria-hidden="true">
                    <Check />
                  </span>
                  <span>{item}</span>
                </label>
              );
            })}
          </div>
        </section>
      );
    }

    if (block.type === "prompt") {
      const key = `${lessonKey}:prompt:${blockIndex}`;
      return (
        <PromptBlock
          key={key}
          block={block}
          copied={copiedKey === key}
          onCopy={() => copyText(key, block.prompt)}
        />
      );
    }

    return (
      <section
        key={`${block.type}-${blockIndex}`}
        className="learn-content-block learn-clear-builder"
      >
        <div className="learn-block-heading">
          <Sparkles aria-hidden="true" />
          <div>
            <h2>{block.title}</h2>
            <p>Give the draft context, boundaries, and a review request.</p>
          </div>
        </div>
        <div className="learn-clear-fields">
          {clearFields.map((field, index) => {
            const key = fieldKey(`clear-${field.id}`);
            return (
              <label key={field.id} className={`clear-${index}`}>
                <span>{field.label}</span>
                <textarea
                  id={key}
                  rows={2}
                  value={progress.values[key] ?? ""}
                  placeholder={field.placeholder}
                  onChange={(event) => setValue(key, event.target.value)}
                />
              </label>
            );
          })}
        </div>
        <div className="learn-prompt-preview">
          <div>
            <span>
              <Sparkles aria-hidden="true" />
              Preview prompt
            </span>
            <button
              type="button"
              onClick={() => copyText(`${lessonKey}:clear`, clearPrompt)}
            >
              {copiedKey === `${lessonKey}:clear` ? (
                <Check aria-hidden="true" />
              ) : (
                <Copy aria-hidden="true" />
              )}
              {copiedKey === `${lessonKey}:clear`
                ? "Copied"
                : "Copy prompt"}
            </button>
          </div>
          <pre>{clearPrompt}</pre>
        </div>
      </section>
    );
  };

  return (
    <div className={`learn-workspace accent-${lesson.accent}`} aria-busy={!ready}>
      <aside className="learn-curriculum">
        <p>
          {product.id === "quick-start" ? "Day" : "Section"} progress ·{" "}
          {lessonIndex + 1} of {product.lessons.length}
        </p>
        <div className="learn-mini-progress" aria-hidden="true">
          {product.lessons.map((item, index) => (
            <span
              key={item.id}
              className={
                progress.completed.includes(`${product.id}:${item.id}`)
                  ? "is-complete"
                  : index === lessonIndex
                    ? "is-current"
                    : ""
              }
            />
          ))}
        </div>
        <nav aria-label={`${product.name} curriculum`}>
          {product.lessons.map((item, index) => {
            const complete = progress.completed.includes(
              `${product.id}:${item.id}`,
            );
            return (
              <Link
                key={item.id}
                href={`/learn/${product.id}/${item.id}`}
                aria-current={item.id === lesson.id ? "page" : undefined}
              >
                <span>
                  {complete ? (
                    <Check aria-hidden="true" />
                  ) : (
                    String(index + 1)
                  )}
                </span>
                <span>
                  <strong>
                    {index + 1}. {item.shortTitle}
                  </strong>
                  <small>{item.title}</small>
                </span>
                <ArrowRight aria-hidden="true" />
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="learn-lesson">
        <div className="learn-mobile-progress">
          <span>
            {product.id === "quick-start" ? "Day" : "Section"} {lessonIndex + 1}{" "}
            of {product.lessons.length}
          </span>
          <select
            aria-label="Choose lesson"
            value={lesson.id}
            onChange={(event) => {
              window.location.href = `/learn/${product.id}/${event.target.value}`;
            }}
          >
            {product.lessons.map((item, index) => (
              <option value={item.id} key={item.id}>
                {index + 1}. {item.shortTitle}
              </option>
            ))}
          </select>
        </div>

        <header className="learn-lesson-heading">
          <div className="learn-lesson-icon" aria-hidden="true">
            <Icon />
          </div>
          <div>
            <p className="learn-eyebrow">
              {product.id === "quick-start" ? "Day" : "Section"} {lessonIndex + 1}{" "}
              of {product.lessons.length}
            </p>
            <h1>{lesson.title}</h1>
            <p>{lesson.intro}</p>
          </div>
        </header>

        <div className="learn-lesson-content">
          {lesson.blocks.map(renderBlock)}
        </div>

        <div className="learn-lesson-navigation">
          {previous ? (
            <Link href={`/learn/${product.id}/${previous.id}`}>
              <ArrowLeft aria-hidden="true" />
              <span>
                <small>Previous</small>
                {previous.shortTitle}
              </span>
            </Link>
          ) : (
            <Link href="/learn">
              <ArrowLeft aria-hidden="true" />
              <span>
                <small>Back to</small>
                My Learning
              </span>
            </Link>
          )}

          <button
            type="button"
            className={isComplete ? "is-complete" : ""}
            onClick={() => setCompleted(lessonKey, !isComplete)}
          >
            {isComplete ? (
              <CheckCircle2 aria-hidden="true" />
            ) : (
              <Save aria-hidden="true" />
            )}
            {isComplete ? "Completed" : "Mark complete"}
          </button>

          {next ? (
            <Link href={`/learn/${product.id}/${next.id}`}>
              <span>
                <small>Next</small>
                {next.shortTitle}
              </span>
              <ArrowRight aria-hidden="true" />
            </Link>
          ) : (
            <Link href="/learn">
              <span>
                <small>Return to</small>
                My Learning
              </span>
              <ArrowRight aria-hidden="true" />
            </Link>
          )}
        </div>
      </main>

      <aside className="learn-review-rail">
        <div>
          <ShieldCheck aria-hidden="true" />
          <h2>Human review</h2>
        </div>
        <ul>
          {humanReviewItems.map((item) => (
            <li key={item}>
              <Check aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="learn-private-data">
          <LockKeyhole aria-hidden="true" />
          <div>
            <strong>Keep private data out.</strong>
            <span>Use placeholders such as [NAME], [SERVICE], or [DATE].</span>
          </div>
        </div>
        <a href={`/api/learn/download/${product.id}`}>
          <Download aria-hidden="true" />
          Download PDF
        </a>
      </aside>
    </div>
  );
}
