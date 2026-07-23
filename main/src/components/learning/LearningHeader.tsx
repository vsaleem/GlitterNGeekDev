import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CircleHelp, Download, Library } from "lucide-react";
import type { LearningProductId } from "@/content/learning/curriculum";
import LearningThemeControls from "./LearningThemeControls";

type Props = {
  email: string;
  product?: {
    id: LearningProductId;
    name: string;
    label?: string;
  };
};

export default function LearningHeader({ email, product }: Props) {
  return (
    <header className="learn-header">
      <Link href="/learn" className="learn-brand" aria-label="GlitterNGeek learning library">
        <Image
          src="/BrandLogo.svg"
          alt="GlitterNGeek"
          width={250}
          height={88}
          priority
        />
      </Link>

      <nav aria-label="Learning">
        {product ? (
          <>
            <Link href="/learn" className="learn-header-link">
              <ArrowLeft aria-hidden="true" />
              <span>My Learning</span>
            </Link>
            <span className="learn-header-divider" aria-hidden="true" />
            <span className="learn-product-title">
              {product.name}
              {product.label ? (
                <span className="learn-product-badge">{product.label}</span>
              ) : null}
            </span>
          </>
        ) : (
          <>
            <Link href="/learn" className="learn-header-link is-active">
              <Library aria-hidden="true" />
              <span>My Learning</span>
            </Link>
            <a href="#downloads" className="learn-header-link">
              <Download aria-hidden="true" />
              <span>Downloads</span>
            </a>
          </>
        )}
      </nav>

      <div className="learn-header-actions">
        <LearningThemeControls />
        <a
          href="mailto:support@glitterngeek.dev"
          className="learn-icon-link"
          aria-label="Contact support"
          title="Contact support"
        >
          <CircleHelp aria-hidden="true" />
        </a>
        <span className="learn-signed-in" title={email}>
          {email}
        </span>
      </div>
    </header>
  );
}
