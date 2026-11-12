import { Link } from '@remix-run/react';
import { TABS, type TabId } from '~/platforms/registry';

/**
 * The one piece of UI both compartments share: the switcher between Shopify
 * and the three other-platform tabs.
 *
 * Built from the chrome classes already in `app/preview/preview.css`
 * (`.segmented`, `.btn`) so it needs no stylesheet of its own and renders
 * identically whichever gallery hosts it.
 *
 * It is deliberately the *only* import the Shopify compartment takes from
 * here, and it reaches into no template, component or render path on either
 * side — just four links.
 */
export function PlatformTabs({ current }: { current: TabId }) {
  return (
    <div className="segmented" role="navigation" aria-label="Platform">
      {TABS.map((tab) => (
        <Link
          key={tab.id}
          className="btn"
          to={tab.href}
          prefetch="intent"
          aria-current={tab.id === current ? 'page' : undefined}
          // `.btn` styles its pressed state off aria-pressed; aria-current
          // carries the semantics for a link.
          aria-pressed={tab.id === current}
          title={tab.blurb}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
