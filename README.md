# o-forms [![CircleCI](https://circleci.com/gh/Financial-Times/o-forms.png?style=shield&circle-token=8d39afee1e3c3b1f586770034db9673b791cb4f8)](https://circleci.com/gh/Financial-Times/o-forms) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

FT-branded styles for form elements.

- [Markup](#markup)
	- [Single input fields](#single-input-fields)
		- [`input[type=text]`](#input[type=text])
		- [`input[type=password]`](#input[type=password])
		- [`textarea`](#textarea)
		- [`select`](#select)
		- [Modifiers](#modifiers)
	- [Multiple input fields](#multiple-input-fields)
		- [`input[type=radio]` (Round)](#input[type=radio]-round)
		- [`input[type=radio]` (Box)](#input[type=radio]-box)
		- [`input[type=checkbox]` (Square)](#input[type=checkbox]-square)
		- [`input[type=checkbox]` (Toggle)](#input[type=checkbox]-toggle)
	- [Uncategorised input fields](#uncategorised-input-fields)
		- [`Date inputs`](#date-inputs)
		- [`Anchors`](#anchors)
	- [Shared Modifiers](#shared-modifiers)
		- [Field modifiers](#field-modifiers)
		- [Input modifiers](#input-modifiers)
- [Sass](#sass)
- [JavaScript](#javascript)
- [Migration guide](#migration-guide)
- [Contact](#contact)
- [License](#license)


## Markup
`o-forms` defines form elements as a combination of 'fields' and 'inputs'. At its core, a field holds the information about an input and the input itself.

Regardless of the input type used, all elements follow the same structure:
```
┌— field container (.o-forms-field) —————┐
|      (one of div or label)             |
|                                        |
|  ┌ title container (.o-forms-title) ┐  |
|  |    (group titles or              |  |
|  |     individual input labels)     |  |
|  └——————————————————————————————————┘  |
|                                        |
|  ┌ input container (.o-forms-input) ┐  |
|  |    (group inputs or              |  |
|  |     individual inputs)           |  |
|  └——————————————————————————————————┘  |
└————————————————————————————————————————┘
```

Bearing that in mind, all form elements are divided into main two categories, with a couple of outliers: 
- [single input fields](#single-input-fields)
- [multiple input fields](#multiple-input-fields)
- [uncategorised input fields](#uncategorised-input-fields)

Overall, the same modifiers will work for the structure outlined above. 
If a particular form element has a unique modifier, it will be under its markup description.
- [Field modifiers](#field-modifiers)
- [Input modifiers](#input-modifiers)

### Single input fields

Every single input field requires a root structure that looks like this:
```html
<label class="o-forms-field">
	<span class="o-forms-title">
		<span class="o-forms-title--main"> Label for input here </span>
		<span class="o-forms-title--prompt"> Optional text to describe the input here </span>
	</span>

	<span class="o-forms-input">
		<!-- input element -->
	</span>
</label>
```
And each input in this structure input relies on a different modifier.

#### `input[type=text]`
```html
...
	<span class="o-forms-input o-forms-input--text">
		<input type="text"/>
	</span>
...
```

#### `input[type=password]`
```html
...
	<span class="o-forms-input o-forms-input--password">
		<input type="password"/>
	</span>
...
```

#### `textarea`
```html
...
	<span class="o-forms-input o-forms-input--textarea">
		<textarea></textarea>
	</span>
...
```

#### `select`
```html
...
	<span class="o-forms-input o-forms-input--select">
		<select>
			<option>Option 1</option>
			<!-- further options -->
		</select>
	</span>
...
```
It is also possible to have a multiple select input by adding the `multiple` attribute	:
```diff
...
	<span class="o-forms-input o-forms-input--select">
-		<select>
+		<select multiple>
			<option>Option 1</option>
			<!-- further options -->
		</select>
	</span>
...
```

#### Modifiers
All single input fields accept the following modifiers on the input container:
- `o-forms-input--small`: reduces the height of the input field
- `o-forms-input--suffix`: inlines a sibling element (e.g. a button) with the input
- `o-forms-title--shrink`: shrinks the title container to the width of a shorter title:
```diff
...
	<span class="o-forms-title o-forms-title--shrink">
		<span class="o-forms-title--main"> Label for input here </span>
		<span class="o-forms-title--prompt"> Optional text to describe the input here </span>
	</span>
...
```
### Multiple input fields
A multiple input field is considered a field with multiple sibling inputs, e.g. radio buttons.

Every multiple input field requires a root structure that looks like this:
```html
<div class="o-forms-field">
	<span class="o-forms-title">
		<span class="o-forms-title--main">Group Title</span>
		<span class="o-forms-title--prompt">Group info</span>
	</span>

	<span class="o-forms-input">
		<!-- sibling inputs -->
	</span>
</div>
```
Both radio and checkbox inputs have two different styles in `o-forms`, and those can be output with different modifiers:

#### `input[type=radio]` (Round)
For a regular, round radio button, you'll need the following markup:
```html
...
	<span class="o-forms-input o-forms-input--radio-round">
		<label>
			<input type="radio" name="my-round-radio"/>
			<span class="o-forms-input__label">Radio 1</span>
		</label>
		<label>
			<input type="radio" name="my-round-radio"/>
			<span class="o-forms-input__label">Radio 2</span>
		</label>
	</span>
...
```
[_See the full markup for a round radio button in the registry_](#TODO)

#### `input[type=radio]` (Box)
For a box-like, rectangular radio button, you'll need the following markup:
```html
...
	<span class="o-forms-input o-forms-input--radio-box">
		<div class="o-forms-input--radio-box__container">
			<label>
				<input type="radio" name="my-box-radio"/>
				<span class="o-forms-input__label">Radio 1</span>
			</label>
			<label>
				<input type="radio" name="my-box-radio"/>
				<span class="o-forms-input__label">Radio 2</span>
			</label>
		</div>
	</span>
...
```
[_See the full markup for a box radio button in the registry_](#TODO)

This is currently the only input type that accepts state. In order to add a spinner or tick to the radio box.
The input container accepts one of two modifiers at a time:
- `o-forms-input--saving`
- `o-forms-input--saved`

The markup will need to be updated to look like this:
```diff
...
-	<span class="o-forms-input o-forms-input--radio-box">
+	<span class="o-forms-input o-forms-input--radio-box">
		<div class="o-forms-input--radio-box__container">
			<label>
				<input type="radio" name="my-box-radio"/>
				<span class="o-forms-input__label">Radio 1</span>
			</label>
			<label>
				<input type="radio" name="my-box-radio"/>
				<span class="o-forms-input__label">Radio 2</span>
			</label>
		</div>
+		<span class="o-forms-input__state"></span>
	</span>
...
```
You can also add `o-forms-input__state--icon-only` to the `<span>` to avoid displaying the status text.

#### `input[type=checkbox]` (Square)
For a regular, squared checkbox, you'll need the following markup:
```html
...
	<span class="o-forms-input o-forms-input--checkbox">
		<label>
			<input type="checkbox" name="my-checkbox"/>
			<span class="o-forms-input__label">Checkbox 1</span>
		</label>
		<label>
			<input type="checkbox" name="my-checkbox"/>
			<span class="o-forms-input__label">Checkbox 2</span>
		</label>
	</span>
...
```
[_See the full markup for a square checkbox in the registry_](#TODO)

#### `input[type=checkbox]` (Toggle)

For a toggle checkbox, you'll need the following markup:
```html
...
	<span class="o-forms-input o-forms-input--toggle">
		<label>
			<input type="checkbox" name="my-toggle"/>
			<span class="o-forms-input__label">Toggle 1</span>
		</label>
		<label>
			<input type="checkbox" name="my-toggle"/>
			<span class="o-forms-input__label">Toggle 2</span>
		</label>
	</span>
...
```
[_See the full markup for a toggle checkbox in the registry_](#TODO)

This is currently the only input type that has an inverse state. 
For this you'll need to add the `o-forms-field--inverse` to the parent element:

```diff
-<div class="o-forms-field">
+<div class="o-forms-field o-forms-field--inverse">
	<span class="o-forms-title">
		...
	</span>

	<span class="o-forms-input o-forms-input--toggle">
		<!-- toggle inputs -->
	</span>
</div>
```

### Uncategorised input fields
Date inputs and anchor with box-like styling are outliers to the rules above.

#### Date inputs
We do not use `input[type=date]`, but instead combine three `input[type=text]` within the [base structure for a multiple input field](#multiple-input-fields), as shown below:
```html
...
	<span class="o-forms-input o-forms-input--date">
		<label>
			<input type="text" pattern="[0-9]{2}" name="my-date"/>
			<span class="o-forms-input__label">DD</span>
		</label>
		<label>
			<input type="text" pattern="0?[1-9]|1[012]" name="my-date"/>
			<span class="o-forms-input__label">MM</span>
		</label>
		<label>
			<input type="text" pattern="[0-9]{4}" name="my-date"/>
			<span class="o-forms-input__label">YYYY</span>
		</label>
	</span>
...
```
[_See the full markup for a date input in the registry_](#TODO)

#### Anchors
Anchors are an entirely separate entity. They _look_ like a form element but do not function as one.

```html
<div class="o-forms-input o-forms-input--pseudo-radio-box ">
		<a class="o-forms__anchor o-forms__anchor--current" href="#">Anchor Link A</a>
		<a class="o-forms__anchor" href="#">Anchor Link B</a>
</div>
```
[_See the full markup for an anchor in the registry_](#TODO)

### Shared Modifiers
The markup structure outlined at the beginning of this section indicates containers for a form field that accept modifiers.

#### Field Modifiers
The following modifiers are available for the `o-forms-field` element:
- `o-forms-field--optional`: indicates that a field is optional, and will append `(optional)` to the end of the field's title.
- `o-forms-field--inline`: inlines the title container to the input container

#### Input Modifiers
- `o-forms-input--valid`: identifies a valid input, gets set dynamically on form valdiation
- `o-forms-input--invalid`: identifies an invalid input, gets set dynamically on form valdiation. This requires additional markup to be added as a direct child of the `o-forms-input` element:
```diff
-<span class="o-forms-input">
+<span class="o-forms-input o-forms--invalid">
	<!-- input(s) -->
+	<span class="o-forms-input__error>Error message here</span>
</span>
```
- `o-forms-input--inline`: inlines all inputs with each other (usually only used o multiple input fields).

## Migration

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 7 | N/A | [migrate to v7](MIGRATION.md#migrating-from-v6-to-v7) |
⚠ maintained | 6 | 6.0 | [migrate to v6](MIGRATION.md#migrating-from-v5-to-v6) |
╳ deprecated | 5 | 5.11 | [migrate to v5](MIGRATION.md#migrating-from-v4-to-v5) |
╳ deprecated | 4 | 4.1 | [migrate to v4](MIGRATION.md#migrating-from-v3-to-v4) |
╳ deprecated | 3 | 3.5 | [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
╳ deprecated | 2 | 2.0 | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
╳ deprecated | 1 | 1.0 | [migrate to v1](MIGRATION.md#migrating-to-v1) |
╳ deprecated | 0 | 0.13 | N/A |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-forms/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

[bem]: http://getbem.com/naming/
