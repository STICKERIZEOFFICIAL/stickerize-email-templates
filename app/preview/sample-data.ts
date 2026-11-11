/**
 * Sample data used to render the email templates in the local preview.
 *
 * Mirrors the variables Shopify exposes to customer notification templates.
 * Money values are integers in cents, exactly as Shopify sends them, so the
 * `money*` filters in `liquid.server.ts` behave as they do in production.
 *
 * Preview-only — this file is never shipped to Shopify.
 */

/**
 * Square stand-in for a product photo. Inline rather than a CDN image so the
 * preview works offline and the thumbnails stay the shape a real product image
 * would be (Shopify crops line item images square).
 */
function productImage(label: string, fill: string) {
  return (
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">` +
        `<rect width="120" height="120" fill="#fbf9f6"/>` +
        `<rect x="18" y="18" width="84" height="84" rx="14" fill="${fill}" stroke="#000001" stroke-width="3"/>` +
        `<text x="60" y="66" text-anchor="middle" font-family="Courier New, monospace" font-size="15" font-weight="700" fill="#000001">${label}</text>` +
        `</svg>`,
    )
  );
}

const THUMB = productImage('STKR', '#d9f5e3');

const shippingAddress = {
  first_name: 'Mia',
  last_name: 'Kowalski',
  name: 'Mia Kowalski',
  company: null,
  address1: '412 Dekalb Ave',
  address2: 'Apt 3R',
  street: '412 Dekalb Ave Apt 3R',
  city: 'Brooklyn',
  province: 'New York',
  province_code: 'NY',
  zip: '11205',
  country: 'United States',
  country_code: 'US',
  phone: '+1 347 555 0142',
};

const billingAddress = { ...shippingAddress };

function lineItem({
  title,
  variant = 'Default Title',
  quantity = 1,
  price,
  compareAt,
  properties = {},
  refunded = 0,
  image = THUMB,
}: {
  title: string;
  variant?: string;
  quantity?: number;
  price: number;
  compareAt?: number;
  properties?: Record<string, string>;
  refunded?: number;
  image?: string;
}) {
  const final = price * quantity;
  const original = (compareAt ?? price) * quantity;
  return {
    title,
    quantity,
    price,
    line_price: final,
    final_line_price: final,
    original_line_price: original,
    final_price: price,
    original_price: compareAt ?? price,
    requires_shipping: true,
    gift_card: false,
    taxable: true,
    refunded_quantity: refunded,
    sku: 'STK-' + title.replace(/\W+/g, '-').toUpperCase().slice(0, 12),
    vendor: 'STICKERIZE',
    product: { title },
    variant: { title: variant, price },
    properties: { _thumb: image, ...properties },
    groups: [],
    bundle_components: [],
    discount_allocations: [],
    selling_plan_allocation: null,
    image,
  };
}

const subtotalLineItems = [
  lineItem({
    title: 'Holographic Sticker Pack',
    variant: '3in / Glossy',
    quantity: 1,
    price: 2400,
    properties: { Size: '3 in', Quantity: '25', _cut: 'Die cut', _stkType: 'Holographic' },
  }),
  lineItem({
    image: productImage('DECAL', '#ffe6ef'),
    title: 'Matte Vinyl Decal',
    variant: '2in / Matte',
    quantity: 2,
    price: 600,
    compareAt: 800,
    properties: { Size: '2 in', Quantity: '50', _cut: 'Kiss cut', _stkType: 'Matte vinyl' },
  }),
];

// Attach a line-level discount so the discount-tag branch of OrderTable renders.
subtotalLineItems[1].discount_allocations = [
  {
    amount: 400,
    discount_application: {
      title: 'WELCOME10',
      type: 'discount_code',
      target_selection: 'entitled',
    },
  },
] as never;

