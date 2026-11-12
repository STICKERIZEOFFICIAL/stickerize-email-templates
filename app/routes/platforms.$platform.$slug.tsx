import type { LinksFunction, LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { Link, json, useLoaderData, useNavigate } from '@remix-run/react';
import { useEffect, useMemo, useState } from 'react';
import { PlatformTabs } from '~/platforms/PlatformTabs';
import { DARK_STRATEGY, darkModeNote } from '~/platforms/dark-mode';
import platformStyles from '~/platforms/platforms.css';
import {
  downloadName,
  getPlatformTemplate,
  getTab,
  isPlatformId,
  neighbours,
  sourceOf,
  templatesFor,
  type CopyStatus,
} from '~/platforms/registry';
import { hasSample, tokensIn } from '~/platforms/tokens';
import { useNarrowViewport } from '~/platforms/useNarrowViewport';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: platformStyles }];

export async function loader({ params }: LoaderFunctionArgs) {
  const { platform, slug } = params;
  if (!isPlatformId(platform)) {
    throw new Response(`Unknown platform: ${platform}`, { status: 404 });
  }

  const template = getPlatformTemplate(platform, slug);
  if (!template) {
    throw new Response(`Unknown ${platform} template: ${slug}`, { status: 404 });
  }

  const tab = getTab(platform)!;
  const list = templatesFor(platform);
  const source = sourceOf(template);
  const { previous, next } = neighbours(platform, template.slug);

  // Listed off the template that is actually pasted, so the panel cannot
  // drift from the file. Each is marked for whether a sample backs it.
  const variables = tokensIn(platform, source).map((token) => ({
    token,
    sampled: hasSample(platform, token),
  }));

  return json({
    platform,
    tab,
    slug: template.slug,
    label: template.label,
    group: template.group,
    file: template.file,
    description: template.description,
    subject: template.subject ?? null,
    subjectStatus: template.subjectStatus,
    previewText: template.previewText ?? null,
    previewTextStatus: template.previewTextStatus,
    notes: template.notes ?? [],
    wrapInGlobalTheme: template.wrapInGlobalTheme ?? false,
    variables,
    source,
    darkStrategy: DARK_STRATEGY[platform],
    darkNote: darkModeNote(platform),
    previous: previous && { slug: previous.slug, label: previous.label },
    next: next && { slug: next.slug, label: next.label },
    index: list.findIndex((entry) => entry.slug === template.slug) + 1,
    count: list.length,
    download: downloadName(platform, template),
    templates: list.map(({ slug: s, label, group }) => ({ slug: s, label, group })),
  });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => [
  { title: data ? `${data.label} — ${data.tab.label} templates` : 'Template not found' },
];

type Width = 'desktop' | 'mobile';
type Scheme = 'light' | 'dark';

/** What each copy status means, spelled out rather than left as a colour. */
const COPY_STATUS: Record<CopyStatus, { label: string; note: string } | null> = {
  given: { label: 'as supplied', note: 'shipped in the template we were given' },
  proposed: {
    label: 'proposed',
    note: 'written here as a starting point — needs sign-off before release',
  },
  platform: {
    label: 'set in the platform',
    note: 'this field lives in the platform’s own editor, not in the HTML',
  },
  none: null,
};

export default function PlatformTemplateView() {
  const data = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const [showSource, setShowSource] = useState(false);
  const [width, setWidth] = useState<Width>('desktop');
  const [scheme, setScheme] = useState<Scheme>('light');
  const [copied, setCopied] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  const narrow = useNarrowViewport();
  const renderWidth: Width = narrow ? 'mobile' : width;

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key === 'ArrowLeft' && data.previous) {
        navigate(`/platforms/${data.platform}/${data.previous.slug}`);
      }
      if (event.key === 'ArrowRight' && data.next) {
        navigate(`/platforms/${data.platform}/${data.next.slug}`);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [data.previous, data.next, data.platform, navigate]);

  useEffect(() => setCopied(false), [data.slug]);
  useEffect(() => setNavOpen(false), [data.slug]);

  useEffect(() => {
    if (!navOpen) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setNavOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navOpen]);

  async function copySource() {
    try {
      await navigator.clipboard.writeText(data.source);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const frameSrc = `/preview/${data.platform}/${data.slug}${scheme === 'dark' ? '?theme=dark' : ''}`;
  const unsampled = data.variables.filter((variable) => !variable.sampled);
  const subjectStatus = COPY_STATUS[data.subjectStatus];
  const previewStatus = COPY_STATUS[data.previewTextStatus];
  const hasInboxLines = data.subjectStatus !== 'none' || data.previewTextStatus !== 'none';

  return (
    <div className={`shell platform-shell${navOpen ? ' shell--nav-open' : ''}`}>
      <Sidebar
        platform={data.platform}
        tabLabel={data.tab.label}
        templates={data.templates}
        current={data.slug}
      />
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
              {data.group} · {data.index}/{data.count} · {data.file}
            </div>
          </div>

          <div className="topbar__spacer" />

          <PlatformTabs current={data.platform} />

          <div className="segmented">
            <NavButton
              to={data.previous && `/platforms/${data.platform}/${data.previous.slug}`}
              label="‹ Prev"
            />
            <NavButton
              to={data.next && `/platforms/${data.platform}/${data.next.slug}`}
              label="Next ›"
            />
          </div>

          <button
            type="button"
            className="btn"
            aria-pressed={showSource}
            onClick={() => setShowSource((on) => !on)}
          >
            Source
          </button>

          <button type="button" className="btn btn--solid" onClick={copySource}>
            {copied ? 'Copied ✓' : 'Copy HTML'}
          </button>

          <a
            className="btn"
            href={`/preview/${data.platform}/${data.slug}?source=1`}
            download={data.download}
          >
            Download
          </a>
        </div>

        {/* What gets pasted where, and in which syntax. Stated on every
            template because it differs per platform and is the mistake with
            the worst blast radius — a Rise.ai body pasted over the Global
            theme takes the header and footer with it. */}
        <dl className="dispatch__fields">
          <div className="field-row">
            <dt>
              Paste into
              <span className="field-row__where">{data.tab.label}</span>
            </dt>
            <dd>
              <code className="field-row__value">{data.tab.pasteInto}</code>
              {data.wrapInGlobalTheme ? (
                <span className="field-row__note">
                  body only — the header and footer come from the Global theme
                </span>
              ) : null}
            </dd>
          </div>

          <div className="field-row field-row--variables">
            <dt>
              Variables
              <span className="field-row__where">{data.tab.syntax}</span>
            </dt>
            <dd>
              {data.variables.length === 0 ? (
                <code className="field-row__value field-row__value--empty">None</code>
              ) : (
                <code className="field-row__value">
                  {data.variables.map((variable) => variable.token).join(', ')}
                </code>
              )}
              <span className="field-row__note">
                {unsampled.length > 0
                  ? `${unsampled.length} with no sample value, shown outlined in the preview`
                  : 'substituted for the preview only — Source and Download keep them'}
              </span>
            </dd>
          </div>
        </dl>

        {hasInboxLines ? (
          <section className="dispatch" aria-label="Inbox lines">
            <div className="dispatch__inbox">
              <span className="dispatch__eyebrow">As it lands in the inbox</span>
              <div className="dispatch__row">
                <span className="dispatch__sender">Stickerize</span>
                {data.subject ? (
                  <p className="dispatch__subject">{data.subject}</p>
                ) : (
                  <p className="dispatch__subject">
                    {data.subjectStatus === 'platform'
                      ? `Set in ${data.tab.label}`
                      : 'No subject yet'}
                  </p>
                )}
                {data.previewText ? (
                  <p className="dispatch__preheader">{data.previewText}</p>
                ) : (
                  <p className="dispatch__preheader dispatch__preheader--empty">
                    {data.previewTextStatus === 'platform'
                      ? `Set in ${data.tab.label} — the template only carries the tag`
                      : 'No preview text — the client will scrape the top of the email instead'}
                  </p>
                )}
              </div>
            </div>

            <dl className="dispatch__fields">
              <div className="field-row field-row--primary">
                <dt>
                  Subject
                  {subjectStatus ? (
                    <span className="field-row__where">{subjectStatus.label}</span>
                  ) : null}
                </dt>
                <dd>
                  {data.subject ? (
                    <code className="field-row__value">{data.subject}</code>
                  ) : (
                    <code className="field-row__value field-row__value--empty">Not set</code>
                  )}
                  {subjectStatus ? (
                    <span className="field-row__note">{subjectStatus.note}</span>
                  ) : null}
                </dd>
              </div>

              <div className="field-row">
                <dt>
                  Preview text
                  {previewStatus ? (
                    <span className="field-row__where">{previewStatus.label}</span>
                  ) : null}
                </dt>
                <dd>
                  {data.previewText ? (
                    <code className="field-row__value">{data.previewText}</code>
                  ) : (
                    <code className="field-row__value field-row__value--empty">Not set</code>
                  )}
                  {previewStatus ? (
                    <span className="field-row__note">{previewStatus.note}</span>
                  ) : null}
                </dd>
              </div>
            </dl>
          </section>
        ) : null}

        {data.notes.length > 0 ? (
          <div className="banner banner--notes">
            <strong>Before sign-off</strong>
            {data.notes.map((note) => (
              <code key={note}>{note}</code>
            ))}
          </div>
        ) : null}

        {showSource ? (
          <div className="source">
            <pre>{data.source}</pre>
          </div>
        ) : (
          <div className="stage">
            <div className={`viewer${renderWidth === 'mobile' ? ' viewer--mobile' : ''}`}>
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
                        name === 'light'
                          ? 'Render as sent'
                          : data.darkStrategy === 'authored'
                            ? "The template's own dark-mode CSS"
                            : 'Simulate a mail client forcing dark mode'
                      }
                      onClick={() => setScheme(name)}
                    >
                      {name === 'light' ? '☀ Light' : '☾ Dark'}
                    </button>
                  ))}
                </div>

                <div className="viewer__spacer" />

                <span className="topbar__meta">
                  {data.darkStrategy === 'authored' ? 'dark mode authored' : 'dark mode simulated'}
                </span>
              </div>

              <iframe
                key={`${data.platform}-${data.slug}-${renderWidth}-${scheme}`}
                src={frameSrc}
                title={`${data.label} preview`}
              />
            </div>
          </div>
        )}

        {scheme === 'dark' && !showSource ? (
          <p className="stage__note">{data.darkNote}</p>
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

function Sidebar({
  platform,
  tabLabel,
  templates,
  current,
}: {
  platform: string;
  tabLabel: string;
  templates: SidebarTemplate[];
  current: string;
}) {
  const [query, setQuery] = useState('');

  const buckets = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const matches = needle
      ? templates.filter((template) =>
          `${template.label} ${template.slug} ${template.group}`.toLowerCase().includes(needle),
        )
      : templates;

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
      <Link className="sidebar__brand" to={`/platforms/${platform}`}>
        ← All {tabLabel} <span className="sidebar__count">{templates.length}</span>
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
                to={`/platforms/${platform}/${template.slug}`}
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
