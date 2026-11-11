import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { useMemo, useState } from 'react';
import { GROUPS, TEMPLATES, grouped, type Group } from '~/preview/registry';
import { ThemeSwitch } from '~/preview/ThemeSwitch';
import { previewSrc, useTheme } from '~/preview/theme';

export const meta: MetaFunction = () => [
  { title: 'STICKERIZE email templates' },
  { name: 'description', content: 'Local preview of the Shopify customer notification templates.' },
];

export default function Index() {
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState<Group | 'All'>('All');
  const { theme, setTheme } = useTheme();

  const buckets = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const matches = TEMPLATES.filter((template) => {
      if (group !== 'All' && template.group !== group) return false;
      if (!needle) return true;
      return `${template.label} ${template.slug} ${template.description} ${template.group}`
        .toLowerCase()
        .includes(needle);
    });
    return grouped(matches);
  }, [query, group]);

  const total = buckets.reduce((sum, bucket) => sum + bucket.templates.length, 0);

  return (
    <div className="shell shell--wide">
      <main>
        <div className="topbar">
          <strong className="topbar__title">STICKERIZE© / Shopify notifications</strong>
          <span className="topbar__meta">
            {total} of {TEMPLATES.length}
          </span>
          <div className="topbar__spacer" />
          <ThemeSwitch theme={theme} setTheme={setTheme} />
          <div className="segmented">
            {(['All', ...GROUPS] as const).map((name) => (
              <button
                key={name}
                type="button"
                className="btn"
                aria-pressed={group === name}
                onClick={() => setGroup(name)}
              >
                {name}
              </button>
            ))}
          </div>
          <label>
            <span className="sr-only" hidden>
              Search templates
            </span>
            <input
              className="field"
              style={{ width: 220 }}
              type="search"
              placeholder="Search templates…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
        </div>

        <div className="page">
          <div className="page__header">
            <h1>Email templates</h1>
            <p>
              Every customer notification, rendered with sample order data in the order a customer
              receives them. Open one to copy the Liquid for Shopify.
            </p>
          </div>

          {total === 0 ? (
            <p className="sidebar__empty">No template matches “{query}”.</p>
          ) : (
            buckets.map((bucket) => (
              <section className="group" key={bucket.group}>
                <h2 className="group__heading">
                  {bucket.group}
                  <span className="group__count">{bucket.templates.length}</span>
                </h2>
                <div className="grid">
                  {bucket.templates.map((template) => (
                    <Link
                      className="card"
                      key={template.slug}
                      to={`/shopify/${template.slug}`}
                      prefetch="intent"
                    >
                      <div className="card__thumb">
                        <iframe
                          key={`${template.slug}-${theme}`}
                          src={previewSrc(template.slug, theme)}
                          title={`${template.label} preview`}
                          loading="lazy"
                          tabIndex={-1}
                          scrolling="no"
                        />
                      </div>
                      <div className="card__body">
                        <div className="card__title">{template.label}</div>
                        <div className="card__desc">{template.description}</div>
                        <div className="card__slug">{template.slug}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