// Scenario 2 in OrderTable: a bundle rendered as a grouped line item.
const lineItemGroups = [
  {
    title: 'Starter Bundle',
    quantity: 1,
    image: THUMB,
    components: [
      {
        ...lineItem({ title: 'Sticker Sheet A5', variant: 'A5', price: 900 }),
        properties: { Finish: 'Glossy', _thumb: THUMB },
        image: productImage('A5', '#e7e3ff'),
      },
      {
        ...lineItem({ title: 'Transfer Squeegee', price: 300 }),
        properties: {},
      },
    ],
  },
];

const transaction = {
  id: 4821907364,
  amount: 3600,
  status: 'success',
  kind: 'sale',
  created_at: '2026-11-08T10:12:00-05:00',
  gateway: 'shopify_payments',
  gateway_display_name: 'Visa',
  buyer_pending_payment_notice: null,
  payment_details: {
    type: 'credit_card',
    credit_card_company: 'Visa',
    credit_card_last_four_digits: '4242',
    gift_card_last_four_digits: null,
    gift_card: null,
  },
};

export const sampleData: Record<string, unknown> = {
  // --- Shop -----------------------------------------------------------------
  shop: {
    // Mirrors the store name in Shopify's settings — whatever is set there is
    // what {{ shop.name }} prints. No © unless the store name itself has one.
    name: 'Stickerize',
    email: 'help@stickerize.com',
    url: 'https://stickerize.com',
    domain: 'stickerize.com',
    phone: '+1 347 555 0100',
    address: { summary: 'Brooklyn, NY, United States' },
    permanent_domain: 'stickerize.myshopify.com',
  },

  // --- Customer -------------------------------------------------------------
  customer: {
    first_name: 'Mia',
    last_name: 'Kowalski',
    name: 'Mia Kowalski',
    email: 'mia.kowalski@example.com',
    phone: '+1 347 555 0142',
    tags: [],
    orders_count: 3,
    total_spent: 11200,
    default_address: shippingAddress,
    // The account emails gate their button on these, so without them the CTA
    // never renders in the preview.
    account_activation_url: 'https://stickerize.com/account/activate/sample',
    reset_password_url: 'https://stickerize.com/account/reset/sample',
  },

  // --- Order ----------------------------------------------------------------
  order: {
    name: '#1024',
    order_number: 1024,
    created_at: '2026-11-08T10:12:00-05:00',
    total_price: 3600,
    subtotal_price: 3600,
    total_tax: 0,
    total_outstanding: 1200,
    total_discounts: 400,
    financial_status: 'paid',
    fulfillment_status: 'fulfilled',
    line_items: subtotalLineItems,
    cancel_reason: 'customer',
    note: null,
  },

  order_name: '#1024',
  order_number: 1024,
  name: '#1024',
  item_count: 3,
  total_price: 3600,
  subtotal_price: 3600,
  total_tax: 0,
  total_discounts: 400,
  total_order_discount_amount: 400,
  financial_status: 'paid',
  financial_status_label: 'Paid',
  cancel_reason: 'customer',
  cancelled_at: '2026-11-09T09:00:00-05:00',
  created_at: '2026-11-08T10:12:00-05:00',

  subtotal_line_items: subtotalLineItems,
  line_items: subtotalLineItems,
  line_item_groups: lineItemGroups,

  // --- Discounts ------------------------------------------------------------
  discount_applications: [
    {
      title: 'WELCOME10',
      type: 'discount_code',
      target_type: 'line_item',
      target_selection: 'entitled',
      total_allocated_amount: 400,
    },
  ],

  // --- Shipping / fulfillment ----------------------------------------------
  requires_shipping: true,
  shipping_price: 0,
  shipping_method: { title: 'Express (2-3 business days)', price: 0 },
  delivery_method: { instructions: null },
  shipping_address: shippingAddress,
  billing_address: billingAddress,
  consolidated_estimated_delivery_time: 'Nov 14 - Nov 18',
  estimated_delivery_at: '2026-11-16T00:00:00-05:00',

  fulfillment: {
    item_count: 3,
    tracking_company: 'USPS',
    tracking_number: '9400111899223817171718',
    tracking_numbers: ['9400111899223817171718'],
    tracking_url:
      'https://tools.usps.com/go/TrackConfirmAction?tLabels=9400111899223817171718',
    tracking_urls: [
      'https://tools.usps.com/go/TrackConfirmAction?tLabels=9400111899223817171718',
    ],
    fulfillment_line_items: subtotalLineItems,
    estimated_delivery_at: '2026-11-16T00:00:00-05:00',
  },
  fulfillment_status: 'fulfilled',
  tracking_number: '9400111899223817171718',
  tracking_numbers: ['9400111899223817171718'],
  tracking_url: 'https://tools.usps.com/go/TrackConfirmAction?tLabels=9400111899223817171718',
  tracking_company: 'USPS',

  // --- Payment --------------------------------------------------------------
  transaction,
  transactions: [transaction],
  transaction_id: 4821907364,
  payment_terms: {
    translated_name: 'Net 30',
    payment_terms_name: 'Net 30',
    due_in_days: 30,
    next_payment: { due_at: '2026-12-08T00:00:00-05:00', amount_due: 1200 },
    payment_schedules: [
      { due_at: '2026-12-08T00:00:00-05:00', amount_due: 1200, completed_at: null },
    ],
  },
  payment_schedule: {
    due_at: '2026-12-08T00:00:00-05:00',
    amount_due: 1200,
    // Shopify exposes these as `overdue?` / `due_later?`; normalizeLiquid in
    // liquid.server.ts drops the `?` so they resolve to these keys.
    overdue: false,
    due_later: true,
    due_in_days: 7,
    number_of_days_overdue: 0,
    completed_at: null,
  },
  due_date: '2026-12-08T00:00:00-05:00',
  po_number: 'PO-55120',
  company_location: { name: 'Brooklyn Studio', external_id: 'BK-1' },
  b2b: false,

  // --- Refunds / returns ----------------------------------------------------
  refund_line_items: [{ line_item: subtotalLineItems[1], quantity: 1, subtotal: 600, price: 600 }],
  refund_method_title: 'Visa ending in 4242',
  refund_amount: 600,
  return: {
    name: '#1024-R1',
    decline_note:
      'The items were marked as used, which falls outside our 30 day return policy.',
    return_line_items: [{ line_item: subtotalLineItems[1], quantity: 1 }],
  },
  return_label: {
    tracking_number: '9405511899223817171719',
    tracking_url: 'https://tools.usps.com/go/TrackConfirmAction?tLabels=9405511899223817171719',
    carrier_name: 'USPS',
    label_url: 'https://stickerize.com/returns/label.pdf',
  },
  return_delivery_first: {
    tracking_number: '9405511899223817171719',
    tracking_url: 'https://tools.usps.com/go/TrackConfirmAction?tLabels=9405511899223817171719',
    carrier_name: 'USPS',
  },

  // --- URLs -----------------------------------------------------------------
  order_status_url: 'https://stickerize.com/orders/status/sample',
  order_details_url: 'https://stickerize.com/orders/1024',
  account_link: 'https://stickerize.com/account',
  customer_account_url: 'https://stickerize.com/account',
  email_confirmation_url: 'https://stickerize.com/account/confirm/sample',
  checkout_payment_collection_url: 'https://stickerize.com/checkout/pay/sample',
  abandoned_checkout_url: 'https://stickerize.com/checkout/recover/sample',
  // NOTE: no bare `url`. Shopify documents `url` only as a line item property,
  // not as a top-level notification variable, so payment-error's
  // `{% if url %}` guard is false in production. Defining it here would hide
  // that: the preview would show a button real customers never get.

  // --- Copy slots -----------------------------------------------------------
  // Most templates {% capture %} these themselves; these fallbacks only surface
  // for the templates where Shopify passes the copy in.
  //
  // `custom_message` is blank by default on purpose: Shopify only fills it when
  // a staff member types a note, and several templates render it *instead of*
  // their own copy. Leaving it set would hide the copy we actually ship.
  // Templates that need one set it via `data` in registry.ts.
  custom_message: null,
  email_title: 'Your custom stickers',
  email_body: 'Thanks for choosing STICKERIZE©.',
};
