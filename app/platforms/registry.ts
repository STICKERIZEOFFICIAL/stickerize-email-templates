import klaviyoCta from '~/platforms/klaviyo/components/cta';
import klaviyoFooter from '~/platforms/klaviyo/components/footer';
import klaviyoHeading from '~/platforms/klaviyo/components/heading';
import klaviyoImage1 from '~/platforms/klaviyo/components/image-1';
import klaviyoImage2 from '~/platforms/klaviyo/components/image-2';
import klaviyoImage3 from '~/platforms/klaviyo/components/image-3';
import klaviyoImage4 from '~/platforms/klaviyo/components/image-4';
import klaviyoParagraph from '~/platforms/klaviyo/components/paragraph';
import klaviyoParagraphBold from '~/platforms/klaviyo/components/paragraph-bold';
import klaviyoUsps from '~/platforms/klaviyo/components/usps';
import klaviyoKit from '~/platforms/klaviyo/kit';
import riseGlobalTheme from '~/platforms/rise-ai/global-theme';
import riseRefund from '~/platforms/rise-ai/refund';
import riseStoreCredits from '~/platforms/rise-ai/store-credits-received';
import riseWelcome from '~/platforms/rise-ai/welcome';
import stampedCoupon from '~/platforms/stamped/coupon';
import stampedCustomForm from '~/platforms/stamped/custom-form';
import stampedReviewRequest from '~/platforms/stamped/review-request';
import stampedStandardForm from '~/platforms/stamped/standard-form';
import type { PlatformId } from '~/platforms/tokens';

/**
 * The non-Shopify email compartment.
 *
 * Deliberately separate from `app/preview/registry.ts`: nothing is shared, so
 * the two can diverge without either breaking. The Shopify side renders Liquid
 * through LiquidJS and composes emails from TSX components; these three are
 * pure HTML with the platform's own variable syntax, previewed by token
 * substitution only. See `tokens.ts`.
 *
 * The one thing this file knows about Shopify is its URLs, so the tab bar can
 * link to it. Shopify's own code imports nothing from here except that bar.
 */

export type TabId = 'shopify' | PlatformId;

export type Tab = {
  id: TabId;
  label: string;
  /** Where the tab's gallery lives. */
  href: string;
  /** One line on what the platform sends. */
  blurb: string;
  /** How the platform wants its variables written, shown in the view. */
  syntax: string;
  /**
   * What gets pasted where, since it differs per platform and is the thing
   * most easily got wrong.
   */
  pasteInto: string;
};

export const TABS: Tab[] = [
  {
    id: 'shopify',
    label: 'Shopify',
    href: '/',
    blurb: 'Order, shipping, returns and account notifications.',
    syntax: 'Liquid — {{ order.name }}, {% if %}',
    pasteInto: 'Settings → Notifications → Customer notifications',
  },
  {
    id: 'rise-ai',
    label: 'Rise.ai',
    href: '/platforms/rise-ai',
    blurb: 'Store credit, rewards and refund-to-credit emails.',
    syntax: 'Handlebars-like — {{shop_url}}, {{{#expiration_date}}}',
    pasteInto: 'Rise.ai → Email settings → Global theme, then each notification body',
  },
  {
    id: 'stamped',
    label: 'Stamped',
    href: '/platforms/stamped',
    blurb: 'Review requests and the coupon that follows a review.',
    syntax: '##couponCode## placeholders, plus a few {{label_*}} strings',
    pasteInto: 'Stamped → Settings → Emails → the matching template',
  },
  {
    id: 'klaviyo',
    label: 'Klaviyo',
    href: '/platforms/klaviyo',
    blurb: 'Campaign and flow building blocks, not a fixed set of emails.',
    syntax: 'Klaviyo tags — {% unsubscribe_link %}',
    pasteInto: "Klaviyo → the campaign's HTML block",
  },
];

export function getTab(id: string | undefined): Tab | undefined {
  return TABS.find((tab) => tab.id === id);
}

export function isPlatformId(value: string | undefined): value is PlatformId {
  return value === 'rise-ai' || value === 'stamped' || value === 'klaviyo';
}

