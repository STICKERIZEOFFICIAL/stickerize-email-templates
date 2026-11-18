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
import klaviyoCreators from '~/platforms/klaviyo/how-creators-turn-work-into-stickers';
import klaviyoKit from '~/platforms/klaviyo/kit';
import riseCashback from '~/platforms/rise-ai/cashback';
import riseCompensation from '~/platforms/rise-ai/compensation';
import riseGiftCard from '~/platforms/rise-ai/gift-card';
import risePrintAtHome from '~/platforms/rise-ai/print-at-home';
import riseReferral from '~/platforms/rise-ai/referral';
import riseRefund from '~/platforms/rise-ai/refund';
import riseStoreCredits from '~/platforms/rise-ai/store-credits';
import riseWallet from '~/platforms/rise-ai/wallet';
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
    blurb: 'Store credit, gift cards, rewards and refund-to-credit emails.',
    syntax: 'Handlebars-like — {{wallet_code}}, {{#gift_card_expiration}}',
    pasteInto: "Rise.ai → Emails → the template's HTML, one whole email per field",
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
    blurb: 'The collaborator flow email, and the blocks every campaign is built from.',
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
    slug: 'gift-card',
    label: 'Gift card',
    group: 'Gift cards',
    description: 'Someone bought a gift card for someone else. Sent to the recipient.',
    file: 'app/platforms/rise-ai/gift-card.ts',
    render: riseGiftCard,
    subject: '{{sender_first_name}} bought you a gift card at {{business_name}}',
    subjectStatus: 'given',
    previewText: 'Put your gift card toward custom stickers made from your own designs.',
    previewTextStatus: 'given',
    notes: [
      'The only email here that can reach someone who has never bought from us, so it keeps the card artwork Rise renders into {{greeting_image_url}} rather than the product squares.',
      'No small print: nothing in it is store credit in euros, so the conversion line would answer a question nobody asked.',
    ],
  },
  {
    slug: 'print-at-home',
    label: 'Print-at-home',
    group: 'Gift cards',
    description: 'The printable gift card, sent to the buyer to hand over in person.',
    file: 'app/platforms/rise-ai/print-at-home.ts',
    render: risePrintAtHome,
    subject: 'Your gift card is ready',
    subjectStatus: 'given',
    previewText: 'Print your Stickerize gift card at home and give it in person.',
    previewTextStatus: 'given',
    notes: [
      'Addresses the sender, not the recipient — it is the card they are about to print — so it reads {{sender_full_name}} and names who it is for.',
    ],
  },
  {
    slug: 'store-credits',
    label: 'Store credits',
    group: 'Credit',
    description: 'Cash back landed in the account.',
    file: 'app/platforms/rise-ai/store-credits.ts',
    render: riseStoreCredits,
    subject: '{{sender_first_name}}, your cash back is in your account',
    subjectStatus: 'given',
    previewText: 'Use your Stickerize credit on your next order whenever you are ready.',
    previewTextStatus: 'given',
    notes: [
      'CAUTION: other emails/new-rise.ai/store-credits.html is a 0-byte file. This carries the approved copy across from the old platform on the new variable names — diff it against Rise before release.',
      "The subject uses {{sender_first_name}} as supplied. On an email about the recipient's own cash back that looks like it wants {{recipient_full_name}} — worth a second look.",
    ],
  },
  {
    slug: 'cashback',
    label: 'Cashback',
    group: 'Credit',
    description: 'The reward an order earned, waiting in the wallet.',
    file: 'app/platforms/rise-ai/cashback.ts',
    render: riseCashback,
    subject: 'You got cashback from your last order',
    subjectStatus: 'given',
    previewText: 'Your reward is ready to put toward your next batch of custom stickers.',
    previewTextStatus: 'given',
    notes: [
      "Rise's default set the amounts out as a label-and-value grid. They read in the copy here, the way they do on the refund email.",
    ],
  },
  {
    slug: 'compensation',
    label: 'Compensation',
    group: 'Credit',
    description: 'Store credit added to make up for something that went wrong.',
    file: 'app/platforms/rise-ai/compensation.ts',
    render: riseCompensation,
    subject: 'A little something from us for the inconvenience',
    subjectStatus: 'given',
    previewText:
      'We have added store credit to your Stickerize account. Thanks for giving us a chance to make things right.',
    previewTextStatus: 'given',
  },
  {
    slug: 'referral',
    label: 'Referral',
    group: 'Credit',
    description: 'A referred friend ordered, so the referrer earned credit.',
    file: 'app/platforms/rise-ai/referral.ts',
    render: riseReferral,
    subject: 'Congrats on your successful referral!',
    subjectStatus: 'given',
    previewText: 'Your friend placed their first order. Thanks for sharing Stickerize!',
    previewTextStatus: 'given',
    notes: [
      "Rise's default closed on a social row and a second website link. Dropped — this tab's footer has carried neither since the design-system pass, and the wordmark under it is already the link home.",
    ],
  },
  {
    slug: 'refund',
    label: 'Refund to credit',
    group: 'Credit',
    description: 'A refund was issued as store credit rather than to the card.',
    file: 'app/platforms/rise-ai/refund.ts',
    render: riseRefund,
    subject: 'Your store credit for order: {{order_number}}',
    subjectStatus: 'given',
    previewText:
      'Your refund was issued as Stickerize store credit. You can use it on a future order.',
    previewTextStatus: 'given',
    notes: [
      'Already on the design system when it arrived — our own template, re-exported after the migration. Two things the new editor flattened are put back: the heading sits 24px from its body again, and the header rule is inset by 12px instead of running the full column.',
      "CHECK THIS ONE: the heading hardcoded a euro sign in front of {{issued_credit_amount}}, and Rise formats that amount with its own currency symbol — the live email reads €€5.00. The sign is removed here. It is the same bug the old platform's template had, so it has been going out for a while. Send a test before release.",
      'Carries a {{#gift_card_expiration}} section. The preview renders it present; it disappears when Rise has no expiry.',
    ],
  },
  {
    slug: 'wallet',
    label: 'Wallet',
    group: 'Credit',
    description: 'What is in the wallet right now, on request.',
    file: 'app/platforms/rise-ai/wallet.ts',
    render: riseWallet,
    subject: 'Your store credit for {{business_name}}',
    subjectStatus: 'given',
    previewText: 'Check your Stickerize wallet to see how much credit you have available.',
    previewTextStatus: 'given',
    notes: [
      'Reads the balance and code off {{gift_card_balance}} / {{gift_card_code}}, not the {{wallet_*}} names the other credit emails use. That is how the export has it, so it is left alone — but send a test, because two naming schemes in one platform is how a line turns up empty.',
      'No expiry line, matching the export: this is a statement of what is held, not news.',
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
    slug: 'how-creators-turn-work-into-stickers',
    label: 'How creators turn work into stickers',
    group: 'Emails',
    description:
      'Post-purchase flow, 42 days after fulfilment: three collaborations, two images each.',
    file: 'app/platforms/klaviyo/how-creators-turn-work-into-stickers.ts',
    render: klaviyoCreators,
    subject: 'How creators turn work into stickers',
    subjectStatus: 'given',
    previewText: "A few collaborations we've loved",
    previewTextStatus: 'given',
    notes: [
      'Built from docs in `other emails/klaviyo/how-creators-turn-work-into-stickers-template.md`, composed out of this tab\'s blocks rather than pasted from the live export.',
      'The flow\'s preview text field is empty — the line is hardcoded in the hidden preheader, as it is in the live email, so it is given rather than platform-owned.',
      'Four deliberate differences from the live export: the 724px wordmark masthead is the system 188x30 logo over a 1px rule; the button is Courier New with a text arrow, not JetBrains Mono with ico_arrow_right.png; block gaps are owned by one side (24px inside a section, 36px closing one) instead of 12px all round; the footer is this tab\'s two-column footer, which drops the GO TO STICKERIZE row and the social icons.',
      'Live as "Post purchase - Email Collaborator - 42 days after fulfilment", template ID UJkp6d.',
    ],
  },
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
 * Every template in this compartment is now whole. Rise.ai used to be the
 * exception — its bodies dropped into a Global theme held elsewhere — but its
 * new platform has no theme slot, so nothing composes at paste time.
 */
export function sourceOf(template: PlatformTemplate): string {
  return template.render();
}

/** The template as it should be looked at. Same string; the shell is added later. */
export function documentOf(_platform: PlatformId, template: PlatformTemplate): string {
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
