import posthog from 'posthog-js';

const token = process.env.NEXT_PUBLIC_POSTHOG_TOKEN;
const isDev = process.env.NODE_ENV === 'development';

if (token) {
  posthog.init(token, {
    api_host: '/my-data',
    ui_host: 'https://eu.posthog.com',
    defaults: '2026-01-30',
    // Avoid surfacing PostHog network errors in the Next.js dev overlay
    capture_exceptions: !isDev,
    debug: isDev,
    // Session replay + dead-clicks load external scripts that fail behind CSP / trusted-types
    disable_session_recording: true,
    capture_dead_clicks: false,
    // Feature flags aren't used client-side; /flags polling spams "Failed to fetch"
    advanced_disable_flags: true,
    // Keep web vitals when remote /flags config is disabled
    capture_performance: { web_vitals: true },
  });
}
