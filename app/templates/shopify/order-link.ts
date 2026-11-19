import { BodyWrapper } from '~/components/BodyWrapper';
import { Button } from '~/components/Button';
import { Description } from '~/components/Description';
import { Footer } from '~/components/shopify/Footer';
import { Head } from '~/components/Head';
import { Header } from '~/components/shopify/Header';
import { Intro } from '~/components/shopify/Intro';
import { ORDER_NUMBER } from '~/components/shopify/orderNumber';

/**
 * Order link — the email a customer gets when they ask for a link back to an
 * order they have already placed.
 *
 * Rebuilt from Shopify's stock notification in
 * `other emails/order-link-shopify.html`, which was still on the default
 * theme: `styles.css` from Shopify's CDN, `shop.email_accent_color` driving
 * the button, `h1`/`h2` at the stylesheet's sizes, and the shop name as a
 * text masthead.
 *
 * It is shaped like Password reset rather than like the order emails, because
 * that is what it is: a link somebody requested, with a line telling them to
 * ignore the email if they did not. So the safety sentence sits in the body
 * copy rather than in small print under the button — the same decision, and
 * the same phrasing, as `customer-account-password-reset.ts`.
 *
 * No order table, totals or customer panel. The stock template carries none
 * either, and it would be odd to summarise an order in the email whose whole
 * job is to hand over the link to it.
 *
 * Dropped from the stock version, all of it Shopify's chrome rather than
 * content:
 *
 * - the `locale_direction` / `buyer_email_rtl` machinery, which wrapped every
 *   variable in `dir` spans. Nothing here is translated yet — see the
 *   Languages section of the README — so it was switching on a variable that
 *   is never set, and it comes back with the locale work rather than before.
 * - `shop.email_accent_color` and the stylesheet link. The system's colours
 *   are inline, and the accent colour is a theme setting nobody has set.
 * - the `shopify_asset_url` spacer GIF and the `empty-line` spacer rows,
 *   which are how the default theme makes gaps. Ours are padding.
 * - the footer's "reply to this email" line, which this tab's `Footer`
 *   already carries in its own words.
 */
export default function () {
  return /*html*/ `
	{% capture email_title %}Here's the link to your order{% endcapture %}
	{% capture email_body %}You asked for a link to order ${ORDER_NUMBER}. The button below opens it: your items, where the parcel is, and your invoice. Didn't ask for this? You can safely ignore this email. Nothing on the order has changed.{% endcapture %}

	${Head({ title: '{{ email_title }}' })}
	${BodyWrapper({
    children: /*html*/ `
			${Header()}

			${Intro({
        heading: `{{ email_title }}`,
        description: null,
        showPendingPayment: false,
        showImage: false,
      })}

			${Description({
        description: /*html*/ `{{ email_body }}`,
        // 24px to the button below, not the 36px section gap: the button is
        // this copy's action, not a section of its own.
        gap: 24,
      })}

			{% if order_status_url %}
				${Button({ url: '{{ order_status_url }}', label: 'View your order', paddingTop: 0 })}
			{% endif %}

			${Footer()}
	`,
	previewText: "The link you asked for, straight to your order.",
  })}
`;
}
