## fieldset
can be used where [flow content](flow-content) is expected



## content categories

A grouping that defines an elements' behaviour and associated rules

#### metadata content

Elements in the metadata content category are responsible for the behaviour of the rest of the document. They set up links to other documents, and are responsible for 'out-of-band' information(??? any communication that happens outside of the communication between the HTTP client and the HTTP server???). These elements sit in the `<head>` element:

- `<base>`
- `<link>`
- `<meta>`
- `<noscript>`
- `<script>`
- `<style>`
- `<title>`

#### flow content

Elements in the flow content category are generally defined by having a at least one [text node](text-node) or child element that is falls under the embedded content category, but the rule allows for legitimately empty elements as placeholders or templates.

- `<a>`
- `<abbr>`
- `<address>`
- `<area>` (only as a child of a `<map>` element)
- `<article>`
- `<aside>`
- `<audio>`
- `<b>`
- `<bdi>`
- `<bdo>`
- `<blockquote>`
- `<br>`
- `<button>`
- `<canvas>`
- `<cite>`
- `<code>`
- `<data>`
- `<datalist>`
- `<del>`
- `<details>`
- `<dfn>`
- `<div>`
- `<dl>`
- `<em>`
- `<embed>`
- `<fieldset>`
- `<figure>`
- `<footer>`
- `<form>`
- `<h1>`
- `<h2>`
- `<h3>`
- `<h4>`
- `<h5>`
- `<h6>`
- `<header>`
- `<hgroup>`
- `<hr>`
- `<i>`
- `<iframe>`
- `<img>`
- `<input>`
- `<ins>`
- `<kbd>`
- `<label>`
- `<main>`
- `<map>`
- `<mark>`
- `<math>`
- `<menu>`
- `<meter>`
- `<nav>`
- `<noscript>`
- `<object>`
- `<ol>`
- `<output>`
- `<p>`
- `<pre>`
- `<progress>`
- `<q>`
- `<ruby>`
- `<s>`
- `<samp>`
- `<script>`
- `<section>`
- `<select>`
- `<small>`
- `<span>`
- `<strong>`
- `<sub>`
- `<sup>`
- `<svg>`
- `<table>`
- `<template>`
- `<textarea>`
- `<time>`
- `<ul>`
- `<var>`
- `<video>`
- `<wbr>`
- text nodes

#### sectioning content

Elements in this category define the scope of headings and footers. This means that they receive an outline determining which children belong to which section within the DOM tree. The elements are:

- `<article>`
- `<aside>`
- `<header>`
- `<h1>`
- `<h2>`
- `<h3>`
- `<h4>`
- `<h5>`
- `<h6>`
- `<footer>`
- `<nav>`
- `<section>`

The following markup
```html
<section>
	<h1>Heading 1</h1>
	<p>1. Some text to fill this in</p>

	<h2>Heading 2</h2>
	<p>2. Some text to fill this in</p>
	<h2>Heading 2</h2>
	<p>2. Some text to fill this in</p>

	<h3>Heading 3</h3>
	<p>3. Some text to fill this in</p>

	<section>
		<h2>Nested heading 3</h2>
		<p>4. Some text to fill this in</p>
	</section>
</section>
```

will produce the following outline in the DOM tree:

```bash
└── Section 1 [outline]
    ├── Heading 1 [outline]
    │   └── Paragraph 1
    ├── Heading 2 [outline]
    │   ├── Paragraph 1
    │   └── Paragraph 2
    └── Section 2 [outline]
        └── Heading 3 [outline]
            └── Paragraph 4
```

#### heading content
#### interactive content
#### phrasing content
#### embedded content
