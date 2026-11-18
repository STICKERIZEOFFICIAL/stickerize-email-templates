/**
 * The chrome and the blocks every Rise.ai email is built from.
 *
 * Rise's new platform has no Global theme and no stylesheet slot: each email
 * is one self-contained fragment, and every rule has to be an inline style
 * because nothing else survives. That is why the old `global-theme.ts` is
 * gone — there is no longer a field to paste it into.
 *
 * The platform not composing does not mean we cannot. Hand-copying a header
 * and a two-column footer into eight files is how eight files drift, so the
 * chrome lives here once and each template supplies only its sections. What
 * `render()` returns is still the whole fragment, byte for byte what gets
 * pasted into Rise — composition happens here, never at paste time.
 *
 * Styles are written out in full rather than leaning on a reset. With no
 * stylesheet a bare `<p>` keeps the client's default margin, so `margin: 0`
 * is load-bearing, not noise.
 */

const MONO = `font-family: 'Courier New', monospace;`;

/**
 * Merges style fragments, last declaration winning.
 *
 * Inline styles here are a base plus a local override, and stacking the two as
 * text produces `padding: 0; padding: 0 12px` — correct by the cascade, but it
 * leaves two answers in the attribute for an email client's sanitiser to pick
 * between. One declaration per property, always.
 */
function style(...parts: string[]): string {
  const declarations = new Map<string, string>();
  for (const part of parts) {
    for (const declaration of part.split(';')) {
      const at = declaration.indexOf(':');
      if (at === -1) continue;
      const property = declaration.slice(0, at).trim();
      if (property) declarations.set(property, declaration.slice(at + 1).trim());
    }
  }
  return [...declarations].map(([property, value]) => `${property}: ${value};`).join(' ');
}

const RESET = `${MONO} margin: 0; padding: 0;`;

/** 13/13 bold uppercase — the system's heading. */
const HEADING = `${RESET} font-size: 13px; line-height: 13px; font-weight: bold; text-transform: uppercase; color: #000001;`;

/** 13/17 — the system's body copy. */
const BODY = `${RESET} font-size: 13px; line-height: 17px; color: #000001;`;

/** Body copy stepped back, for small print. */
const MUTED = style(BODY, 'color: #999999');

const LINK = style(RESET, 'color: #000001', 'cursor: pointer', 'text-decoration: none');
const LINK_U = style(LINK, 'text-decoration: underline');

/**
 * Gaps, and the one side that owns each.
 *
 * Rise's own brief sets `section { margin: 24px 0 }` as the platform's single
 * rhythm, so sections keep it. Inside a text block the system applies: 24px
 * from a heading to its body, 12px between sibling paragraphs.
 */
const SECTION = style(RESET, 'margin: 24px 0');
const GAP_TO_BODY = 24;
const GAP_BETWEEN = 12;

/** Indentation, so the emitted HTML reads like the file it is pasted into. */
const I = (depth: number) => '\n' + ' '.repeat(depth * 4);

/**
 * A heading with its body copy.
 *
 * The heading is the email's one sentence in bold caps; everything after it is
 * ordinary body copy, the first 24px below the heading and the rest 12px apart.
 */
export function text(heading: string, body: string[] = []): string {
  const paragraphs = body.map(
    (line, index) =>
      `${I(4)}<p style="${style(BODY, `margin-top: ${index === 0 ? GAP_TO_BODY : GAP_BETWEEN}px`)}">` +
      `${I(5)}${line}${I(4)}</p>`,
  );

  return (
    `<section rise-section="text" style="${SECTION}">` +
    `${I(3)}<div rise-element="text" style="${RESET}">` +
    `${I(4)}<p style="${HEADING}">${I(5)}${heading}${I(4)}</p>` +
    paragraphs.join('') +
    `${I(3)}</div>${I(2)}</section>`
  );
}

/** Body copy with no heading over it — a closing note, a personal message. */
export function note(lines: string[], { muted = false } = {}): string {
  const base = muted ? MUTED : BODY;
  const paragraphs = lines.map(
    (line, index) =>
      `${I(4)}<p${muted ? ' class="dm-muted"' : ''} style="${index === 0 ? base : style(base, `margin-top: ${GAP_BETWEEN}px`)}">` +
      `${I(5)}${line}${I(4)}</p>`,
  );

  return (
    `<section rise-section="text" style="${SECTION}">` +
    `${I(3)}<div rise-element="text" style="${RESET}">` +
    paragraphs.join('') +
    `${I(3)}</div>${I(2)}</section>`
  );
}

/** The line every store-credit email closes on. */
export function smallPrint(): string {
  return note(
    [
      'Credits are shown in euros and converted to your local currency at checkout, so the amount may vary slightly.',
    ],
    { muted: true },
  );
}

