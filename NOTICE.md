# Third-Party Notices

This project incorporates third-party software and services listed below. The original copyright notices and license terms are reproduced for informational purposes only; they do not alter the license under which this project itself is distributed. This project itself is licensed under the MIT License — see [LICENSE](LICENSE).

Scope: this file covers packages bundled into the production JavaScript bundle, plus external services loaded by the app at runtime. Build-only tooling (Webpack, Babel, Pug compiler, ESLint, test runners, etc.) is excluded, since it never ships in the built output.

## Bundled npm packages

All packages below are MIT-licensed. The full MIT text is reproduced once at the end of this file.

| Package | Version | License | Copyright |
|---|---|---|---|
| Ajv | 5.5.2 | MIT | Copyright (c) 2015 Evgeny Poberezkin |
| Axios | 0.24.0 | MIT | Copyright (c) 2014-present Matt Zabriskie |
| iView | 3.5.4 | MIT | Copyright (c) 2016-present TalkingData |
| Moment.js | 2.24.0 | MIT | Copyright (c) JS Foundation and other contributors |
| Vue | 2.6.10 | MIT | Copyright (c) 2013-present, Yuxi (Evan) You |
| Vue Router | 3.0.6 | MIT | Copyright (c) 2013-present Evan You |
| vue-uuid | 2.0.2 | MIT | Copyright (c) 2017-present Vitor Luiz Cavalcanti |
| Vuex | 3.6.2 | MIT | Copyright (c) 2015-present Evan You |

### Assets bundled inside the above packages

- **Ionicons** (icon font) — bundled in iView's distributed CSS/fonts. MIT License.
- **normalize.css** — bundled in iView's distributed CSS. MIT License, Copyright (c) Nicolas Gallagher and Jonathan Neal.

## External services loaded at runtime

These are not npm packages; the end user's browser fetches them directly from the vendor's servers at page load.

| Service | Loaded from | Terms |
|---|---|---|
| Google Fonts (Cairo, Oxygen, Yuji Boku) | [src/components/Menu.vue](src/components/Menu.vue) via `fonts.googleapis.com` | [Google APIs Terms of Service](https://developers.google.com/terms) |
| Facebook JavaScript SDK | [src/components/Facebook.vue](src/components/Facebook.vue) via `connect.facebook.net` | [Meta Platform Terms](https://developers.facebook.com/terms) |

Both requests are made directly from the browser to the vendor's servers, independent of this project's own backend, and may transmit data such as the visitor's IP address to Google and Meta respectively.

## MIT License text

```
The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
