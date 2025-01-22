import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import tailwindStyles from "./styles/tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindStyles },
];

export default function Root() {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <Links />
        <title>Kuripura Remix App</title>
      </head>
      <body>
        {/* ここに共通レイアウトを含めてもよい */}
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}