const PHOTO = style(
  RESET,
  'display: block',
  'width: 100%',
  'max-width: 344px',
  'height: auto',
  'aspect-ratio: 1 / 1',
  'object-fit: cover',
);

/**
 * The two product squares the approved emails open on.
 *
 * 49 / 2 / 49, in percentages because there is no stylesheet to stack them on
 * a phone — the columns have to hold their proportions at any width.
 */
export function photos(): string {
  const square = (src: string, alt: string) =>
    `${I(4)}<td width="49%" valign="top" style="${RESET}">` +
    `${I(5)}<img rise-element="img" src="${src}" width="344" height="344" border="0" alt="${alt}" style="${PHOTO}">` +
    `${I(4)}</td>`;

  return (
    `<section rise-section="product_image" style="${SECTION}">` +
    `${I(3)}<table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation" style="${RESET}">` +
    `${I(4)}<tr style="${RESET}">` +
    square(
      'https://cdn.shopify.com/s/files/1/0729/1394/4840/files/Photo_holographic_stickers_product_shot_left.png?v=1793662793',
      'Holographic stickers',
    ) +
    `${I(4)}<td width="2%" style="${style(RESET, 'font-size: 0', 'line-height: 0')}">&nbsp;</td>` +
    square(
      'https://cdn.shopify.com/s/files/1/0729/1394/4840/files/Photo_prism_stickers_product_shot_right_1.png?v=1793662808',
      'Prism stickers',
    ) +
    `${I(4)}</tr>${I(3)}</table>${I(2)}</section>`
  );
}

/** One full-width image — the gift card artwork Rise renders per recipient. */
export function image(src: string, alt: string): string {
  const img = style(RESET, 'display: block', 'width: 100%', 'height: auto');
  return (
    `<section rise-section="product_image" style="${SECTION}">` +
    `${I(3)}<img rise-element="img" src="${src}" width="708" border="0" alt="${alt}" style="${img}">` +
    `${I(2)}</section>`
  );
}

/**
 * The boxed code.
 *
 * Sits 12px from the button under it rather than the full 24px: the code and
 * the button that spends it are one thought, and the section rhythm would
 * otherwise read as two.
 */
export function codeBox(label: string, token: string): string {
  const box = style(RESET, 'border: 1px solid #000001', 'padding: 23px 12px', 'text-align: center');
  return (
    `<section rise-section="credit_code" style="${style(SECTION, `margin-bottom: ${GAP_BETWEEN}px`)}">` +
    `${I(3)}<div rise-element="credit_code" class="dm-border" style="${box}">` +
    `${I(4)}<p style="${style(BODY, 'text-align: center')}">` +
    `${I(5)}${label} ${token}${I(4)}</p>` +
    `${I(3)}</div>${I(2)}</section>`
  );
}

/**
 * The black bar, label left and a text arrow right.
 *
 * The arrow is the character, not `ico_arrow.png`: it inherits the link colour,
 * so it survives the inversion clients force in dark mode, and it cannot skew.
 */
export function button(label: string, href: string, { tight = false } = {}): string {
  const link = style(
    RESET,
    'font-size: 13px',
    'line-height: 18px',
    'font-weight: 300',
    'color: #fffffe',
    'text-decoration: none',
    'display: block',
  );
  const cell = style(RESET, 'background-color: #000001');

  return (
    `<section rise-section="button" style="${tight ? style(SECTION, `margin-top: ${GAP_BETWEEN}px`) : SECTION}">` +
    `${I(3)}<div rise-element="button-placeholder" style="${RESET}">` +
    `${I(4)}<table class="dm-btn-table" width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation" bgcolor="#000001" style="${cell}">` +
    `${I(5)}<tr style="${RESET}">` +
    `${I(6)}<td align="left" valign="middle" style="${style(cell, 'padding: 23px 0 23px 12px')}">` +
    `${I(7)}<a rise-element="button" class="dm-btn" href="${href}" target="_blank" style="${style(link, 'text-transform: uppercase')}">${label}</a>` +
    `${I(6)}</td>` +
    `${I(6)}<td align="right" valign="middle" width="40" style="${style(cell, 'padding: 23px 12px 23px 0')}">` +
    `${I(7)}<a class="dm-btn" href="${href}" target="_blank" style="${style(link, 'text-align: right')}">&rarr;</a>` +
    `${I(6)}</td>` +
    `${I(5)}</tr>${I(4)}</table>${I(3)}</div>${I(2)}</section>`
  );
}

/**
 * The expiry line, present only when Rise has a date.
 *
 * `{{#name}} … {{/name}}` is the new platform's section syntax — the old one
 * wrote the same thing in triple braces.
 */
