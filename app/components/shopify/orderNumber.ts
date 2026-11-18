/**
 * The order number, unstyled — the value on its own.
 *
 * The fallback chain covers the three variable names Shopify hands these
 * notifications: `order_name` in Order Edited and the order emails that carry
 * it, `name` in the order notifications generally, and `order.name` in the
 * return notifications, which are scoped to a return rather than an order.
 * All three render with the shop's prefix (#1024); `order_number` would
 * render it bare and is deliberately not in the chain.
 *
 * One spelling, in one place, so the templates that name an order cannot
 * drift apart — and so no caller reaches for a bare `{{ order_name }}`, which
 * is empty on most of these notifications.
 */
export const ORDER_NUMBER_VALUE = /*html*/ `{% if order_name %}{{ order_name }}{% elsif name %}{{ name }}{% else %}{{ order.name }}{% endif %}`;

/**
 * The same number in bold, for use inside a sentence of body copy.
 *
 * It also has a row of its own in the `CustomerInfo` panel, so most emails
 * name the order twice: once in the sentence that talks about it, once in the
 * summary panel a reader scans for exactly that kind of fact.
 */
export const ORDER_NUMBER = /*html*/ `<strong>${ORDER_NUMBER_VALUE}</strong>`;
