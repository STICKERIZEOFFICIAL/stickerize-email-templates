import { Liquid } from 'liquidjs';
import { sampleData } from './sample-data';

/**
 * Renders the email templates the way Shopify would, so the local preview shows
 * a real email instead of Liquid source.
 *
 * Shopify's Liquid dialect adds filters that LiquidJS does not ship with. The
 * ones registered below are only the filters these templates actually use —
 * add to this list if a template starts using another one.
 */

/** 1x1 transparent-ish placeholders, so a missing Shopify asset doesn't render as a broken image. */
const PLACEHOLDER_IMAGE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="88" height="88"><rect width="88" height="88" fill="#f1efec"/><path d="M20 62l16-20 12 14 8-9 12 15z" fill="#c8c7c4"/><circle cx="32" cy="30" r="6" fill="#c8c7c4"/></svg>`,
  );

const PLACEHOLDER_TAG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"><path d="M1 7l6-6h6v6l-6 6z" fill="none" stroke="#000001" stroke-width="1.2"/><circle cx="10" cy="4" r="1.2" fill="#000001"/></svg>`,
  );

/**
 * The card mark Shopify puts in front of "ending with 4242".
 *
 * `payment_icon_png_url` and `payment_type_img_url` return a brand logo —
 * a Visa mark for a Visa card — so the line reads "Visa ending with 4242" even
 * though the word Visa is nowhere in the Liquid. A blank grey card placeholder
 * dropped that half of the sentence and left the preview saying only "ending
 * with 4242", which is not what the customer receives.
 *
 * So the placeholder carries the brand it was handed. It is still a stand-in,
 * not Shopify's artwork: the real marks are hosted on Shopify's CDN and are
 * what the sent email loads.
 */
