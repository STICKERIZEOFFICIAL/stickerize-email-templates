import { redirect } from '@remix-run/node';

/**
 * `/platforms` has no gallery of its own — the tab bar is the switcher, so
 * there is nothing for a landing page to add. Send it to the first
 * non-Shopify tab instead of 404ing a URL people will type.
 */
export async function loader() {
  return redirect('/platforms/rise-ai');
}
