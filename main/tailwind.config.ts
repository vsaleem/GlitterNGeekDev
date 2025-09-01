import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)','system-ui','sans-serif'],
        body: ['var(--font-body)','var(--font-geist-sans)','system-ui','sans-serif'],
        mono: ['var(--font-geist-mono)','ui-monospace','SFMono-Regular','Menlo','monospace']
      },
      keyframes: {
        softPulsePlay: {
          '0%,100%': { transform: 'scale(1)' },
          '40%': { transform: 'scale(1.22)' },
          '55%': { transform: 'scale(1.06)' }
        },
        blobMorph: {
          '0%': { borderRadius: '56% 44% 52% 48% / 50% 55% 45% 50%' },
          '25%': { borderRadius: '48% 52% 46% 54% / 60% 40% 56% 44%' },
          '50%': { borderRadius: '60% 40% 58% 42% / 42% 62% 38% 58%' },
            '75%': { borderRadius: '52% 48% 44% 56% / 58% 46% 64% 42%' },
          '100%': { borderRadius: '56% 44% 52% 48% / 50% 55% 45% 50%' }
        },
        badgeSheen: { '0%': { left: '-150%' }, '100%': { left: '160%' } },
        badgeSheenIdle: {
          '0%,88%': { left: '-150%', opacity: '0' },
          '90%': { left: '-150%', opacity: '1' },
          '100%': { left: '160%', opacity: '0' }
        },
        glitterScroll: {
          '0%': { backgroundPosition: '0 0,0 0,0 0,0 0,0 0' },
          '50%': { backgroundPosition: '70px 140px,-50px 90px,40px -70px,20px 60px,-30px -40px' },
          '100%': { backgroundPosition: '0 0,0 0,0 0,0 0,0 0' }
        },
        glitterFlicker: { '0%,100%': { opacity: '.85' }, '50%': { opacity: '1' } }
      },
      animation: {
        softPulsePlay: 'softPulsePlay 2.4s ease-in-out infinite',
        badgeSheen: 'badgeSheen 1s ease forwards',
        badgeSheenIdle: 'badgeSheenIdle 11s ease-in-out infinite',
  glitterScroll: 'glitterScroll 18s linear infinite,glitterFlicker 2.8s ease-in-out infinite',
  blobMorph: 'blobMorph 26s ease-in-out infinite'
      }
    }
  },
  plugins: [
    plugin(function ({ addUtilities, addComponents, addBase }) {
      // Base styles (variables + body + hiding dev toast + scrollbar + reduced motion overrides)
      addBase({
        ':root': {
          '--background': '#fff',
          '--foreground': '#171717',
        },
        '@media (prefers-color-scheme: dark)': {
          ':root': {
            '--background': '#0a0a0a',
            '--foreground': '#ededed',
          },
        },
        'body': {
          background: 'var(--background)',
          color: 'var(--foreground)',
          fontFamily: 'var(--font-body),var(--font-geist-sans),system-ui,sans-serif',
        },
        'h1,h2,h3,h4,h5,h6': {
          fontFamily: 'var(--font-display),system-ui,sans-serif'
        },
        'p,li,span,a,button,input,textarea': {
          fontFamily: 'var(--font-body),var(--font-geist-sans),system-ui,sans-serif'
        },
        '.nextjs-toast': { display: 'none !important' },
        'html': { scrollbarWidth: 'thin', scrollbarColor: '#ec4899 #2d0a3a' },
        '::-webkit-scrollbar': { width: '14px' },
        '::-webkit-scrollbar-track': {
          background: 'radial-gradient(circle at 18% 28%,rgba(255,255,255,.95) 0 2px,transparent 3px),radial-gradient(circle at 62% 68%,rgba(255,255,255,.75) 0 1.7px,transparent 2.7px),radial-gradient(circle at 82% 38%,rgba(255,255,255,.9) 0 2px,transparent 3px),radial-gradient(circle at 35% 80%,rgba(255,255,255,.6) 0 1.4px,transparent 2.2px),linear-gradient(145deg,#2d0a3a,#4a0e57 40%,#6a1670 70%,#2d0a3a)',
          backgroundSize: '120px 200px,160px 240px,140px 220px,180px 260px,cover',
          backgroundBlendMode: 'screen,screen,screen,screen,normal',
          animation: 'glitterScroll 18s linear infinite,glitterFlicker 2.8s ease-in-out infinite',
          borderLeft: '1px solid rgba(255,255,255,.15)',
        },
        '::-webkit-scrollbar-thumb': {
          background: 'radial-gradient(circle at 30% 25%,rgba(255,255,255,.65) 0 3px,transparent 4px),radial-gradient(circle at 70% 65%,rgba(255,255,255,.45) 0 2px,transparent 3px),linear-gradient(180deg,rgba(255,255,255,.35),rgba(255,255,255,0)),linear-gradient(145deg,#ec4899,#8b5cf6 55%,#ec4899)',
          backgroundSize: '60px 90px,80px 110px,cover,cover',
          backgroundBlendMode: 'screen,screen,normal,normal',
          border: '3px solid #2d0a3a',
          backgroundClip: 'padding-box,border-box',
          borderRadius: '999px',
          boxShadow: '0 0 0 1px rgba(255,255,255,.15),0 2px 6px -2px rgba(0,0,0,.6)',
          transition: 'background-color .3s ease,box-shadow .3s ease',
        },
        '::-webkit-scrollbar-thumb:hover': {
          boxShadow: '0 0 0 1px rgba(255,255,255,.28),0 4px 10px -2px rgba(0,0,0,.7)'
        },
        '::-webkit-scrollbar-thumb:active': {
          background: 'linear-gradient(180deg,rgba(255,255,255,.5),rgba(255,255,255,0)),linear-gradient(145deg,#f472b6,#8b5cf6 60%,#f472b6)'
        },
        '@media (prefers-reduced-motion: reduce)': {
          '::-webkit-scrollbar-track': { animation: 'none' },
        },
      });

      // Typography helper utilities
      addUtilities({
        '.font-display': { fontFamily: 'var(--font-display),system-ui,sans-serif' },
        '.font-body': { fontFamily: 'var(--font-body),var(--font-geist-sans),system-ui,sans-serif' },
      });

      // Text effect utilities
      addUtilities({
        '.text-shadow-pink': { textShadow: '0 2px 4px rgba(236,72,153,.45)' },
        '.text-glow-pink': { textShadow: '0 0 4px rgba(236,72,153,.65),0 0 12px rgba(236,72,153,.45),0 0 24px rgba(236,72,153,.35)' },
        '.text-glow-pink-soft': { textShadow: '0 0 6px rgba(236,72,153,.35),0 0 14px rgba(236,72,153,.25)' },
        '.text-stroke-pink': { '-webkit-text-stroke': '1px #ec4899', color: 'transparent' },
        '.text-stroke-pink-fill': { '-webkit-text-stroke': '1px #ec4899' },
        '.text-stroke-pink-fill-white': { '-webkit-text-stroke': '1px #ec4899', color: '#fff' },
        '.text-stroke-glow-pink': { '-webkit-text-stroke': '1px #ec4899', textShadow: '0 0 6px rgba(236,72,153,.55),0 0 14px rgba(236,72,153,.4)' },
      });

      // Components: fun shape card, youtube pill button, badge, play icon wrapper
      addComponents({
        '.fun-shape-card': {
          position: 'relative',
          background: '#fff',
          borderRadius: '56% 44% 52% 48% / 50% 55% 45% 50%',
          boxShadow: '0 8px 24px -6px rgba(149,76,233,.25),0 4px 12px -2px rgba(236,72,153,.15)',
          transition: 'border-radius .8s ease,box-shadow .4s ease,transform .6s ease',
          outline: 'none !important',
        },
        '.fun-shape-card:hover': {
          borderRadius: '45% 55% 42% 58% / 55% 45% 50% 50%',
          boxShadow: '0 10px 30px -4px rgba(139,92,246,.35),0 6px 16px -2px rgba(236,72,153,.22)'
        },
        '.fun-shape-card:focus': {
          boxShadow: '0 10px 30px -4px rgba(139,92,246,.35),0 6px 16px -2px rgba(236,72,153,.22)'
        },
        '.fun-shape-card:focus-visible': {
          boxShadow: '0 0 0 3px rgba(255,255,255,0.95),0 0 0 6px rgba(236,72,153,0.55),0 10px 30px -4px rgba(139,92,246,.35),0 6px 16px -2px rgba(236,72,153,.22)'
        },
        '.fun-shape-card::before': {
          content: '""',
          position: 'absolute',
          inset: '0',
          padding: '2px',
          borderRadius: 'inherit',
          background: 'linear-gradient(135deg,rgba(236,72,153,.9),rgba(139,92,246,.9),rgba(236,72,153,.9))',
          WebkitMask: 'linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0)',
          mask: 'linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          pointerEvents: 'none',
        },
        '.fun-shape-card::after': {
          content: '""',
          position: 'absolute',
          inset: '4% 6%',
          borderRadius: 'inherit',
          background: 'radial-gradient(circle at 30% 25%,rgba(236,72,153,.10),transparent 60%),radial-gradient(circle at 70% 70%,rgba(139,92,246,.10),transparent 65%)',
          pointerEvents: 'none',
        },

        '.yt-pill-btn': { position: 'relative', overflow: 'hidden' },
        '.yt-pill-btn::after': {
          content: '""',
          position: 'absolute',
          inset: '0',
          pointerEvents: 'none',
          background: 'radial-gradient(circle at 30% 30%,rgba(236,72,153,.18),transparent 65%),radial-gradient(circle at 70% 70%,rgba(124,58,237,.15),transparent 70%)',
          opacity: '0',
          transition: 'opacity .4s ease'
        },
        '.yt-pill-btn:hover::after': { opacity: '1' },
        '@media (max-width:767px)': {
          '.yt-pill-btn': {
            width: '220px',
            borderWidth: '2px !important',
            padding: '.9rem 1.4rem !important',
            borderColor: '#7c3aed !important',
            background: '#fff !important',
            color: '#000 !important',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '.55rem',
            borderRadius: '9999px !important',
            transition: 'width .5s ease,border-radius .5s ease,background .4s ease,box-shadow .4s ease',
            boxShadow: '0 6px 18px -6px rgba(124,58,237,.25),0 4px 10px -4px rgba(236,72,153,.25)'
          },
          '.yt-pill-btn:active': { transform: 'scale(.95)' },
          '.yt-pill-btn:focus-visible': { outline: '2px solid #7c3aed', outlineOffset: '4px' },
        },
        '@media (min-width:768px)': {
          '.fun-shape-card': { borderRadius: '42% 58% 46% 54% / 60% 40% 52% 48%' },
          '.yt-pill-btn': { borderRadius: '1.25rem' }
        },

        '.soft-play-icon': { transition: 'transform .35s ease', display: 'inline-block', willChange: 'transform', animation: 'softPulsePlay 2.4s ease-in-out infinite' },
        '.yt-pill-btn:hover .soft-play-icon': { transform: 'scale(1.15)' },
        '@media (prefers-reduced-motion: reduce)': {
          '.badge-interact, .badge-interact::after': { animation: 'none !important', transition: 'none !important' },
          '.soft-play-icon': { animation: 'none' },
          '.fun-shape-card': { animation: 'none' }
        },
      });
    })
  ]
};

export default config;
