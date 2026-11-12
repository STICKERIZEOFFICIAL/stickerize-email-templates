/**
 * Body copy, as blocks rather than as one string full of `<br />`.
 *
 * The rule: inside a body text container, every line that starts a new line
 * *deliberately* — a new paragraph, a list item, a bullet — sits 12px below the
 * one before it. Text that simply wraps does not; that is the line-height's
 * job, not a gap.
 *
 * `<br />` cannot express that. It emits a line box of exactly one line-height,
 * so two blocks separated by `<br /><br />` land ~18px apart and a list reads
 * as a solid run with no separation at all. And a *trailing* `<br />` — which
 * most of these templates carried — adds a whole empty line on top of the
 * section gap below it, so a 36px gap renders as ~54px.
 *
 * Each block becomes its own element and owns the 12px above it, except the
 * first, which owns nothing: the container's own padding supplies the gap to
 * whatever precedes it. One side owns each gap, as everywhere else.
 */
export function bodyCopy(blocks: readonly string[]): string {
  return blocks
    .map((block, index) =>
      index === 0
        ? /*html*/ `<div>${block}</div>`
        : /*html*/ `<div style="padding-top: 12px;">${block}</div>`,
    )
    .join('');
}

/**
 * Accepts either form, so a template with a single block of copy — or one
 * block of Liquid — can keep passing a plain string.
 */
export function renderBody(copy: string | readonly string[]): string {
  return typeof copy === 'string' ? copy : bodyCopy(copy);
}
