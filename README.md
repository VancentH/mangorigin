# MangOrigin (芒果原)

A single-page e-commerce site built with Vue 2, Vuex, and Vue Router, bundled with Webpack.

> The name "MangOrigin" is a portmanteau of "Mango" and "Origin", reflecting the site's focus on mangoes traceable back to their growing origin.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vue 2.5 |
| State management | Vuex 3 |
| Routing | Vue Router 3 (history mode) |
| HTTP client | Axios |
| UI components | iView |
| Styles | Less |
| Build | Webpack 3, Babel |
| Testing | Karma + Mocha (unit), Nightwatch (e2e) |
| Linting | ESLint (standard config) |

## Project Structure

```text
build/            Webpack configs (dev/prod/test) and build scripts
config/           Environment variables and dev-server settings per environment
src/
  main.js         App entry point; registers router, store, api, and iView
  App.vue         Root component
  Main.vue        Layout shell that wraps routed pages
  router/         Route definitions
  store/          Vuex store and modules
  api/            Axios-based API call modules
  components/     Shared UI components used across pages
  item/           Product listing page and its sub-components
  Question/       FAQ page and its sub-components
  error/          404 / not-found page
  libs/           Shared utility functions
  assets/         Images, mock JSON data, and Less styles
  Home.vue, Cart.vue, Board.vue, Login.vue   Top-level route pages
static/           Static assets copied as-is into the build output
test/
  unit/           Karma + Mocha unit tests
  e2e/            Nightwatch end-to-end tests
```

## Module Responsibilities

### Router (`src/router`)

Maps each path to a page component and sets `document.title` via route meta. All routes nest under `Main.vue`, which renders the shared layout (menu, footer) around the active page.

### Store (`src/store`)

Vuex modules hold state that is shared across components:

- `product`: fetches and caches the product list via `api/product.api.js`.
- `cart`: manages cart items, auto-login state, and derived totals (freight, quantity, order total).
- `spin`: tracks in-flight request count and toggles the global loading spinner.

### API (`src/api`)

Thin Axios wrappers per domain (`product`, `cart`, `login`, `question`, `public`, `private`). Installed as a Vue plugin (`$api`) in `main.js`, and called from Vuex actions rather than directly from components.

### Pages and components

- Pages (`Home.vue`, `Cart.vue`, `Board.vue`, `Login.vue`, `item/`, `Question/`) compose `components/` for rendering and dispatch Vuex actions for data.
- `components/` holds UI pieces reused across pages (item cards, cart button, dialogs, menu, footer, etc.).
- `error/index.vue` is the catch-all 404 page.

### Flow summary

Route change → page component mounts → dispatches a Vuex action → action calls an `api/` module → response commits to store state → components re-render via getters. The `spin` module wraps this cycle to drive the global loading indicator.

## Scripts

```bash
npm run dev      # start dev server
npm run build     # production build
npm run unit      # unit tests
npm run e2e       # end-to-end tests
npm run lint      # lint src and tests
```

## License

MIT, see [LICENSE](LICENSE).

## Third-Party Notices

See [NOTICE.md](NOTICE.md) for bundled open-source licenses and external services (Google Fonts, Facebook SDK) used by this project.