/**
 * How confident we are in the inbox lines.
 *
 * Shopify's subjects came from Martin's approved copy. Nothing equivalent was
 * supplied for these three, so rather than present invented copy as settled,
 * every proposed line is badged in the UI and listed in
 * `docs/other-platform-emails.md`.
 */
export type CopyStatus =
  /** Shipped in the template we were given, or approved. */
  | 'given'
  /** Written here as a starting point. Needs sign-off. */
  | 'proposed'
  /** The platform owns this field and we cannot set it from the HTML. */
  | 'platform'
  /** Not applicable — the entry is not an email. */
  | 'none';

export type PlatformTemplate = {
  slug: string;
  label: string;
  /** Section heading in the sidebar and gallery. */
  group: string;
  description: string;
  /** Source file, for the toolbar. */
  file: string;
  /** Returns the template exactly as it is pasted into the platform. */
  render: () => string;
  /**
   * Rise.ai only: the body needs the global theme wrapped round it before it
   * looks like an email. Source and Download still hand over the body alone,
   * because the body is the field being edited.
   */
  wrapInGlobalTheme?: boolean;
  subject?: string;
  subjectStatus: CopyStatus;
  previewText?: string;
  previewTextStatus: CopyStatus;
  /** Extra sample values for this template only. */
  data?: Record<string, string>;
  /** Anything a reviewer should know before signing it off. */
  notes?: string[];
};

const RISE_AI: PlatformTemplate[] = [
  {
    slug: 'global-theme',
    label: 'Global theme',
    group: 'Global',
    description: 'Header, footer and dark-mode CSS that every Rise.ai email shares.',
    file: 'app/platforms/rise-ai/global-theme.ts',
    render: riseGlobalTheme,
    subjectStatus: 'none',
    previewTextStatus: 'none',
    notes: [
      'Edited once in Rise.ai, not per email. The {{{body}}} slot is where each notification drops in.',
      'The only template here with real dark-mode CSS: prefers-color-scheme plus [data-ogsc] for Outlook, driving the dm-* classes.',
    ],
  },
  {
    slug: 'welcome',
    label: 'Welcome',
    group: 'Notifications',
    description: 'Sent after a first order, introducing the account and its credits.',
    file: 'app/platforms/rise-ai/welcome.ts',
    render: riseWelcome,
    wrapInGlobalTheme: true,
    subject: 'Your Stickerize account is ready',
    subjectStatus: 'proposed',
    previewText: 'Referrals, credits and your order history, all in one place.',
    previewTextStatus: 'proposed',
    notes: [
      'Rise.ai has no preheader block, so nothing is set today — the client scrapes the top of the email instead. Adding one means a change to the Global theme.',
    ],
  },
  {
    slug: 'store-credits-received',
    label: 'Store credits received',
    group: 'Notifications',
    description: 'Credit landed in the account — the reward / cashback email.',
    file: 'app/platforms/rise-ai/store-credits-received.ts',
    render: riseStoreCredits,
    wrapInGlobalTheme: true,
    subject: 'You have {{store_credit_added}} in store credit',
    subjectStatus: 'proposed',
    previewText: 'Spend it on your next order. No code needed.',
    previewTextStatus: 'proposed',
    notes: [
      'Likely the "Reward (cashback)" email in docs/email-style-changes.md — confirm the naming.',
      '{{balance}} is still unconfirmed as a Rise.ai variable. Send a test before release.',
    ],
  },
  {
    slug: 'refund',
    label: 'Refund to credit',
    group: 'Notifications',
    description: 'A refund was issued as store credit rather than to the card.',
    file: 'app/platforms/rise-ai/refund.ts',
    render: riseRefund,
    wrapInGlobalTheme: true,
    subject: 'Your refund is now store credit',
    subjectStatus: 'proposed',
    previewText: 'It is on your account and ready to spend.',
    previewTextStatus: 'proposed',
    notes: [
      'Carries a {{{#expiration_date}}} section. The preview renders it present; it disappears when Rise has no expiry.',
    ],
  },
];

