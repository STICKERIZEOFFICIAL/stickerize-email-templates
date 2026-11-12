/**
 * Body copy, as blocks rather than as one string full of `<br />`.
 *
 * Two levels, because a list is not the same thing as two paragraphs:
 *
 *   'a paragraph'              its own block, 12px below the one before it
 *   ['one', 'two', 'three']    one block of tight lines, no gap between them
 *
 * So a numbered list sits 12px below its lead-in and 12px above whatever
 * follows, while its own items run at the normal line-height — the same
 * rhythm as a wrapped sentence. Giving each item 12px makes the list read as
 * three detached statements rather than as one list.
 *
 * `<br />` alone cannot express the outer gap: it emits a line box of exactly
 * one line-height, so blocks separated by `<br /><br />` land ~18px apart. And
 * a *trailing* `<br />` — which most of these templates carried — adds a whole
 * empty line on top of the section gap below it, so a 36px gap renders as ~54.
 *
 * Each block owns the 12px above it, except the first, which owns nothing: the
 * container's own padding supplies the gap to whatever precedes it. One side
 * owns each gap, as everywhere else.
 */

/** A paragraph, or a run of tight lines such as a list. */
export type BodyBlock = string | readonly string[];

/** Tight lines inside one block: a plain line break, no extra space. */
function lines(block: BodyBlock): string {
  return typeof block === 'string' ? block : block.join('<br />');
}

export function bodyCopy(blocks: readonly BodyBlock[]): string {
  return blocks
    .map((block, index) =>
      index === 0
        ? /*html*/ `<div>${lines(block)}</div>`
        : /*html*/ `<div style="padding-top: 12px;">${lines(block)}</div>`,
    )
    .join('');
}

/**
 * Accepts either form, so a template with a single block of copy — or one
 * block of Liquid — can keep passing a plain string.
 */
export function renderBody(copy: string | readonly BodyBlock[]): string {
  return typeof copy === 'string' ? copy : bodyCopy(copy);
}
