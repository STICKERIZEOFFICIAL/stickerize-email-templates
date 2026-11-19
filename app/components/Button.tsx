export function Button({
  url,
  label,
  paddingTop = 24,
}: {
  url: string;
  label: string;
  paddingTop?: 0 | 24;
}) {
  // Two cells: arrow left, label right of it. The arrow is the text character
  // rather than an image — it inherits the link colour, so it survives the
  // colour inversion Gmail and Outlook force in dark mode, and it cannot skew.
  //
  // The arrow used to sit on the right, pinned to the far edge of the bar. It
  // now leads the label, 12px in front of it. Nothing else about the button
  // changes: same full width, same height, same 12px outer inset, same two
  // cells — they have swapped places and swapped which one owns which edge.
  //
  // The 12px gap is the label cell's `padding-left`, not a width on the arrow
  // cell. The arrow cell carries no width at all and shrinks to its glyph,
  // which is why the label cell takes `width="100%"`: it claims the rest of
  // the bar, and the gap stays 12px whatever width the glyph turns out to be
  // in whichever font the client actually has.
  const link =
    "font-family:'Courier New', monospace; font-size: 13px; line-height: 18px; font-weight: 300; color:#fffffe; text-decoration:none; display: block; text-transform: uppercase;";

  // The arrow needs its own size. At the label's 13px/300 the glyph renders
  // thin and undersized next to the uppercase label — it reads as squashed
  // rather than as a counterpart to the text.
  //
  // Being a size larger is also why the arrow cell's padding is not the
  // label's. A block's baseline sits `(lineHeight - (ascent + descent)) / 2 +
  // ascent` below its content top, which in Courier New is `L/2 + 3.5` at
  // 13px and `L/2 + 5.5` at 20px — a constant 2px apart whatever the
  // line-height. Left alone, that is a 2px drop, and with the glyph's own
  // shape on top of it the arrow sat 2.5px low and read as bottom-aligned.
  //
  // So the arrow cell takes 2px less above and 2px more below: the baselines
  // coincide and the cell's total height is unchanged, which matters because
  // both cells are `valign="middle"` and a difference in height would put the
  // offset straight back through centring.
  //
  // (An inner span at 20px does not work, and was tried: a taller inline box
  // raises the line box, and the block's baseline goes down with it.)
  const arrowLink =
    "font-family:'Courier New', monospace; font-size: 20px; line-height: 18px; font-weight: 400; color:#fffffe; text-decoration:none; display: block; text-align: left;";

  // 36px below: whatever follows a button is a different section — an order
  // table, a totals block, the footer — so the gap under it is the section
  // gap. It was 32px, which is neither of the brief's numbers.
  //
  // Above the button is the caller's to own, and it is 24px: a button is not
  // a section of its own, it is the action belonging to the copy directly
  // above it. See docs/shopify-spacing-and-capitalisation.md.
  return /*html*/ `
  <!-- Button -->
  <tr>
    <td style="padding: ${paddingTop}px 12px 36px;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation" bgcolor="#000001" style="background-color: #000001;">
        <tr>
          <td class="l-white" align="left" valign="middle" style="mso-padding-alt: 21px 0 25px 12px; padding: 21px 0 25px 12px; background-color: #000001;">
            <a href="${url}" target="_blank" rel="noopener" class="link" style="${arrowLink}">&rarr;</a>
          </td>
          <td class="l-white" align="left" valign="middle" width="100%" style="mso-padding-alt: 23px 12px; padding: 23px 12px 23px 12px; background-color: #000001;">
            <a href="${url}" target="_blank" rel="noopener" class="link" style="${link}">${label}</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <!-- END Button -->`;
}
