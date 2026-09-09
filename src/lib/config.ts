/**
 * Where the app lives. Every landing CTA points here.
 *
 * Read from VITE_APP_URL so preview deploys can target a different environment;
 * the fallback is only a last resort and must never be the value a real build
 * relies on.
 */
export const APP_URL: string =
  (import.meta.env.VITE_APP_URL as string | undefined) ?? 'https://app.dagontvangst.be';
