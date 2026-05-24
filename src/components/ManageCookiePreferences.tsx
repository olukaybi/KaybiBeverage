'use client';

const CONSENT_KEY = 'kayora-consent-v1';

export default function ManageCookiePreferences() {
  function resetConsent() {
    localStorage.removeItem(CONSENT_KEY);
    window.location.reload();
  }

  return (
    <button
      onClick={resetConsent}
      className="text-kayora-blue-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 rounded-sm"
    >
      Manage cookie preferences
    </button>
  );
}
