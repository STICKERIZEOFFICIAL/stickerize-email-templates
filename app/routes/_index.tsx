import type { MetaFunction } from '@remix-run/node';
import { Link, json, useLoaderData } from '@remix-run/react';
import { generateRoutes } from '~/utils/routes';

export async function loader() {
  return json({
    routes: await generateRoutes(),
  });
}

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export default function Index() {
  const { routes } = useLoaderData<typeof loader>();

  function renderList(type: 'shopify' | 'recharge') {
    return (
      <ol>
        {routes
          .filter((url) => url.includes(type))
          .map((url) => (
            <li>
              <Link to={url}>{url.split('/')[2]}</Link>
            </li>
          ))}
      </ol>
    );
  }

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <h1>Shopify Templates</h1>
      {renderList('shopify')}
    </div>
  );
}
