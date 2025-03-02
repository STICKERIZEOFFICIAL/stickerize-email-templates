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
	
	${Head({ title: "Your custom sticker order is confirmed" })}
	${BodyWrapper({
    children: /*html*/ `
			${Header()}

			${Intro({
        heading: "Your custom sticker order is confirmed<br />",
        description:
          "Thank you for choosing STICKERIZE©!<br /><br /> We’ve received your order and are already working to bring your custom stickers to life. You’ll receive another email once your order ships.<br /> If you have any questions, feel free to reach out.<br />",
        showOrderNumber: false,
      })}

			${OrderTable({ heading: "Your order" })}

			${Total()}

			${CustomerInfo({ showEstimatedDelivery: true })}

			${Footer()}
	`,
	previewText: "",
  })}
`;
}
