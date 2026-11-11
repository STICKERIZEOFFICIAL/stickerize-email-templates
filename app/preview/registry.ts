import abandonedCheckout from '~/templates/shopify/abandoned-checkout';
import contactCustomer from '~/templates/shopify/contact-customer';
import customerAccountInvite from '~/templates/shopify/customer-account-invite';
import customerAccountPasswordReset from '~/templates/shopify/customer-account-password-reset';
import customerAccountWelcome from '~/templates/shopify/customer-account-welcome';
import customerMarketingConfirmation from '~/templates/shopify/customer-marketing-confirmation';
import customerPaymentMethodRestoreRequest from '~/templates/shopify/customer-payment-method-restore-request';
import customerPaymentMethodUpdateRequest from '~/templates/shopify/customer-payment-method-update-request';
import delivered from '~/templates/shopify/delivered';
import orderCanceled from '~/templates/shopify/order-canceled';
import orderConfirmation from '~/templates/shopify/order-confirmation';
import orderEdited from '~/templates/shopify/order-edited';
import orderInvoice from '~/templates/shopify/order-invoice';
import orderPaymentReceipt from '~/templates/shopify/order-payment-receipt';
import orderRefund from '~/templates/shopify/order-refund';
import outForDelivery from '~/templates/shopify/out-for-delivery';
import paymentError from '~/templates/shopify/payment-error';
import paymentReminder from '~/templates/shopify/payment-reminder';
import pendingPaymentError from '~/templates/shopify/pending-payment-error';
import pendingPaymentSuccess from '~/templates/shopify/pending-payment-success';
import returnRequestApproved from '~/templates/shopify/return-request-approved';
import returnRequestDeclined from '~/templates/shopify/return-request-declined';
import returnRequestReceived from '~/templates/shopify/return-request-received';
import shippingConfirmation from '~/templates/shopify/shipping-confirmation';
import shippingUpdate from '~/templates/shopify/shipping-update';
import uspsReturnLabelCreated from '~/templates/shopify/usps-return-label-created';

/**
 * Every Shopify notification template, grouped by where it sits in the customer
 * lifecycle. The order of `GROUPS` and of the entries below drives the sidebar,
 * the gallery, and prev/next navigation — so keep them in the order a customer
 * would actually receive them.
 */

export const GROUPS = [
  'Checkout',
  'Order',
  'Payment',
  'Shipping',
  'Returns',
  'Account',
  'Support',
] as const;

export type Group = (typeof GROUPS)[number];

export type Template = {
  /** URL segment, and the template's filename under `app/templates/shopify/`. */
  slug: string;
  /** Human label shown in the UI. */
  label: string;
  group: Group;
  /** One line on when Shopify sends this email. */
  description: string;
  /** Returns the template's Liquid + HTML source. */
  render: () => string;
  /**
   * Fields layered over `sampleData` for this template only, to steer it onto
   * the branch worth previewing. Use sparingly — the shared fixture should
   * cover the common case.
   */
  data?: Record<string, unknown>;
};

