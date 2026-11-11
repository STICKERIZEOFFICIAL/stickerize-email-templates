import { BodyWrapper } from "~/components/BodyWrapper";
import { CustomerInfo } from "~/components/shopify/CustomerInfo";
import { Footer } from "~/components/shopify/Footer";
import { Head } from "~/components/Head";
import { Header } from "~/components/shopify/Header";
import { Intro } from "~/components/shopify/Intro";
import { OrderTable } from "~/components/shopify/OrderTable";
import { Total } from "~/components/shopify/Total";

export default function () {
  return /*html*/ `
	
	${Head({ title: "Order {{ order_number }} confirmed. Now we make it real." })}
	${BodyWrapper({
    children: /*html*/ `
			${Header()}

			${Intro({
        heading: "Order {{ order_number }} confirmed. Now we make it real.<br />",
        description:
          "The order is in, and designs are headed for print. Here's what happens next:<br /><br />1. We print and cut the order.<br />2. We ship it and send tracking information.<br />3. You Stickerize everything.<br /><br />Spotted a typo in your design or picked the wrong size? Reply to this email as soon as you can and we'll try to fix it before it hits the printer.<br />",
        showOrderNumber: false,
      })}

			${OrderTable({ heading: "Your order" })}

			${Total()}

			${CustomerInfo({ showEstimatedDelivery: true })}

			${Footer()}
	`,
	previewText: "Designs are headed for print. Here's what happens next.",
  })}
`;
}
