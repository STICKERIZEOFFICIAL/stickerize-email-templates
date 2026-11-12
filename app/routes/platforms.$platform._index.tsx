import type { LinksFunction, LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { Link, json, useLoaderData } from '@remix-run/react';
import { useMemo, useState } from 'react';
import { PlatformTabs } from '~/platforms/PlatformTabs';
import platformStyles from '~/platforms/platforms.css';
import { getTab, grouped, isPlatformId, templatesFor } from '~/platforms/registry';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: platformStyles }];

export async function loader({ params }: LoaderFunctionArgs) {
  const { platform } = params;
  if (!isPlatformId(platform)) {
    throw new Response(`Unknown platform: ${platform}`, { status: 404 });
  }

  const tab = getTab(platform)!;

  return json({
    platform,
    tab,
    templates: templatesFor(platform).map(
      ({ slug, label, group, description, subjectStatus, previewTextStatus, notes }) => ({
        slug,
        label,
        group,
        description,
        subjectStatus,
        previewTextStatus,
        noteCount: notes?.length ?? 0,
      }),
    ),
  });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => [
  { title: data ? `${data.tab.label} — STICKERIZE templates` : 'Platform not found' },
];

export default function PlatformIndex() {
  const { platform, tab, templates } = useLoaderData<typeof loader>();
  const [query, setQuery] = useState('');

  const buckets = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const matches = needle
      ? templates.filter((template) =>
          `${template.label} ${template.slug} ${template.description} ${template.group}`
            .toLowerCase()
            .includes(needle),
        )
      : templates;
    return grouped(matches);
  }, [templates, query]);

  const total = buckets.reduce((sum, bucket) => sum + bucket.templates.length, 0);
  const proposed = templates.filter(
    (template) => template.subjectStatus === 'proposed' || template.previewTextStatus === 'proposed',
  ).length;

  return (
    <div className="shell shell--wide platform-shell">
      <main>
        <div className="topbar">
          <strong className="topbar__title">Stickerize / {tab.label}</strong>
          <span className="topbar__meta">
            {total} of {templates.length}
          </span>
          <div className="topbar__spacer" />
          <PlatformTabs current={platform} />
          <label>
            <span className="sr-only" hidden>
              Search templates
            </span>
            <input
              className="field"
              style={{ width: 220, maxWidth: '100%' }}
              type="search"
              placeholder="Search templates…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
        </div>

        <div className="page">
          <div className="page__header">
            <h1>{tab.label}</h1>
            <p>{tab.blurb}</p>
          </div>

          {/* Each platform wants its variables written differently and its HTML
              pasted somewhere different. Getting either wrong is the most
              likely mistake, so both are stated before the templates. */}
          <dl className="dispatch__fields" style={{ marginBottom: 24 }}>
            <div className="field-row field-row--variables">
              <dt>Variables</dt>
              <dd>
                <code className="field-row__value">{tab.syntax}</code>
                <span className="field-row__note">
                  substituted in the preview only — Source and Download keep them
                </span>
              </dd>
            </div>
            <div className="field-row">
              <dt>Paste into</dt>
              <dd>
                <code className="field-row__value">{tab.pasteInto}</code>
              </dd>
            </div>
            {proposed > 0 ? (
              <div className="field-row">
                <dt>Needs sign-off</dt>
                <dd>
                  <code className="field-row__value">
                    {proposed} {proposed === 1 ? 'email has' : 'emails have'} proposed inbox lines
                  </code>
                  <span className="field-row__note">
                    no approved subject or preview text was supplied for this platform
                  </span>
                </dd>
              </div>
            ) : null}
          </dl>

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
                      to={`/platforms/${platform}/${template.slug}`}
                      prefetch="intent"
                    >
                      <div className="card__thumb">
                        <iframe
                          src={`/preview/${platform}/${template.slug}`}
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
