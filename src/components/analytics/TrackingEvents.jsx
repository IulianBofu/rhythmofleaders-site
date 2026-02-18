// Base44 analytics removed: keep API surface as no-ops so the app still builds.

/** @param {...any} _args */
export async function trackBlogPostView(..._args) {}
/** @param {...any} _args */
export async function trackBlogCTAClick(..._args) {}
/** @param {...any} _args */
export async function trackScrollDepth(..._args) {}
/** @param {...any} _args */
export async function trackGalleryImageClick(..._args) {}
/** @param {...any} _args */
export async function trackRetreatBooking(..._args) {}
/** @param {...any} _args */
export async function trackReservationFormSubmit(..._args) {}
/** @param {...any} _args */
export async function trackPageView(..._args) {}
/** @param {...any} _args */
export async function trackNavigation(..._args) {}
/** @param {...any} _args */
export async function trackEvent(..._args) {}

export default function TrackingEvents() {
  return null;
}
