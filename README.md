# Unofficial Lightburn Writer Demo

## Overview

Single Page Application (SPA) demo page demonstrating the features of of the unofficial-lb-writer NPM package.  User can choose from set of phrases, select image from a set of SVG images, and then generate a file which can be imported into Lightburn.  Demo page will be deployed on Vercel.

## Getting Started

### Prerequisites

- Node.js 20+

### Installation

```sh
npm install
```

### Usage

```sh
npm run dev       # start the local dev server
npm run build     # type-check and build for production
npm run preview   # preview the production build
npm run lint      # lint with oxlint
```

### Examples

1. Pick one of the preset phrases.
2. Pick one of the built-in SVG images (star, heart, hexagon, arrow, lightning bolt, house).
3. Review the combined preview.
4. Click **Generate & Download .lbrn2** to download a LightBurn-ready project file with the
   image cut as a vector path and the phrase engraved as text, built with
   [`@richardmcquiston01/unofficial-lb-writer`](https://www.npmjs.com/package/@richardmcquiston01/unofficial-lb-writer).

## Buy Me a Coffee

If this app, code, or repository has helped you or someone you know, please consider donating. I appreciate any help to offset the costs of development and/or AI Credits.

[**Donate via Stripe**](https://donate.stripe.com/00w5kD3Gj1Xo9v7gVOcs800), or scan:

[![Donate via Stripe](./donate.svg)](https://donate.stripe.com/00w5kD3Gj1Xo9v7gVOcs800)

## License

Apache 2

## Copyright

(c)2026 Richard McQuiston.  All rights reserved.
