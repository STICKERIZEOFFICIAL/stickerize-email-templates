import { BodyWrapper } from "~/components/BodyWrapper";
import { CustomerInfo } from "~/components/shopify/CustomerInfo";
import { Footer } from "~/components/shopify/Footer";
import { Head } from "~/components/Head";
import { Header } from "~/components/shopify/Header";
import { Intro } from "~/components/shopify/Intro";
import { ORDER_NUMBER } from "~/components/shopify/orderNumber";
import { OrderTable } from "~/components/shopify/OrderTable";
import { Total } from "~/components/shopify/Total";

export default function () {
  return /*html*/ `
	
	${Head({ title: "Order confirmed. Now we make it real." })}
	${BodyWrapper({
    children: /*html*/ `
			${Header()}

			${Intro({
        // No order number in the heading. It appears once, in bold, in the
        // opening line of the body copy below.
        heading: 'Order confirmed. Now we make it real.',
        // One entry per deliberate new line, so each sits 12px below the last.
        // As a single string with <br /><br /> these ran at ~18px, the numbered
        // steps had no separation at all, and the trailing <br /> added an
        // empty line on top of the 36px gap to "Your order".
        description: [
          `Order ${ORDER_NUMBER} is in, and designs are headed for print. Here's what happens next:`,
          // One block: the steps run at the normal line-height, like a wrapped
          // sentence. 12px sits above the list and 12px below it, not between
          // its items — that spacing made the three steps read as detached.
          [
            '1. We print and cut the order.',
            '2. We ship it and send tracking information.',
            '3. You Stickerize everything.',
          ],
        ],
        showPendingPayment: false,
        showImage: false,
      })}

			${OrderTable({ heading: "Your order", gapBottom: 24 })}

			${Total()}

			${CustomerInfo({ showEstimatedDelivery: true })}

			${Footer()}
	`,
	previewText: "Designs are headed for print. Here's what happens next.",
  })}
`;
}
