import { readFile } from "node:fs/promises";
import { NextResponse } from "next/server";
import type { LearningProductId } from "@/content/learning/curriculum";
import { hasLearningEntitlement } from "@/learning/access";
import { getLearningAccess } from "@/learning/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const downloadConfig: Record<
  LearningProductId,
  { environmentKey: string; storageKey: string; filename: string }
> = {
  "quick-start": {
    environmentKey: "GNG_QUICK_START_PDF_PATH",
    storageKey: "GNG_QUICK_START_PDF_OBJECT",
    filename: "GlitterNGeek-Three-Day-AI-Quick-Start.pdf",
  },
  toolkit: {
    environmentKey: "GNG_TOOLKIT_PDF_PATH",
    storageKey: "GNG_TOOLKIT_PDF_OBJECT",
    filename: "GlitterNGeek-Small-Business-AI-Toolkit.pdf",
  },
};

function pdfResponse(file: BodyInit, filename: string) {
  return new NextResponse(file, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ product: string }> },
) {
  const { product } = await params;
  if (product !== "quick-start" && product !== "toolkit") {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const access = await getLearningAccess();
  if (access.status === "disabled") {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
  if (!hasLearningEntitlement(access, product)) {
    return NextResponse.json({ error: "Access denied." }, { status: 403 });
  }

  const config = downloadConfig[product];
  const bucket = process.env.GNG_LEARNING_STORAGE_BUCKET?.trim();
  const objectPath = process.env[config.storageKey]?.trim();
  if (bucket && objectPath) {
    const supabase = createSupabaseAdminClient();
    if (!supabase) {
      return NextResponse.json(
        { error: "The PDF is temporarily unavailable." },
        { status: 503 },
      );
    }

    const { data, error } = await supabase.storage
      .from(bucket)
      .download(objectPath);
    if (error || !data) {
      return NextResponse.json(
        { error: "The PDF is temporarily unavailable." },
        { status: 503 },
      );
    }
    return pdfResponse(await data.arrayBuffer(), config.filename);
  }

  const path = process.env[config.environmentKey];
  if (!path) {
    return NextResponse.json(
      {
        error:
          "The release-ready PDF is still being finalized. Your web lessons remain available.",
      },
      { status: 503 },
    );
  }

  try {
    const file = await readFile(path);
    return pdfResponse(file, config.filename);
  } catch {
    return NextResponse.json(
      { error: "The PDF is temporarily unavailable." },
      { status: 503 },
    );
  }
}
