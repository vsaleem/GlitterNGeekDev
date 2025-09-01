"use client";
import React from "react";

/**
 * Pure CSS multi-layer gradient background approximating the look / palette of background.jpg
 * Colors pulled from existing design tokens & scrollbar gradient (#2d0a3a, #4a0e57, #6a1670, #ec4899, #8b5cf6, #f472b6)
 * Includes subtle radial color blooms + base linear gradient + optional noise overlay for texture.
 */
export interface GradientBackgroundProps {
  overlay?: boolean;              // adds a contrast vignette (variant-aware)
  noise?: boolean;                // subtle texture
  animate?: boolean;              // slow drifting movement
  brightness?: number;            // 0.0 - 1.0 multiplier (default 1)
  saturation?: number;            // 0.5 - 1.5 suggested range (default 1)
  soften?: boolean;               // applies a light blur to glow layers for smoother blend
  variant?: 'light' | 'vibrant';  // color style: soft pastel light (default) or previous vibrant
  cottonCandy?: boolean;          // enable soft cotton-candy cloud texture
  cottonIntensity?: number;       // 0 - 1 scale controlling strength of cotton candy overlay
  motionStrength?: number;        // scales translation/scale amplitude when animate=true (1 = base)
  tintShift?: boolean;            // enable gentle hue rotation cycle
  tintRange?: number;             // degrees of hue rotation (default 18)
  tintDuration?: number;          // seconds for full hue cycle (default 48)
  className?: string;             // extra wrapper classes
}