export const TEMPLATES: Template[] = [
  {
    slug: 'abandoned-checkout',
    label: 'Abandoned checkout',
    group: 'Checkout',
    description: 'Customer left items in the cart without paying.',
    render: abandonedCheckout,
  },
  {
    slug: 'order-confirmation',
    label: 'Order confirmation',
    group: 'Order',
    description: 'Sent immediately after an order is placed.',
    render: orderConfirmation,
  },
  {
    slug: 'order-edited',
    label: 'Order edited',
    group: 'Order',
    description: 'Line items or quantities changed after purchase.',
    render: orderEdited,
  },
  {
    slug: 'order-invoice',
    label: 'Order invoice',
    group: 'Order',
    description: 'Invoice for a draft or unpaid order.',
    render: orderInvoice,
  },
  {
    slug: 'order-canceled',
    label: 'Order canceled',
    group: 'Order',
    description: 'Order was canceled, with or without a refund.',
    render: orderCanceled,
  },
  {
    slug: 'order-refund',
    label: 'Order refund',
    group: 'Order',
    description: 'A refund was issued against the order.',
    render: orderRefund,
    // Preview the full refund, which is the branch the copy was written for.
    // A partial refund keeps its own separate title.
    data: { item_count: 1 },
  },
  {
    slug: 'order-payment-receipt',
    label: 'Payment receipt',
    group: 'Payment',
    description: 'Receipt for a successful payment.',
    render: orderPaymentReceipt,
  },
  {
    slug: 'payment-reminder',
    label: 'Payment reminder',
    group: 'Payment',
    description: 'Net-terms invoice is coming due.',
    render: paymentReminder,
  },
  {
    slug: 'payment-error',
    label: 'Payment error',
    group: 'Payment',
    description: 'Payment attempt was declined.',
    render: paymentError,
  },
  {
    slug: 'pending-payment-success',
    label: 'Pending payment success',
    group: 'Payment',
    description: 'A delayed payment method finally cleared.',
    render: pendingPaymentSuccess,
  },
  {
    slug: 'pending-payment-error',
    label: 'Pending payment error',
    group: 'Payment',
    description: 'A delayed payment method failed to clear.',
    render: pendingPaymentError,
  },
  {
    slug: 'customer-payment-method-update-request',
    label: 'Payment method update',
    group: 'Payment',
    description: 'Asks the customer to update a stored card.',
    render: customerPaymentMethodUpdateRequest,
  },
  {
    slug: 'customer-payment-method-restore-request',
    label: 'Payment method restore',
    group: 'Payment',
    description: 'Asks the customer to restore a removed payment method.',
    render: customerPaymentMethodRestoreRequest,
  },
  {
    slug: 'shipping-confirmation',
    label: 'Shipping confirmation',
    group: 'Shipping',
    description: 'Order has shipped, with tracking.',
    render: shippingConfirmation,
  },
  {
    slug: 'shipping-update',
    label: 'Shipping update',
    group: 'Shipping',
    description: 'Tracking details changed after shipping.',
    render: shippingUpdate,
  },
  {
    slug: 'out-for-delivery',
    label: 'Out for delivery',
    group: 'Shipping',
    description: 'Carrier is delivering the package today.',
    render: outForDelivery,
  },
  {
    slug: 'delivered',
    label: 'Delivered',
    group: 'Shipping',
    description: 'Carrier marked the package as delivered.',
    render: delivered,
  },
  {
    slug: 'return-request-received',
    label: 'Return received',
    group: 'Returns',
    description: 'Customer submitted a return request.',
    render: returnRequestReceived,
  },
  {
    slug: 'return-request-approved',
    label: 'Return approved',
    group: 'Returns',
    description: 'Return was approved, with shipping instructions.',
    render: returnRequestApproved,
  },
  {
    slug: 'return-request-declined',
    label: 'Return declined',
    group: 'Returns',
    description: 'Return was declined, with a reason.',
    render: returnRequestDeclined,
  },
  {
    slug: 'usps-return-label-created',
    label: 'USPS return label',
    group: 'Returns',
    description: 'A prepaid USPS return label is ready.',
    render: uspsReturnLabelCreated,
  },
  {
    slug: 'customer-account-invite',
    label: 'Account invite',
    group: 'Account',
    description: 'Invitation to activate a customer account.',
    render: customerAccountInvite,
  },
  {
    slug: 'customer-account-welcome',
    label: 'Account welcome',
    group: 'Account',
    description: 'Account was created successfully.',
    render: customerAccountWelcome,
  },
  {
    slug: 'customer-account-password-reset',
    label: 'Password reset',
    group: 'Account',
    description: 'Password reset link.',
    render: customerAccountPasswordReset,
  },
  {
    slug: 'customer-marketing-confirmation',
    label: 'Marketing confirmation',
    group: 'Account',
    description: 'Double opt-in for marketing emails.',
    render: customerMarketingConfirmation,
  },
  {
    slug: 'contact-customer',
    label: 'Contact customer',
    group: 'Support',
    description: 'Free-form message sent from the Shopify admin.',
    render: contactCustomer,
    // This email is nothing but the staff note, so it needs one.
    data: {
      custom_message:
        'Just a quick note from the studio: we bumped your order to the front of the cut queue, so it should ship a day early.',
    },
  },
];

export function getTemplate(slug: string | undefined): Template | undefined {
  return TEMPLATES.find((template) => template.slug === slug);
}

export function sourcePath(slug: string): string {
  return `app/templates/shopify/${slug}.ts`;
}

/** Previous and next template in lifecycle order, for the preview toolbar. */
export function neighbours(slug: string) {
  const index = TEMPLATES.findIndex((template) => template.slug === slug);
  return {
    previous: index > 0 ? TEMPLATES[index - 1] : undefined,
    next: index >= 0 && index < TEMPLATES.length - 1 ? TEMPLATES[index + 1] : undefined,
  };
}

/** Templates bucketed by group, preserving `GROUPS` order and dropping empties. */
export function grouped(templates: Template[] = TEMPLATES) {
  return GROUPS.map((group) => ({
    group,
    templates: templates.filter((template) => template.group === group),
  })).filter((bucket) => bucket.templates.length > 0);
}