export function expiration(token: string): string {
  return (
    `<div rise-section="expiration_date" style="${RESET}">` +
    `${I(3)}{{#${token}}}` +
    `${I(3)}<section style="${SECTION}">` +
    `${I(4)}<div rise-element="expiration_date" style="${RESET}">` +
    `${I(5)}<p style="${style(BODY, 'text-align: center')}">` +
    `${I(6)}Expires on {{${token}}}${I(5)}</p>` +
    `${I(4)}</div>${I(3)}</section>` +
    `${I(3)}{{/${token}}}${I(2)}</div>`
  );
}

/**
 * Header, footer and the table they hang on.
 *
 * The header rule sits on an inner cell, not on the padded header itself: a
 * cell's border spans its own padding, so a border out there runs the full
 * width of the column instead of lining up with the 12px inset every other
 * divider keeps.
 */
export function riseEmail(sections: string[]): string {
  const column = style(RESET, 'font-size: 0pt', 'line-height: 0pt', 'font-weight: normal');

  return /*html*/ `<div style="${style(RESET, 'box-sizing: border-box', 'color-scheme: light dark', 'supported-color-schemes: light dark')}">
    <table class="main" rise-template="main" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="${style(RESET, 'background-color: #fbf9f6', 'padding: 12px 0')}">
        <tbody style="${RESET}">
            <tr style="${RESET}">
                <td align="center" valign="top" style="${RESET}">
                    <table rise-template="container" class="container" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="${style(RESET, 'max-width: 732px !important')}">
                        <thead style="${RESET}">
                            <tr style="${RESET}">
                                <th class="header" rise-template="header" style="${style(RESET, 'padding: 0 12px')}">
                                    <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="${RESET}">
                                        <tr style="${RESET}">
                                            <td class="header-inner" style="${style(RESET, 'border-bottom: 1px solid #000001', 'padding-bottom: 12px')}">
                                                <a rise-template="logo-link" href="{{shop_url}}" style="${style(LINK, 'display: block', 'text-align: left')}">
                                                    <img rise-template="logo" class="dm-invert" src="https://cdn.shopify.com/s/files/1/0729/1394/4840/files/Frame_Logo_-_Stickerize_Emails.png?v=1765294871" width="168" height="26" border="0" alt="{{business_name}}" style="${style(RESET, 'display: block', 'max-width: 100%')}">
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                </th>
                            </tr>
                        </thead>
                        <tbody style="${RESET}">
                            <tr style="${RESET}">
                                <td class="body" rise-template="body" style="${style(RESET, 'padding: 0 12px')}">
                                    <div id="RiseSections" style="${RESET}">
                                        ${sections.join('\n\n                                        ')}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot style="${RESET}">
                            <tr style="${RESET}">
                                <td class="footer" rise-template="footer" style="${style(RESET, 'padding: 0 12px 22px', 'text-align: center')}">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="${RESET}">
                                        <tr style="${RESET}">
                                            <th class="column-top" width="266" style="${style(column, 'vertical-align: top')}">
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="${RESET}">
                                                    <tr style="${RESET}">
                                                        <td style="${style(BODY, 'padding-bottom: 24px', 'text-align: left')}">
                                                            Tomtebogatan 34, Stockholm, Sweden
                                                        </td>
                                                    </tr>
                                                    <tr style="${RESET}">
                                                        <td style="${style(BODY, 'text-align: left')}">
                                                            For information about how we process data and monitor communications please see our <a href="https://stickerize.com/pages/privacy-policy" rel="noopener" target="_blank" class="link" style="${LINK}"><span class="link" style="${LINK}">Privacy Policy</span></a> and <a href="https://stickerize.com/pages/terms-of-service" rel="noopener" target="_blank" class="link" style="${LINK}"><span class="link" style="${LINK}">Terms &amp; Conditions</span></a>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </th>
                                            <th class="column" width="40" style="${column}">&nbsp;</th>
                                            <th class="column-top" width="394" style="${style(column, 'vertical-align: top')}">
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="${RESET}">
                                                    <tr style="${RESET}">
                                                        <td style="${style(BODY, 'text-align: left')}">
                                                            <a href="mailto:help@stickerize.com" target="_blank" class="link-u" style="${LINK_U}"><span class="link-u" style="${LINK_U}">HELP@STICKERIZE.COM</span></a><br style="${RESET}">
                                                            <a href="{{unsubscribe_url}}" target="_blank" class="link-u" style="${LINK_U}"><span class="link-u" style="${LINK_U}">UNSUBSCRIBE</span></a>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </th>
                                        </tr>
                                    </table>
                                    <div class="fluid-img" style="${style(RESET, 'padding-top: 24px')}">
                                        <a href="{{shop_url}}" style="${LINK}">
                                            <img class="dm-invert" src="https://cdn.shopify.com/s/files/1/0729/1394/4840/files/logo_footer.png?v=1734345195" width="700" height="110" border="0" alt="" style="${style(RESET, 'display: block', 'width: 100%', 'max-width: 700px', 'height: auto')}">
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</div>`;
}