export function GradientBackground({
  overlay = true,
  noise = true,
  animate = false,
  brightness = 1,
  saturation = 1,
  soften = true,
  variant = 'light',
  cottonCandy = true,
  cottonIntensity = 0.55,
  motionStrength = 1,
  tintShift = false,
  tintRange = 18,
  tintDuration = 48,
  className = ""
}: GradientBackgroundProps) {
  // Clamp values defensively
  const b = Math.max(0.4, Math.min(1.3, brightness));
  const s = Math.max(0.4, Math.min(1.6, saturation));
  const ci = Math.max(0, Math.min(1, cottonIntensity));
  const ms = Math.max(0.2, Math.min(2.5, motionStrength));
  const tr = Math.max(0, Math.min(90, tintRange));
  const td = Math.max(4, Math.min(240, tintDuration));

  // Palette variants
  const layers = variant === 'light'
  ? [
        // Airy lavender base (very light)
        "linear-gradient(135deg,#faf5ff 0%, #fdf2f8 18%, #fce7f3 48%, #f5e8ff 70%, #fdf4ff 100%)",
        // Soft pink glow top-left
        "radial-gradient(circle at 16% 22%, rgba(236,72,153,0.45) 0%, rgba(236,72,153,0.22) 22%, rgba(236,72,153,0.08) 46%, transparent 70%)",
        // Gentle lavender glow upper-right
        "radial-gradient(circle at 78% 18%, rgba(216,180,254,0.40) 0%, rgba(216,180,254,0.22) 24%, rgba(216,180,254,0.08) 48%, transparent 68%)",
        // Deeper soft violet wash bottom-right
        "radial-gradient(circle at 82% 78%, rgba(167,139,250,0.38) 0%, rgba(167,139,250,0.20) 28%, transparent 58%)",
        // Warm blush bottom-left
        "radial-gradient(circle at 10% 88%, rgba(244,114,182,0.32) 0%, rgba(244,114,182,0.16) 26%, transparent 60%)",
    // Softer central highlight (reduced whiteness per feedback)
    "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.32) 20%, rgba(255,255,255,0.14) 42%, rgba(255,255,255,0) 58%)"
      ]
    : [
        // Vibrant variant (previous implementation order reversed so base last)
        "radial-gradient(circle at 50% 42%, rgba(255,240,250,0.65) 0%, rgba(255,240,250,0.35) 22%, rgba(255,240,250,0.08) 46%, transparent 70%)",
        "radial-gradient(circle at 18% 30%, rgba(236,72,153,0.55) 0%, rgba(236,72,153,0.32) 18%, rgba(236,72,153,0.10) 38%, transparent 62%)",
        "radial-gradient(circle at 74% 26%, rgba(244,114,182,0.38) 0%, rgba(244,114,182,0.18) 28%, transparent 60%)",
        "radial-gradient(circle at 82% 78%, rgba(139,92,246,0.42) 0%, rgba(139,92,246,0.24) 22%, rgba(139,92,246,0.08) 46%, transparent 65%)",
        "radial-gradient(circle at 8% 88%, rgba(74,14,87,0.55) 0%, rgba(74,14,87,0.28) 26%, transparent 58%)",
        "linear-gradient(135deg,#3c0e48 0%, #55155e 28%, #6c1e6d 55%, #7d2b75 72%, #4a0e57 100%)"
      ];

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}>      
      {(() => {
        const styleObj: React.CSSProperties & { [key: string]: string | number } = {
          background: layers.reverse().join(','),
          filter: `${soften ? 'blur(0.5px) ' : ''}brightness(${b}) saturate(${s}) hue-rotate(var(--gng-hue,0deg))`,
        };
        if (tintShift) styleObj['--gngHueDuration'] = `${td}s`;
        return (
          <div
            className={`absolute inset-0 ${animate ? 'will-change-transform motion-safe:animate-[gngGradientDrift_38s_linear_infinite]' : ''} ${tintShift ? 'motion-safe:animate-[gngHueCycle_var(--gngHueDuration)_ease-in-out_infinite]' : ''}`}
            style={styleObj}
          />
        );
      })()}
      {cottonCandy && (
        <div
          className={`absolute inset-0 pointer-events-none ${animate ? 'motion-safe:animate-[gngCottonFloat_60s_linear_infinite]' : ''}`}
          style={{
            mixBlendMode: variant === 'light' ? 'screen' : 'overlay',
            opacity: variant === 'light' ? 0.45 * ci : 0.30 * ci,
            backgroundImage: [
              // Layer of large soft blobs (pink / lavender / white)
              `radial-gradient(circle at 18% 32%, rgba(255,255,255,${0.55*ci}) 0%, rgba(255,255,255,0) 55%)`,
              `radial-gradient(circle at 78% 26%, rgba(236,72,153,${0.35*ci}) 0%, rgba(236,72,153,0) 60%)`,
              `radial-gradient(circle at 72% 78%, rgba(216,180,254,${0.40*ci}) 0%, rgba(216,180,254,0) 62%)`,
              `radial-gradient(circle at 30% 74%, rgba(244,114,182,${0.30*ci}) 0%, rgba(244,114,182,0) 58%)`,
              // Fine fluffy strokes using a subtle repeating conic gradient masked
              `repeating-conic-gradient(from 0deg, rgba(255,255,255,${0.08*ci}) 0deg 18deg, rgba(255,255,255,0) 18deg 36deg)`
            ].join(','),
            backgroundSize: '120% 120%, 140% 140%, 150% 150%, 130% 130%, 200% 200%',
            backgroundPosition: '0% 0%, 40% 10%, 60% 70%, 10% 80%, 50% 50%'
          }}
        />
      )}
      {noise && (
        <div
          className={`absolute inset-0 ${variant === 'light' ? 'opacity-[0.09]' : 'opacity-[0.12]'} mix-blend-overlay`}
          style={{
            backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAoMBgZz7W2kAAAAASUVORK5CYII=')",
            backgroundSize: 'auto',
            imageRendering: 'pixelated'
          }}
        />
      )}
      {overlay && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: variant === 'light'
              ? [
                  // Light variant: faint edge shading only
                  "radial-gradient(circle at 50% 55%, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 60%, rgba(180,120,200,0.10) 90%, rgba(140,90,170,0.15) 100%)",
                  "linear-gradient(to bottom, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.15) 42%, rgba(200,160,220,0.10) 100%)"
                ].join(',')
              : [
                  "radial-gradient(circle at 50% 55%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.03) 55%, rgba(0,0,0,0.09) 85%, rgba(0,0,0,0.14) 100%)",
                  "linear-gradient(to bottom, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.06) 40%, rgba(0,0,0,0.10) 100%)"
                ].join(',')
          }}
        />
      )}
  {(animate || tintShift) && (
    <style>{`
      @keyframes gngGradientDrift {
        0% {
          transform: scale(1) translate3d(0,0,0);
        }
        50% {
          transform: scale(${1 + 0.02*ms}) translate3d(${1.2*ms}%, ${-0.8*ms}%,0);
        }
        100% {
          transform: scale(1) translate3d(0,0,0);
        }
      }
      @keyframes gngCottonFloat {
        0% {
          transform: translate3d(0%,0%,0);
        }
        33% {
          transform: translate3d(${2*ms}%, ${-1*ms}%,0);
        }
        66% {
          transform: translate3d(${ -1*ms }%, ${1.5*ms}%,0);
        }
        100% {
          transform: translate3d(0%,0%,0);
        }
      }
      @keyframes gngHueCycle {
        0% {
          --gng-hue: 0deg;
        }
        50% {
          --gng-hue: ${tr}deg;
        }
        100% {
          --gng-hue: 0deg;
        }
      }
    `}</style>
  )}
    </div>
  );
}
