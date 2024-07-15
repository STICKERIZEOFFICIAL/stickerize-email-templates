import { Outlet } from '@remix-run/react';

export default function () {
  return (
    <pre style={{ width: '80vw', textWrap: 'wrap', fontSize: '9px' }}>
      <Outlet />
    </pre>
  );
}
