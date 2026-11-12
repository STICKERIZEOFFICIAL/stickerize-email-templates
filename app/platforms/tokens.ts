/**
 * Preview-only variable substitution for the non-Shopify platforms.
 *
 * These templates are *pure HTML*. They carry no Liquid and are never handed to
 * a template engine — Rise.ai, Stamped and Klaviyo each interpolate their own
 * syntax on their own servers, and each syntax would make LiquidJS throw or
 * silently blank the tokens.
 *
 * So the rule in this compartment:
 *
 *   - `substitute()` runs ONLY on the copy that goes into the preview iframe,
 *     so the frame shows an email instead of a page full of `##couponCode##`.
 *   - Source and Download emit the template string untouched. The tokens are
 *     the point: they are what the platform's editor expects to receive.
 *
 * Anything a platform leaves unsubstituted is wrapped for display rather than
 * hidden, so an unknown variable is visible in the preview instead of reading
 * as missing copy.
 */

export type PlatformId = 'rise-ai' | 'stamped' | 'klaviyo';

/**
 * Sample values, chosen to match `app/preview/sample-data.ts` where the same
 * concept exists on the Shopify side, so an email reads the same across tabs.
 *
 * ASSUMPTION, not supplied: every value below is invented. The URLs point at
 * real Stickerize paths; the codes, names and amounts are plausible but made
 * up. Replace with the live values when they land — nothing but this file and
 * the registry's inbox lines depends on them.
 */
const SAMPLE: Record<PlatformId, Record<string, string>> = {
  // Rise.ai: Handlebars-flavoured. Triple braces are its raw/section syntax.
  'rise-ai': {
    shop_name: 'Stickerize',
    shop_url: 'https://stickerize.com',
    order_name: '#1024',
    balance: '€15.00',
    store_credit_added: '€5.00',
    code: 'STICKERIZE-5EUR',
    expiration_date: 'December 31, 2026',
    unsubscribe_url: 'https://stickerize.com/account/unsubscribe',
  },

  // Stamped: `##name##` placeholders, plus a handful of `{{label_*}}` strings
  // that Stamped resolves from its own translation table.
  stamped: {
    backgroundColor: '#fbf9f6',
    fontFamilyUrl: 'https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap',
    couponCode: 'STICKERIZE10',
    customerName: 'Alex Lindqvist',
    customerEmail: 'alex@example.com',
    shopUrl: 'https://stickerize.com',
    shopId: '12345',
    guid: '00000000-0000-0000-0000-000000000000',
    message: 'Here is the code we promised. It takes 10% off your next order.',
    hideOnline: '',
    disabledbutton: '',
    labelCouponShoppingButton: 'SHOP NOW',
    labelUnsubscribeEmail: 'UNSUBSCRIBE',
    labelUnsubscribeEmailLink: 'https://stickerize.com/account/unsubscribe',
    'shop.url': 'https://stickerize.com',
    review_url: 'https://stickerize.com/reviews/new',
    label_review_online_link_text: 'Write your review online',
    label_trouble_with_form: 'Trouble with the form?',
  },

  // Klaviyo: `{% tag %}` short tags it resolves at send time.
  klaviyo: {
    unsubscribe_link: 'https://stickerize.com/account/unsubscribe',
    web_view_link: 'https://stickerize.com/emails/view',
    'render_variable preview_text': '',
  },
};

/** Marks a token the platform owns but we have no sample for. */
function unresolved(name: string): string {
  return `<span style="outline:1px dashed #b8860b;outline-offset:2px;color:#8a6d00;" title="No sample value for ${name}">${name}</span>`;
}

function substituteRiseAi(html: string, values: Record<string, string>): string {
  return (
    html
      // Section blocks: `{{{#expiration_date}}} … {{{/expiration_date}}}`.
      // Shown when the sample has a value for the name, dropped when it does
      // not — which is how Rise evaluates them.
      .replace(
        /\{\{\{#([A-Za-z_][A-Za-z_0-9]*)\}\}\}([\s\S]*?)\{\{\{\/\1\}\}\}/g,
        (_match, name: string, inner: string) => (values[name] ? inner : ''),
      )
      // `{{{body}}}` is composed by global-theme.ts, not here; anything else in
      // triple braces is a raw variable.
      .replace(/\{\{\{\s*([A-Za-z_][A-Za-z_0-9.]*)\s*\}\}\}/g, (match, name: string) =>
        name === 'body' ? match : (values[name] ?? unresolved(match)),
      )
      .replace(/\{\{\s*([A-Za-z_][A-Za-z_0-9.]*)\s*\}\}/g, (match, name: string) =>
        values[name] ?? unresolved(match),
      )
  );
}

function substituteStamped(html: string, values: Record<string, string>): string {
  return (
    html
      .replace(/##([A-Za-z_][A-Za-z_0-9]*)##/g, (match, name: string) => {
        const value = values[name];
        // Several Stamped flags are deliberately empty strings — an empty
        // value is a real answer, so only `undefined` is unresolved.
        return value === undefined ? unresolved(match) : value;
      })
      .replace(/\{\{\s*([A-Za-z_][A-Za-z_0-9.]*)\s*\}\}/g, (match, name: string) =>
        values[name] ?? unresolved(match),
      )
  );
}

function substituteKlaviyo(html: string, values: Record<string, string>): string {
  return html.replace(/\{%\s*([^%]+?)\s*%\}/g, (match, tag: string) => {
    const value = values[tag];
    return value === undefined ? unresolved(match) : value;
  });
}

/**
 * Fills a template's tokens with sample values, for display only.
 *
 * `extra` layers over the platform defaults, for the odd template that needs a
 * different branch previewed — the same escape hatch `data` gives a Shopify
 * template in `app/preview/registry.ts`.
 */
export function substitute(
  platform: PlatformId,
  html: string,
  extra?: Record<string, string>,
): string {
  const values = extra ? { ...SAMPLE[platform], ...extra } : SAMPLE[platform];

  switch (platform) {
    case 'rise-ai':
      return substituteRiseAi(html, values);
    case 'stamped':
      return substituteStamped(html, values);
    case 'klaviyo':
      return substituteKlaviyo(html, values);
  }
}

/** The tokens a template still carries, for the "Variables" list in the view. */
export function tokensIn(platform: PlatformId, html: string): string[] {
  const patterns: Record<PlatformId, RegExp> = {
    'rise-ai': /\{\{\{?[#/]?\s*([A-Za-z_][A-Za-z_0-9.]*)\s*\}?\}\}/g,
    stamped: /##([A-Za-z_][A-Za-z_0-9]*)##|\{\{\s*([A-Za-z_][A-Za-z_0-9.]*)\s*\}\}/g,
    klaviyo: /\{%\s*([^%]+?)\s*%\}/g,
  };

  const found = new Set<string>();
  for (const match of html.matchAll(patterns[platform])) {
    const name = match[1] ?? match[2];
    if (name) found.add(name.trim());
  }
  return [...found].sort();
}

/** Whether a template's token has a sample value behind it. */
export function hasSample(platform: PlatformId, token: string): boolean {
  return SAMPLE[platform][token] !== undefined;
}
