/**
 * NEXT_PUBLIC_SHOP_ENABLED controls all e-commerce routes.
 * Unset (production default) → /shop, /cart, /checkout, /admin and all
 * e-commerce API routes return true 404s and the nav never shows "Shop".
 * Set to "true" only in preview/staging deployments for QA.
 */
export const SHOP_ENABLED = process.env.NEXT_PUBLIC_SHOP_ENABLED === 'true';
