# STICKERIZE email redesign rules (Rise.ai)

Source design: Figma "Stickerize New (wip)", Email frames (724 wide, 12px inset, 700 content).
Templates done: Global theme, Welcome, Reward (cashback), Refund to credit.
Edit only the body content in each template. The Global theme holds the header, footer and dark mode CSS.

## 1. Header logo (Global theme)

- Old: `logo_e1564c50...png`, 192x28
- New: SVG main logo, 188x24, with `class="dm-invert"` so it turns white in dark mode
- Header line stays `border-bottom: 1px solid #000001`

```html
<img rise-template="logo" class="dm-invert" src="https://cdn.shopify.com/s/files/1/0729/1394/4840/files/Main_logo_c1d06918-66b4-4d9d-940a-78bd67d5de25.svg?v=1793662575" width="188" height="24" border="0" alt="{{shop_name}}" style="display: block;" />
```

Note: SVG does not render in Gmail or Outlook. Swap for a PNG export when available.

## 2. Divider

- Old: `margin: 24px 0; height: 2px; background-color: #ececec;` (or #e4e4e4)
- New: 1px black line, no inline margin (section margin handles spacing), `class="dm-line"` flips it to white in dark mode

```html
<section rise-section="divider" rise-section-id="KEEP_ORIGINAL_ID">
    <div rise-element="divider" class="dm-line" style="height: 1px; line-height: 1px; font-size: 1px; background-color: #000001;">&nbsp;</div>
</section>
```

## 3. CTA button

- Old: single `<a>` with `ico_arrow.png` (or SVG arrow) floated right, 14px, `margin: 24px -12px` on the section, label "VISIT OUR STORE", href `{{shop_url}}`
- New: two cell table, label left, text arrow `&rarr;` right (no image, cannot skew, inverts with the text)
- 13px Courier New, uppercase, weight 300, padding 23px 12px, full width, no negative margin
- href `https://stickerize.com`
- Labels: Welcome "GO TO MY ACCOUNT", Reward and Refund "USE MY CREDIT"
- Keep the original Rise section ID (`1d4980f9b78b4886b5a198abb614edd1`)
- When the CTA follows the code box: section `style="margin-top: 12px;"` and code box section `style="margin-bottom: 12px;"`

```html
<section rise-section="button" rise-section-id="1d4980f9b78b4886b5a198abb614edd1">
    <div rise-element="button-placeholder">
        <table class="dm-btn-table" width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation" bgcolor="#000001" style="background-color: #000001;">
            <tr>
                <td align="left" valign="middle" style="padding: 23px 0 23px 12px; background-color: #000001;">
                    <a rise-element="button" class="dm-btn" href="https://stickerize.com" target="_blank" style="font-family: 'Courier New', monospace; font-size: 13px; line-height: 18px; font-weight: 300; color: #fffffe; text-decoration: none; display: block; text-transform: uppercase;">LABEL</a>
                </td>
                <td align="right" valign="middle" width="40" style="padding: 23px 12px 23px 0; background-color: #000001;">
                    <a class="dm-btn" href="https://stickerize.com" target="_blank" style="font-family: 'Courier New', monospace; font-size: 13px; line-height: 18px; font-weight: 300; color: #fffffe; text-decoration: none; display: block; text-align: right;">&rarr;</a>
                </td>
            </tr>
        </table>
    </div>
</section>
```

## 4. Spacing (Global theme)

- `.body` padding: `36px 12px 0` → `0 12px`
- `.footer` padding: `0 16px 22px` → `0 12px 22px`
- Every `section` keeps `margin: 24px 0`, which is the only vertical rhythm
- In bodies, remove: trailing `<div style="height: 12px;">` spacers, `margin: 24px -12px` on buttons, `margin: 24px 0` on dividers, separate `spacer` sections

## 5. Typography (body content)

All Courier New, 13px, color #000001.

| Element | Style |
|---|---|
| Heading | bold, uppercase, line-height 13px |
| Body | line-height 17px, `margin-top: 12px` between paragraphs |
| Eyebrow | uppercase, line-height 13px, #999999, `class="dm-muted"` |
| Small print | line-height 17px, #999999, `class="dm-muted"` |

Old Arial Black 18px h1 titles become the bold 13px Courier heading inside the first text section.

## 6. Other body components

- Hero: two square photos side by side (holographic left, prism right), table 49% / 2% / 49%, replaces the single 700x450 `img_1.jpg`
- Code box: `border: 1px solid #000001; padding: 23px 12px; text-align: center;`, no grey background or radius, `class="dm-border"`
- Small print after the last divider: "Credits are shown in euros and converted to your local currency at checkout, so the amount may vary slightly."
- Keep Rise conditional blocks as they are: `{{{#apple_wallet}}}`, `{{{#expiration_date}}}`

Code box needs this style block at the top of the body (not in the Global theme):

```html
<style>
    @media (prefers-color-scheme: dark) {
        .dm-border { border-color: #fffffe !important; }
    }
    [data-ogsc] .dm-border { border-color: #fffffe !important; }
</style>
```

## 7. Footer (Global theme)

- Email changed to HELP@STICKERIZE.COM (`mailto:help@stickerize.com`)
- UNSUBSCRIBE link added under it (`{{unsubscribe_url}}` placeholder, confirm Rise variable)
- Columns 266 / 40 gap / 394
- Footer wordmark `logo_footer.png` gets `class="dm-invert"`, `padding-top: 24px`

## 8. Dark mode classes (defined in Global theme)

| Class | Use on | Dark mode result |
|---|---|---|
| `dm-invert` | logos | inverted to white |
| `dm-line` | dividers | white line |
| `dm-muted` | eyebrows, small print | #8c8c8c |
| `dm-btn-table`, `dm-btn` | CTA table and links | white button, black text and arrow |
| `dm-border` | code box | white border (body style block) |

Background switches to #000001 and all text to #fffffe. Gmail ignores these rules and applies its own inversion.

## Open checks

- `{{balance}}` (Reward email) not confirmed as a Rise variable, send a test
- `{{unsubscribe_url}}` placeholder not confirmed
- SVG header logo needs a PNG version for Gmail and Outlook
