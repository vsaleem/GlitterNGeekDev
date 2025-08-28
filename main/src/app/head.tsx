export default function Head() {
  return (
    <>
  <link rel="icon" href="/icons/icon-16x16.png" sizes="16x16" />
  <link rel="icon" href="/icons/icon-32x32.png" sizes="32x32" />
  <link rel="icon" href="/icons/icon-48x48.png" sizes="48x48" />
  <link rel="icon" href="/icons/icon-64x64.png" sizes="64x64" />
  {/* Dark mode variants */}
  <link rel="icon" href="/icons/icon-16x16-dark.png" sizes="16x16" media="(prefers-color-scheme: dark)" />
  <link rel="icon" href="/icons/icon-32x32-dark.png" sizes="32x32" media="(prefers-color-scheme: dark)" />
  <link rel="icon" href="/icons/icon-48x48-dark.png" sizes="48x48" media="(prefers-color-scheme: dark)" />
  <link rel="icon" href="/icons/icon-64x64-dark.png" sizes="64x64" media="(prefers-color-scheme: dark)" />
  <link rel="apple-touch-icon" href="/icons/icon-180x180.png" sizes="180x180" />
  <link rel="apple-touch-icon" href="/icons/icon-180x180-dark.png" sizes="180x180" media="(prefers-color-scheme: dark)" />
  <link rel="shortcut icon" href="/icons/icon-32x32.png" />
      <link rel="manifest" href="/manifest.webmanifest" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="application-name" content="GlitterNGeek" />
      <meta name="apple-mobile-web-app-title" content="GlitterNGeek" />
    </>
  );
}