const STAMPED: PlatformTemplate[] = [
  {
    slug: 'review-request',
    label: 'Review request',
    group: 'Emails',
    description: 'Asks for a review after delivery, with the star widget inline.',
    file: 'app/platforms/stamped/review-request.ts',
    render: stampedReviewRequest,
    subject: 'How did your stickers turn out?',
    subjectStatus: 'proposed',
    previewTextStatus: 'platform',
    notes: [
      'The current export, copied from Stamped.',
      'Stamped owns the subject line in its own admin, the same way Shopify does.',
    ],
  },
  {
    slug: 'coupon',
    label: 'Coupon',
    group: 'Emails',
    description: 'Delivers the discount code promised for leaving a review.',
    file: 'app/platforms/stamped/coupon.ts',
    render: stampedCoupon,
    subject: 'Here is the code we promised',
    subjectStatus: 'proposed',
    previewText: 'Here you can find what we promised.',
    previewTextStatus: 'given',
    notes: ['The only template in this compartment that already ships a preheader.'],
  },
  {
    slug: 'standard-form',
    label: 'Standard review form',
    group: 'Forms',
    description: "Stamped's in-email review form, standard layout.",
    file: 'app/platforms/stamped/standard-form.ts',
    render: stampedStandardForm,
    subjectStatus: 'none',
    previewTextStatus: 'none',
    notes: ['A form embedded in the review request, not an email of its own.'],
  },
  {
    slug: 'custom-form',
    label: 'Custom review form',
    group: 'Forms',
    description: "Stamped's in-email review form, custom-question layout.",
    file: 'app/platforms/stamped/custom-form.ts',
    render: stampedCustomForm,
    subjectStatus: 'none',
    previewTextStatus: 'none',
    notes: ['A form embedded in the review request, not an email of its own.'],
  },
];

const KLAVIYO: PlatformTemplate[] = [
  {
    slug: 'kit',
    label: 'All components',
    group: 'Global',
    description: 'The full kit: head, logo, every block, footer — one pasteable document.',
    file: 'app/platforms/klaviyo/kit.ts',
    render: klaviyoKit,
    subjectStatus: 'platform',
    previewTextStatus: 'platform',
    notes: [
      'Klaviyo sets both inbox lines in its own campaign editor; the template only carries {% render_variable preview_text %}.',
      'No Klaviyo campaign was supplied, so this tab is a component library rather than a set of emails.',
    ],
  },
  {
    slug: 'heading',
    label: 'Heading',
    group: 'Blocks',
    description: 'Bold uppercase section heading.',
    file: 'app/platforms/klaviyo/components/heading.ts',
    render: klaviyoHeading,
    subjectStatus: 'none',
    previewTextStatus: 'none',
    notes: ['Authored here — the supplied heading.html was a 0-byte file.'],
  },
  {
    slug: 'paragraph',
    label: 'Paragraph',
    group: 'Blocks',
    description: 'Body copy.',
    file: 'app/platforms/klaviyo/components/paragraph.ts',
    render: klaviyoParagraph,
    subjectStatus: 'none',
    previewTextStatus: 'none',
  },
  {
    slug: 'paragraph-bold',
    label: 'Paragraph with lead-in',
    group: 'Blocks',
    description: 'Body copy opening on a bold sentence.',
    file: 'app/platforms/klaviyo/components/paragraph-bold.ts',
    render: klaviyoParagraphBold,
    subjectStatus: 'none',
    previewTextStatus: 'none',
  },
  {
    slug: 'cta',
    label: 'CTA button',
    group: 'Blocks',
    description: 'Full-width black button with a trailing arrow.',
    file: 'app/platforms/klaviyo/components/cta.ts',
    render: klaviyoCta,
    subjectStatus: 'none',
    previewTextStatus: 'none',
  },
  {
    slug: 'usps',
    label: 'USPs',
    group: 'Blocks',
    description: 'The selling-point row.',
    file: 'app/platforms/klaviyo/components/usps.ts',
    render: klaviyoUsps,
    subjectStatus: 'none',
    previewTextStatus: 'none',
    notes: [
      'Named usps.html. Read as selling points, not USPS the carrier — confirm, since Shopify has a USPS return-label template.',
    ],
  },
  {
    slug: 'image-1',
    label: 'Image — single',
    group: 'Images',
    description: 'One full-width image.',
    file: 'app/platforms/klaviyo/components/image-1.ts',
    render: klaviyoImage1,
    subjectStatus: 'none',
    previewTextStatus: 'none',
  },
  {
    slug: 'image-2',
    label: 'Image — two up',
    group: 'Images',
    description: 'Two images side by side.',
    file: 'app/platforms/klaviyo/components/image-2.ts',
    render: klaviyoImage2,
    subjectStatus: 'none',
    previewTextStatus: 'none',
  },
  {
    slug: 'image-3',
    label: 'Image — three up',
    group: 'Images',
    description: 'Three-column image row.',
    file: 'app/platforms/klaviyo/components/image-3.ts',
    render: klaviyoImage3,
    subjectStatus: 'none',
    previewTextStatus: 'none',
  },
  {
    slug: 'image-4',
    label: 'Image — four up',
    group: 'Images',
    description: 'Four-column image row.',
    file: 'app/platforms/klaviyo/components/image-4.ts',
    render: klaviyoImage4,
    subjectStatus: 'none',
    previewTextStatus: 'none',
  },
  {
    slug: 'footer',
    label: 'Footer',
    group: 'Global',
    description: 'Links, contact, unsubscribe and the social row.',
    file: 'app/platforms/klaviyo/components/footer.ts',
    render: klaviyoFooter,
    subjectStatus: 'none',
    previewTextStatus: 'none',
  },
];

