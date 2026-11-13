/**
 * The order number, in bold, for use inside a sentence of body copy.
 *
 * It used to render on a standalone row of its own, which the brief removed:
 * the number now appears once per email, inside the paragraph that already
 * talks about the order. This is that one spelling, in one place, so the
 * twelve templates that name an order cannot drift apart.
 *
 * The fallback chain covers the three variable names Shopify hands these
 * notifications: `order_name` in Order Edited and the order emails that carry
 * it, `name` in the order notifications generally, and `order.name` in the
 * return notifications, which are scoped to a return rather than an order.
 * All three render with the shop's prefix (#1024); `order_number` would
 * render it bare and is deliberately not in the chain.
 */
export const ORDER_NUMBER = /*html*/ `<strong>{% if order_name %}{{ order_name }}{% elsif name %}{{ name }}{% else %}{{ order.name }}{% endif %}</strong>`;
