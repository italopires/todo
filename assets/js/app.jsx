import React from "react";

import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context/auth";

const pages = {
  './pages/Home.jsx': () => import('./pages/Home.jsx'),
  './pages/SignIn.jsx': () => import('./pages/SignIn.jsx'),
};
createInertiaApp({
  resolve: async (name) => {
    const page = pages[`./pages/${name}.jsx`];
    if (!page) {
      throw new Error(`Unknown page: ${name}.jsx`);
    }
    const module = await page();
    return module.default;
  },
  setup({ App, el, props }) {
    createRoot(el).render(
      <AuthProvider>
        <App {...props} />
      </AuthProvider>
    );
  },
});