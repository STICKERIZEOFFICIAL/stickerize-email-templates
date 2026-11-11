import { BodyWrapper } from "~/components/BodyWrapper";
import { Button } from "~/components/Button";
import { Description } from "~/components/Description";
import { Footer } from "~/components/shopify/Footer";
import { Head } from "~/components/Head";
import { Header } from "~/components/shopify/Header";
import { Intro } from "~/components/shopify/Intro";

export default function () {
  return /*html*/ `
	{% capture email_title %}Reset your password{% endcapture %}
	{% capture email_body %}Need to update your account access? No problem. Click the link below to reset your password and get back to creating custom stickers in no time. <br /><br /> If you didn't request a new password, you can safely delete this email.{% endcapture %}

	${Head({ title: "{{ email_title }}" })}
	${BodyWrapper({
    children: /*html*/ `
			${Header()}

			${Intro({
        heading: `{{ email_title }}`,
        description: null,
        showOrderNumber: false,
      })}

			${Description({
        description: /*html*/ `{{ email_body }}`,
      })}

			{% if customer.reset_password_url  %}
				${Button({
          url: "https://stickerize.com/account/reset-password?reset_url={{ customer.reset_password_url }}",
          label: "Reset your password",
          paddingTop: 0,
        })}
			{% endif %}

			${Footer({ showLoginSection: false })}
	`,
	previewText: "Click the link inside the email to reset your password and get back to creating custom stickers in no time.",
  })}
`;
}
