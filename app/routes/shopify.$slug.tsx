import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { Link, json, useLoaderData, useNavigate } from '@remix-run/react';
import { useEffect, useMemo, useState } from 'react';
import { renderLiquid } from '~/preview/liquid.server';
import { TEMPLATES, getTemplate, neighbours, sourcePath } from '~/preview/registry';
import { ThemeSwitch } from '~/preview/ThemeSwitch';
import { previewSrc, useTheme } from '~/preview/theme';

export async function loader({ params }: LoaderFunctionArgs) {
  const template = getTemplate(params.slug);
  if (!template) {
    throw new Response(`Unknown template: ${params.slug}`, { status: 404 });
  }

  const source = template.render();
  // Rendered here only to surface Liquid errors in the toolbar; the iframe
  // loads its own copy from /preview/shopify/:slug.
  const { error } = await renderLiquid(source, template.data);
  // Show the subject both as it is typed into Shopify and as it resolves, so
  // the Liquid in it can be eyeballed before it is pasted.
  const subjectPreview = await renderLiquid(template.subject, template.data);
  const { previous, next } = neighbours(template.slug);

  return json({
    slug: template.slug,
    label: template.label,
    group: template.group,
    description: template.description,
    path: sourcePath(template.slug),
    subject: template.subject,
    subjectRendered: subjectPreview.error ? template.subject : subjectPreview.html,
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
  const { theme, setTheme } = useTheme();
  const [view, setView] = useState<View>('desktop');
  const [copied, setCopied] = useState<'subject' | 'liquid' | null>(null);

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
    setCopied(null);
  }, [data.slug]);

  async function copy(text: string, which: 'subject' | 'liquid') {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(which);
    } catch {
      setCopied(null);
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

          <ThemeSwitch theme={theme} setTheme={setTheme} />

          <button type="button" className="btn" onClick={() => copy(data.source, 'liquid')}>
            {copied === 'liquid' ? 'Copied ✓' : 'Copy Liquid'}
          </button>

          <a
            className="btn"
            href={`/preview/shopify/${data.slug}?source=1`}
            download={`${data.slug}.liquid`}
          >
            Download
          </a>
        </div>

        {/* Shopify keeps the subject in the admin, not in the template body,
            so it has to be copied across separately from the HTML. */}
        <div className="subject">
          <div className="subject__label">
            Subject
            <span className="subject__hint">set in Shopify admin, not in the template</span>
          </div>
          <div className="subject__value">
            <code className="subject__raw">{data.subject}</code>
            {data.subjectRendered !== data.subject ? (
              <span className="subject__rendered">renders as “{data.subjectRendered}”</span>
            ) : null}
          </div>
          <button type="button" className="btn" onClick={() => copy(data.subject, 'subject')}>
            {copied === 'subject' ? 'Copied ✓' : 'Copy subject'}
          </button>
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
                key={`${data.slug}-${view}-${theme}`}
                src={previewSrc(data.slug, theme)}
                title={`${data.label} preview`}
              />
            </div>
          </div>
        )}

        {theme === 'dark' && view !== 'source' ? (
          <p className="stage__note">
            Simulated dark mode. These templates declare no dark-mode support, so clients that
            force it (Outlook, Apple Mail, the Gmail app) invert the colours themselves — that
            inversion is what you are seeing. Images are flipped back, as those clients leave them
            alone. Every client inverts a little differently, so treat this as a check for
            unreadable text and vanishing boxes rather than an exact preview.
          </p>
        ) : null}
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