function paymentMark(subject: unknown): string {
  const raw = String(subject ?? '').trim();
  // Both filters are fed through `downcase | replace` in places, so "credit-card"
  // and "Visa" both arrive here. Title-case whatever comes in.
  const label = raw
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b[a-z]/g, (c) => c.toUpperCase());
  const text = label || 'Card';
  // The templates render the mark at `height="16"` with `width="auto"`, so the
  // card grows sideways for a longer brand instead of squeezing the word.
  // 24 tall matches the height Shopify's own marks are drawn at.
  const fontSize = 13;
  const width = Math.max(38, Math.round(text.length * fontSize * 0.62) + 12);
  return (
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="24"><rect x="0.5" y="0.5" width="${width - 1}" height="23" rx="3" fill="#fff" stroke="#c8c7c4"/><text x="${width / 2}" y="17" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="${fontSize}" font-weight="bold" fill="#000001">${text}</text></svg>`,
    )
  );
}

function toCents(value: unknown): number {
  if (typeof value === 'number') return value;
  const parsed = Number(String(value ?? '').replace(/[^0-9.-]/g, ''));
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatMoney(value: unknown, { trailingZeros = true } = {}): string {
  const amount = toCents(value) / 100;
  const hasFraction = Math.round(amount * 100) % 100 !== 0;
  const digits = !trailingZeros && !hasFraction ? 0 : 2;
  return (
    '$' +
    amount.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: 2 })
  );
}

export function createEngine() {
  const engine = new Liquid({
    // Shopify silently renders unknown variables and filters as empty rather
    // than erroring, and the templates rely on that for optional blocks.
    strictVariables: false,
    strictFilters: false,
    jsTruthy: false,
    // Shopify renders notifications in the shop's locale; pin it so month names
    // don't follow whatever locale the developer's machine happens to use.
    locale: 'en-US',
  });

  engine.registerFilter('money', (v) => formatMoney(v));
  engine.registerFilter('money_with_currency', (v) => `${formatMoney(v)} USD`);
  engine.registerFilter('money_without_trailing_zeros', (v) =>
    formatMoney(v, { trailingZeros: false }),
  );
  engine.registerFilter('money_without_currency', (v) =>
    formatMoney(v).replace('$', ''),
  );

  engine.registerFilter('shopify_asset_url', (path: string) => {
    if (typeof path === 'string' && path.includes('discounttag')) return PLACEHOLDER_TAG;
    return PLACEHOLDER_IMAGE;
  });

  engine.registerFilter('asset_url', () => PLACEHOLDER_IMAGE);

  engine.registerFilter('img_url', (subject: unknown) => {
    if (typeof subject === 'string' && subject.startsWith('http')) return subject;
    if (subject && typeof subject === 'object') {
      const record = subject as Record<string, unknown>;
      const candidate = record.image ?? record.src ?? record.url;
      if (typeof candidate === 'string') return candidate;
    }
    return PLACEHOLDER_IMAGE;
  });

  engine.registerFilter('payment_icon_png_url', (subject: unknown) => paymentMark(subject));
  engine.registerFilter('payment_type_img_url', (subject: unknown) => paymentMark(subject));

  engine.registerFilter('format_address', (address: unknown) => {
    if (!address || typeof address !== 'object') return '';
    const a = address as Record<string, string>;
    return [
      a.name,
      a.company,
      a.address1,
      a.address2,
      [a.city, a.province_code, a.zip].filter(Boolean).join(' '),
      a.country,
    ]
      .filter(Boolean)
      .join('<br/>');
  });

  // Shopify accepts both `date: '%B %e, %Y'` and the named form
  // `date: format: 'date'`, which refers to a date format configured on the
  // shop. LiquidJS only knows the first, and renders the second as "formatdate".
  const NAMED_DATE_FORMATS: Record<string, string> = {
    date: '%B %e, %Y',
    abbreviated_date: '%b %e, %Y',
    date_at_time: '%B %e, %Y at %l:%M %p',
    default: '%B %e, %Y',
  };

  const filters = engine.filters as unknown as Record<
    string,
    (this: unknown, value: unknown, ...args: unknown[]) => unknown
  >;
  const builtinDate = filters.date;

  engine.registerFilter('date', function (this: unknown, value: unknown, ...args: unknown[]) {
    let format = args[0];
    // LiquidJS hands named arguments over as [key, value] pairs.
    if (Array.isArray(format) && format[0] === 'format') {
      format = NAMED_DATE_FORMATS[String(format[1] ?? 'default')] ?? NAMED_DATE_FORMATS.default;
    }
    return builtinDate ? builtinDate.call(this, value, format) : String(value ?? '');
  });

  engine.registerFilter('customer_url', () => 'https://stickerize.com/account');
  engine.registerFilter('link_to', (label: string, url: string) => `<a href="${url}">${label}</a>`);

  return engine;
}

const engine = createEngine();

export type RenderResult = {
  /** The rendered HTML, or the raw source if rendering failed. */
  html: string;
  /** Present when Liquid could not be parsed or evaluated. */
  error: string | null;
};

/**
 * Shopify allows `?` to end a Liquid identifier (`payment_schedule.overdue?`,
 * `line.bundle_parent?`); LiquidJS treats it as part of the name, so the lookup
 * misses the sample data. Strip the suffix so it resolves normally.
 *
 * This only rewrites inside `{% %}` and `{{ }}`. The surrounding HTML is full
 * of question marks that must survive untouched — prose ("Anything else we can
 * sort for you? Just reply.") and asset URLs ("logo.png?v=123") alike.
 */
function normalizeLiquid(source: string): string {
  return source.replace(/\{%[\s\S]*?%\}|\{\{[\s\S]*?\}\}/g, (tag) =>
    tag.replace(/([A-Za-z_][A-Za-z_0-9.]*)\?/g, '$1'),
  );
}

export async function renderLiquid(
  source: string,
  overrides?: Record<string, unknown>,
): Promise<RenderResult> {
  try {
    const data = overrides ? { ...sampleData, ...overrides } : sampleData;
    const html = await engine.parseAndRender(normalizeLiquid(source), data);
    return { html, error: null };
  } catch (cause) {
    const message = cause instanceof Error ? cause.message : String(cause);
    return { html: source, error: message };
  }
}
