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
	{% capture email_body %}Use the link to set a new password. Didn't ask for this? You can safely ignore this email. Account stays as it is.{% endcapture %}

	${Head({ title: "{{ email_title }}" })}
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
        // 24px to the button below, not the 36px section gap: the
        // button is this copy's action, not a section of its own.
        gap: 24,
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
	previewText: "Use the link inside to set a new password.",
  })}
`;
}
