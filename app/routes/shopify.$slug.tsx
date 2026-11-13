import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { Link, json, useLoaderData, useNavigate } from '@remix-run/react';
import { useEffect, useMemo, useState } from 'react';
import { renderLiquid } from '~/preview/liquid.server';
import { DEFAULT_LOCALE, LOCALES, type LocaleCode } from '~/preview/locales';
import { useNarrowViewport } from '~/preview/useNarrowViewport';
import {
  TEMPLATES,
  getTemplate,
  neighbours,
  previewTextFor,
  sourcePath,
  subjectFor,
} from '~/preview/registry';

export async function loader({ params }: LoaderFunctionArgs) {
  const template = getTemplate(params.slug);
  if (!template) {
    throw new Response(`Unknown template: ${params.slug}`, { status: 404 });
  }

  const source = template.render();
  const locale: LocaleCode = DEFAULT_LOCALE;

  // Rendered here for two reasons: to surface Liquid errors in the toolbar,
  // and because the preheader is read back out of the finished email. The
  // iframe loads its own copy from /preview/shopify/:slug.
  const { html, error } = await renderLiquid(source, { ...template.data, locale });

  // Global components have no subject: they are not emails.
  const subject = subjectFor(template, locale);
  // Already Liquid-resolved: it comes out of the rendered email.
  const previewText = previewTextFor(template, html, locale);
  const subjectRender = subject ? await renderLiquid(subject, template.data) : null;

  const { previous, next } = neighbours(template.slug);

  // Only the templates that render the order summary have an "Order discount"
  // row to show, so only they get the toggle. Detected from the Liquid rather
  // than listed by hand, so a template that gains or loses `Total` cannot
  // drift out of step with the toolbar.
  const hasOrderSummary = source.includes('total_order_discount_amount');

  return json({
    slug: template.slug,
    hasOrderSummary,
    label: template.label,
    group: template.group,
    path: sourcePath(template),
    subject,
    subjectRendered:
      subject && subjectRender && !subjectRender.error ? subjectRender.html.trim() : subject,
    previewText,
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

type Width = 'desktop' | 'mobile';
type Scheme = 'light' | 'dark';

export default function TemplatePreview() {
  const data = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const [showSource, setShowSource] = useState(false);
  const [width, setWidth] = useState<Width>('desktop');
  // Scheme and locale change only how the email renders — never the app around
  // it. They live with the email frame, not in the page toolbar.
  const [scheme, setScheme] = useState<Scheme>('light');
  const [locale, setLocale] = useState<LocaleCode>(DEFAULT_LOCALE);
  // Whether the sample order carries an order-wide discount. Off by default:
  // most orders have none, so that is the view worth landing on.
  const [discounted, setDiscounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  // A phone cannot show a 732px email at full width, so there is no desktop
  // view to offer: render the mobile one and drop the control.
  const narrow = useNarrowViewport();
  const renderWidth: Width = narrow ? 'mobile' : width;

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

  useEffect(() => setCopied(false), [data.slug]);
  // Picking a template from the drawer should close it.
  useEffect(() => setNavOpen(false), [data.slug]);

  useEffect(() => {
    if (!navOpen) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setNavOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navOpen]);

  async function copySubject() {
    if (!data.subject) return;
    try {
      await navigator.clipboard.writeText(data.subject);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const frameSrc = `/preview/shopify/${data.slug}?locale=${locale}${
    scheme === 'dark' ? '&theme=dark' : ''
  }${discounted ? '&discount=1' : ''}`;

  return (
    <div className={`shell${navOpen ? ' shell--nav-open' : ''}`}>
      <Sidebar templates={data.templates} current={data.slug} />
      {navOpen ? (
        <button
          type="button"
          className="nav-scrim"
          aria-label="Close the template list"
          onClick={() => setNavOpen(false)}
        />
      ) : null}

      <main>
        <div className="topbar">
          <button
            type="button"
            className="btn nav-toggle"
            aria-expanded={navOpen}
            onClick={() => setNavOpen((open) => !open)}
          >
            ☰ Templates
          </button>

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

          <button
            type="button"
            className="btn"
            aria-pressed={showSource}
            onClick={() => setShowSource((on) => !on)}
          >
            Source
          </button>

          <a
            className="btn"
            href={`/preview/shopify/${data.slug}?source=1`}
            download={`${data.slug}.liquid`}
          >
            Download Liquid
          </a>
        </div>

        {/* What lands in the inbox: the two lines a recipient reads before
            opening anything. They come from different places — the subject
            from Shopify's admin, the preheader from the template — so each is
            labelled with where it is edited. */}
        {data.subject ? (
        <section className="dispatch" aria-label="Inbox lines">
          <div className="dispatch__inbox">
            <span className="dispatch__eyebrow">As it lands in the inbox</span>
            <div className="dispatch__row">
              <span className="dispatch__sender">Stickerize</span>
              <p className="dispatch__subject">{data.subjectRendered}</p>
              {data.previewText ? (
                <p className="dispatch__preheader">{data.previewText}</p>
              ) : (
                <p className="dispatch__preheader dispatch__preheader--empty">
                  No preview text — the client will scrape the top of the email instead
                </p>
              )}
            </div>
          </div>

          <dl className="dispatch__fields">
            <div className="field-row field-row--primary">
              <dt>
                Subject
                <span className="field-row__where">Shopify admin</span>
              </dt>
              <dd>
                <code className="field-row__value">{data.subject}</code>
                <button type="button" className="btn btn--solid" onClick={copySubject}>
                  {copied ? 'Copied ✓' : 'Copy subject'}
                </button>
              </dd>
            </div>

            <div className="field-row">
              <dt>
                Preview text
                <span className="field-row__where">in the template</span>
              </dt>
              <dd>
                {data.previewText ? (
                  <code className="field-row__value">{data.previewText}</code>
                ) : (
                  <code className="field-row__value field-row__value--empty">Not set</code>
                )}
                <span className="field-row__note">
                  travels with the Liquid — nothing to paste
                </span>
              </dd>
            </div>
          </dl>
        </section>
        ) : null}

        {data.error ? (
          <div className="banner">
            <strong>Liquid error</strong>
            <code>{data.error}</code>
          </div>
        ) : null}

        {showSource ? (
          <div className="source">
            <pre>{data.source}</pre>
          </div>
        ) : (
          <div className="stage">
            <div className={`viewer${renderWidth === 'mobile' ? ' viewer--mobile' : ''}`}>
              {/* Controls for how the email renders sit on the email, not in
                  the page toolbar — none of them change the app around it. */}
              <div className="viewer__bar">
                {narrow ? null : (
                  <div className="segmented">
                    {(['desktop', 'mobile'] as const).map((name) => (
                      <button
                        key={name}
                        type="button"
                        className="btn btn--bare"
                        aria-pressed={width === name}
                        onClick={() => setWidth(name)}
                      >
                        {name === 'desktop' ? 'Desktop' : 'Mobile'}
                      </button>
                    ))}
                  </div>
                )}

                <div className="segmented">
                  {(['light', 'dark'] as const).map((name) => (
                    <button
                      key={name}
                      type="button"
                      className="btn btn--bare"
                      aria-pressed={scheme === name}
                      title={
                        name === 'dark'
                          ? 'Simulate a mail client forcing dark mode'
                          : 'Render as sent'
                      }
                      onClick={() => setScheme(name)}
                    >
                      {name === 'light' ? '☀ Light' : '☾ Dark'}
                    </button>
                  ))}
                </div>

                {data.hasOrderSummary ? (
                  <div className="segmented">
                    {([false, true] as const).map((on) => (
                      <button
                        key={String(on)}
                        type="button"
                        className="btn btn--bare"
                        aria-pressed={discounted === on}
                        title={
                          on
                            ? 'Add an order-wide discount, so the summary shows its Order discount row'
                            : 'No order-wide discount — the common case'
                        }
                        onClick={() => setDiscounted(on)}
                      >
                        {on ? 'With discount' : 'No discount'}
                      </button>
                    ))}
                  </div>
                ) : null}

                <div className="viewer__spacer" />

                <div className="segmented">
                  {LOCALES.map((entry) => (
                    <button
                      key={entry.code}
                      type="button"
                      className="btn btn--bare"
                      aria-pressed={locale === entry.code}
                      title={
                        LOCALES.length === 1
                          ? `${entry.name} — the only variant so far`
                          : entry.name
                      }
                      onClick={() => setLocale(entry.code)}
                    >
                      {entry.label}
                    </button>
                  ))}
                </div>
              </div>

              <iframe
                key={`${data.slug}-${renderWidth}-${scheme}-${locale}-${discounted}`}
                src={frameSrc}
                title={`${data.label} preview`}
              />
            </div>
          </div>
        )}

        {scheme === 'dark' && !showSource ? (
          <p className="stage__note">
            Simulated dark mode. These templates declare no dark-mode support, so clients that
            force it — Outlook, Apple Mail, the Gmail app — invert the colours themselves, and
            that inversion is what you are seeing. Images are flipped back, as those clients
            leave them alone. Treat it as a check for unreadable text and vanishing boxes rather
            than an exact preview.
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
