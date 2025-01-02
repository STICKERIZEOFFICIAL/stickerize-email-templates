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
	
	${Head({ title: "Thank you" })}
	${BodyWrapper({
    children: /*html*/ `
			${Header()}

			${Intro({
        heading: "Thank You<br />",
        description:
          "We're getting your order ready to be shipped. We will notify you when it has been sent.<br />",
        showOrderNumber: false,
      })}

			${OrderTable({ heading: "Your order" })}

			${Total()}

			${CustomerInfo({ showEstimatedDelivery: true })}

			${Footer()}
	`,
  })}
`;
}
