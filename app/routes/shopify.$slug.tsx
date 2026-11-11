import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { Link, json, useLoaderData, useNavigate } from '@remix-run/react';
import { useEffect, useMemo, useState } from 'react';
import { renderLiquid } from '~/preview/liquid.server';
import { TEMPLATES, getTemplate, neighbours, sourcePath } from '~/preview/registry';

export async function loader({ params }: LoaderFunctionArgs) {
  const template = getTemplate(params.slug);
  if (!template) {
    throw new Response(`Unknown template: ${params.slug}`, { status: 404 });
  }

  const source = template.render();
  // Rendered here only to surface Liquid errors in the toolbar; the iframe
  // loads its own copy from /preview/shopify/:slug.
  const { error } = await renderLiquid(source, template.data);
  const { previous, next } = neighbours(template.slug);

  return json({
    slug: template.slug,
    label: template.label,
    group: template.group,
    description: template.description,
    path: sourcePath(template.slug),
    source,
    error,
    previous: previous && { slug: previous.slug, label: previous.label },
    next: next && { slug: next.slug, label: next.label },
    index: TEMPLATES.findIndex((entry) => entry.slug === template.slug) + 1,
    count: TEMPLATES.length,
    templates: TEMPLATES.map(({ slug, label, group }) => ({ slug, label, group })),
  });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => [
  { title: data ? `${data.label} — STICKERIZE templates` : 'Template not found' },
];

type View = 'desktop' | 'mobile' | 'source';

export default function TemplatePreview() {
  const data = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [view, setView] = useState<View>('desktop');
  const [copied, setCopied] = useState(false);

  // Left/right arrows walk the lifecycle without reaching for the mouse.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key === 'ArrowLeft' && data.previous) navigate(`/shopify/${data.previous.slug}`);
      if (event.key === 'ArrowRight' && data.next) navigate(`/shopify/${data.next.slug}`);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [data.previous, data.next, navigate]);

  useEffect(() => {
    setCopied(false);
  }, [data.slug]);

  async function copySource() {
    try {
      await navigator.clipboard.writeText(data.source);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="shell">
      <Sidebar templates={data.templates} current={data.slug} />

      <main>
        <div className="topbar">
          <div>
            <h1 className="topbar__title">{data.label}</h1>
            <div className="topbar__meta">
              {data.group} · {data.index}/{data.count} · {data.path}
            </div>
          </div>

          <div className="topbar__spacer" />

          <div className="segmented">
            <NavButton to={data.previous && `/shopify/${data.previous.slug}`} label="‹ Prev" />
            <NavButton to={data.next && `/shopify/${data.next.slug}`} label="Next ›" />
          </div>

          <div className="segmented">
            {(['desktop', 'mobile', 'source'] as const).map((name) => (
              <button
                key={name}
                type="button"
                className="btn"
                aria-pressed={view === name}
                onClick={() => setView(name)}
              >
                {name}
              </button>
            ))}
          </div>

          <button type="button" className="btn" onClick={copySource}>
            {copied ? 'Copied ✓' : 'Copy Liquid'}
          </button>

          <a
            className="btn"
            href={`/preview/shopify/${data.slug}?source=1`}
            download={`${data.slug}.liquid`}
          >
            Download
          </a>

          <a className="btn" href={`/preview/shopify/${data.slug}`} target="_blank" rel="noreferrer">
            Open ↗
          </a>
        </div>

        {data.error ? (
          <div className="banner">
            <strong>Liquid error</strong>
            <code>{data.error}</code>
          </div>
        ) : null}

        {view === 'source' ? (
          <div className="source" style={{ paddingTop: 24 }}>
            <pre>{data.source}</pre>
          </div>
        ) : (
          <div className="stage">
            <div className={`stage__frame${view === 'mobile' ? ' stage__frame--mobile' : ''}`}>
              <iframe
                key={`${data.slug}-${view}`}
                src={`/preview/shopify/${data.slug}`}
                title={`${data.label} preview`}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function NavButton({ to, label }: { to: string | undefined | null; label: string }) {
  if (!to) {
    return (
      <button type="button" className="btn" disabled>
        {label}
      </button>
    );
  }
  return (
    <Link className="btn" to={to} prefetch="intent">
      {label}
    </Link>
  );
}

type SidebarTemplate = { slug: string; label: string; group: string };

function Sidebar({ templates, current }: { templates: SidebarTemplate[]; current: string }) {
  const [query, setQuery] = useState('');

  const buckets = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const matches = needle
      ? templates.filter((template) =>
          `${template.label} ${template.slug} ${template.group}`.toLowerCase().includes(needle),
        )
      : templates;

    // Preserve registry order while bucketing by group.
    const order: string[] = [];
    const byGroup = new Map<string, SidebarTemplate[]>();
    for (const template of matches) {
      if (!byGroup.has(template.group)) {
        byGroup.set(template.group, []);
        order.push(template.group);
      }
      byGroup.get(template.group)!.push(template);
    }
    return order.map((group) => ({ group, templates: byGroup.get(group)! }));
  }, [templates, query]);

  return (
    <nav className="sidebar" aria-label="Templates">
      <Link className="sidebar__brand" to="/">
        ← All templates <span className="sidebar__count">{templates.length}</span>
      </Link>

      <div className="sidebar__search">
        <input
          className="field"
          type="search"
          placeholder="Filter…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      {buckets.length === 0 ? (
        <p className="sidebar__empty">No match.</p>
      ) : (
        buckets.map((bucket) => (
          <div key={bucket.group}>
            <div className="sidebar__group">{bucket.group}</div>
            {bucket.templates.map((template) => (
              <Link
                key={template.slug}
                className="sidebar__link"
                to={`/shopify/${template.slug}`}
                prefetch="intent"
                aria-current={template.slug === current ? 'page' : undefined}
              >
                {template.label}
              </Link>
            ))}
          </div>
        ))
      )}
    </nav>
  );
}
