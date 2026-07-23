import { readFile } from "node:fs/promises";
import { NextResponse } from "next/server";
import type { LearningProductId } from "@/content/learning/curriculum";
import {
  hasLearningEntitlement,
  LEARNING_SESSION_COOKIE,
  resolveLearningAccess,
} from "@/learning/access";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const downloadConfig: Record<
  LearningProductId,
  { environmentKey: string; filename: string }
> = {
  "quick-start": {
    environmentKey: "GNG_QUICK_START_PDF_PATH",
    filename: "GlitterNGeek-Three-Day-AI-Quick-Start.pdf",
  },
  toolkit: {
    environmentKey: "GNG_TOOLKIT_PDF_PATH",
    filename: "GlitterNGeek-Small-Business-AI-Toolkit.pdf",
  },
};

function readCookie(request: Request, name: string): string | undefined {
  const header = request.headers.get("cookie");
  if (!header) return undefined;
  for (const part of header.split(";")) {
    const [key, ...value] = part.trim().split("=");
    if (key === name) return decodeURIComponent(value.join("="));
  }
  return undefined;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ product: string }> },
) {
  const { product } = await params;
  if (product !== "quick-start" && product !== "toolkit") {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const access = resolveLearningAccess({
    sessionToken: readCookie(request, LEARNING_SESSION_COOKIE),
  });
  if (access.status === "disabled") {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
  if (!hasLearningEntitlement(access, product)) {
    return NextResponse.json({ error: "Access denied." }, { status: 403 });
  }

  const config = downloadConfig[product];
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
    return new NextResponse(file, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${config.filename}"`,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "The PDF is temporarily unavailable." },
      { status: 503 },
    );
  }
}