export const TEMPLATES: Record<PlatformId, PlatformTemplate[]> = {
  'rise-ai': RISE_AI,
  stamped: STAMPED,
  klaviyo: KLAVIYO,
};

export function templatesFor(platform: PlatformId): PlatformTemplate[] {
  return TEMPLATES[platform];
}

export function getPlatformTemplate(
  platform: PlatformId,
  slug: string | undefined,
): PlatformTemplate | undefined {
  return TEMPLATES[platform].find((template) => template.slug === slug);
}

/**
 * The template as the platform's editor should receive it.
 *
 * Rise.ai bodies are *not* wrapped here: the body is the field being edited,
 * and the Global theme has its own entry. Wrapping happens only for display.
 */
export function sourceOf(template: PlatformTemplate): string {
  return template.render();
}

/** The template as it should be looked at — the only place wrapping happens. */
export function documentOf(platform: PlatformId, template: PlatformTemplate): string {
  if (platform === 'rise-ai' && template.wrapInGlobalTheme) {
    return riseGlobalTheme({ body: template.render() });
  }
  return template.render();
}

/** Previous and next template within a platform, for the toolbar. */
export function neighbours(platform: PlatformId, slug: string) {
  const list = TEMPLATES[platform];
  const index = list.findIndex((template) => template.slug === slug);
  return {
    previous: index > 0 ? list[index - 1] : undefined,
    next: index >= 0 && index < list.length - 1 ? list[index + 1] : undefined,
  };
}

/**
 * Templates bucketed by group, preserving registry order.
 *
 * Generic over anything carrying a `group`, so the galleries can bucket the
 * trimmed shape their loader serialises rather than the full entry.
 */
export function grouped<T extends { group: string }>(templates: T[]) {
  const order: string[] = [];
  const byGroup = new Map<string, T[]>();
  for (const template of templates) {
    if (!byGroup.has(template.group)) {
      byGroup.set(template.group, []);
      order.push(template.group);
    }
    byGroup.get(template.group)!.push(template);
  }
  return order.map((group) => ({ group, templates: byGroup.get(group)! }));
}

/** File extension for the Download button — each platform wants its own. */
export function downloadName(platform: PlatformId, template: PlatformTemplate): string {
  return `${platform}-${template.slug}.html`;
}
