import React from "react";
import axios from "axios";

import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";

axios.defaults.xsrfHeaderName = "x-csrf-token";

const pages = {
  './pages/Home.jsx': () => import('./pages/Home.jsx'),
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
    createRoot(el).render(<App {...props} />);
  },
});
