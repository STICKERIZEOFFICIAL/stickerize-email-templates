/**
 * Ported verbatim from `other emails/rise.ai/welcome-email.html`.
 *
 * Pure HTML with the platform's own variable syntax — no Liquid, no engine.
 * The preview substitutes tokens for display only; Source and Download emit
 * this string untouched, because that is what gets pasted into the platform.
 */
export default function () {
  return /*html*/ `<div id="RiseSections">
    <!-- Photos · two squares -->
    <section rise-section="product_image" rise-section-id="e57068a930554599a9333b770fe7f253">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
            <tr>
                <td width="49%" valign="top" style="padding: 0;">
                    <img rise-element="img" src="https://cdn.shopify.com/s/files/1/0729/1394/4840/files/Email_3_Section_2_1.jpg?v=1775045331" width="344" height="344" border="0" alt="Holographic stickers" style="width: 100%; max-width: 344px; height: auto; aspect-ratio: 1 / 1; object-fit: cover; display: block;" />
                </td>
                <td width="2%" style="font-size: 0; line-height: 0;">&nbsp;</td>
                <td width="49%" valign="top" style="padding: 0;">
                    <img rise-element="img" src="https://cdn.shopify.com/s/files/1/0729/1394/4840/files/Email_3_Section_2_2.jpg?v=1775045331" width="344" height="344" border="0" alt="Prism stickers" style="width: 100%; max-width: 344px; height: auto; aspect-ratio: 1 / 1; object-fit: cover; display: block;" />
                </td>
            </tr>
        </table>
    </section>

    <!-- Intro -->
    <section rise-section="text" rise-section-id="08bd0e4b8fb04174b50073084b014b00">
        <div rise-element="text">
            <p style="font-family: 'Courier New', monospace; font-size: 13px; line-height: 13px; font-weight: bold; text-transform: uppercase; color: #000001;">
                Your account is ready.
            </p>
            <p style="font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; margin-top: 24px;">
                When you placed your order, we created a Stickerize account for you. No sign-up, no password. Log in with this email and we'll send you a code.
            </p>
            <p style="font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; margin-top: 12px;">
                Here's what you'll find inside.
            </p>
        </div>
    </section>

    <!-- Divider -->
    <section rise-section="divider" rise-section-id="8c24f00b7b2745c7befc4cea99f8b116">
        <div rise-element="divider" class="dm-line" style="height: 1px; line-height: 1px; font-size: 1px; background-color: #000001;">&nbsp;</div>
    </section>

    <!-- Referrals -->
    <section rise-section="text" rise-section-id="0034db366ac94cb49051ae11b9bb89b4">
        <div rise-element="text">
            <p class="dm-muted" style="font-family: 'Courier New', monospace; font-size: 13px; line-height: 13px; text-transform: uppercase; color: #999999;">
                Referrals
            </p>
            <p style="font-family: 'Courier New', monospace; font-size: 13px; line-height: 13px; font-weight: bold; text-transform: uppercase; color: #000001; margin-top: 12px;">
                Share your link
            </p>
            <p style="font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; margin-top: 24px;">
                Under Referrals you'll find your personal link. Send it to a friend: they get 10% off their first order, and you get &euro;5 in credits when they place it.
            </p>
        </div>
    </section>

    <!-- Divider -->
    <section rise-section="divider" rise-section-id="385ac3cd4fa5456c896575870088ad6b">
        <div rise-element="divider" class="dm-line" style="height: 1px; line-height: 1px; font-size: 1px; background-color: #000001;">&nbsp;</div>
    </section>

    <!-- Credits -->
    <section rise-section="text" rise-section-id="096908665db34827a9ce7c0106a7c662">
        <div rise-element="text">
            <p class="dm-muted" style="font-family: 'Courier New', monospace; font-size: 13px; line-height: 13px; text-transform: uppercase; color: #999999;">
                Referrals &rarr; Credits
            </p>
            <p style="font-family: 'Courier New', monospace; font-size: 13px; line-height: 13px; font-weight: bold; text-transform: uppercase; color: #000001; margin-top: 12px;">
                Earn credits on every order
            </p>
            <p style="font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; margin-top: 24px;">
                Every order earns you cash back, paid out as credits. The more you order, the more you earn. Your balance shows under Credits, at the top of Referrals.
            </p>
            <p style="font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; margin-top: 12px;">
                To use them on your next order:
            </p>
            <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation" style="margin-top: 12px;">
                <tr>
                    <td width="24" valign="top" style="font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001;">1.</td>
                    <td valign="top" style="font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001;">Log in and add your stickers to the cart.</td>
                </tr>
                <tr>
                    <td width="24" valign="top" style="font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001;">2.</td>
                    <td valign="top" style="font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001;">Hit "Apply your credits" in the cart.</td>
                </tr>
                <tr>
                    <td width="24" valign="top" style="font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001;">3.</td>
                    <td valign="top" style="font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001;">Copy the code that appears and paste it at checkout.</td>
                </tr>
            </table>
        </div>
    </section>

    <!-- Divider -->
    <section rise-section="divider" rise-section-id="eca0c5ede23e4e7f81746260613aa4f7">
        <div rise-element="divider" class="dm-line" style="height: 1px; line-height: 1px; font-size: 1px; background-color: #000001;">&nbsp;</div>
    </section>

    <!-- Brand Hub -->
    <section rise-section="text" rise-section-id="b95b715ae8894c80aaa1460d6bd127f8">
        <div rise-element="text">
            <p class="dm-muted" style="font-family: 'Courier New', monospace; font-size: 13px; line-height: 13px; text-transform: uppercase; color: #999999;">
                Brand Hub
            </p>
            <p style="font-family: 'Courier New', monospace; font-size: 13px; line-height: 13px; font-weight: bold; text-transform: uppercase; color: #000001; margin-top: 12px;">
                Reorder in one click
            </p>
            <p style="font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; margin-top: 24px;">
                Every design you order is saved in Brand Hub. Reorder any of them in one click, no new upload needed.
            </p>
        </div>
    </section>

    <!-- Divider -->
    <section rise-section="divider" rise-section-id="6177dd6cf7f349008823ed07b5b5c35a">
        <div rise-element="divider" class="dm-line" style="height: 1px; line-height: 1px; font-size: 1px; background-color: #000001;">&nbsp;</div>
    </section>

    <!-- Invoices -->
    <section rise-section="text" rise-section-id="9b8b053047b34d6799b5a00a466ba997">
        <div rise-element="text">
            <p class="dm-muted" style="font-family: 'Courier New', monospace; font-size: 13px; line-height: 13px; text-transform: uppercase; color: #999999;">
                Orders &middot; Account Settings
            </p>
            <p style="font-family: 'Courier New', monospace; font-size: 13px; line-height: 13px; font-weight: bold; text-transform: uppercase; color: #000001; margin-top: 12px;">
                Your invoices, ready to download
            </p>
            <p style="font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; margin-top: 24px;">
                Your invoices live under Orders, one per order, ready to download. Ordering for a business? Add your VAT number under Account Settings and it shows on your invoices.
            </p>
        </div>
    </section>

<!-- CTA Button -->
    <section rise-section="button" rise-section-id="1d4980f9b78b4886b5a198abb614edd1">
        <div rise-element="button-placeholder">
            <table class="dm-btn-table" width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation" bgcolor="#000001" style="background-color: #000001;">
                <tr>
                    <td align="left" valign="middle" style="padding: 23px 0 23px 12px; background-color: #000001;">
                        <a rise-element="button" class="dm-btn" href="https://stickerize.com" target="_blank" style="font-family: 'Courier New', monospace; font-size: 13px; line-height: 18px; font-weight: 300; color: #fffffe; text-decoration: none; display: block; text-transform: uppercase;">GO TO MY ACCOUNT</a>
                    </td>
                    <td align="right" valign="middle" width="40" style="padding: 23px 12px 23px 0; background-color: #000001;">
                        <a class="dm-btn" href="https://stickerize.com" target="_blank" style="font-family: 'Courier New', monospace; font-size: 13px; line-height: 18px; font-weight: 300; color: #fffffe; text-decoration: none; display: block; text-align: right;">&rarr;</a>
                    </td>
                </tr>
            </table>
        </div>
    </section>

    <!-- Small print -->
    <section rise-section="text" rise-section-id="12180ee9ff8a451c8aeba0f2326ba1f8">
        <div rise-element="text">
            <p class="dm-muted" style="font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #999999;">
                Credits are shown in euros and converted to your local currency at checkout, so the amount may vary slightly.
            </p>
        </div>
    </section>
</div>`;
}
