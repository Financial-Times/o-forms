export default {
	form: `
<form action="" data-o-component="o-forms">

	<div class="o-forms-field" role="group" aria-labelledby="date-group-title">
		<span class="o-forms-title" aria-hidden="true">
			<span class="o-forms-title--main" id="date-group-title">Date input</span>
		</span>

		<span class="o-forms-input o-forms-input--date">
			<label>
				<span class="o-forms-input__label" aria-hidden="true">DD</span>
				<input type="text" name="" value="" pattern="[0-9]{2}" aria-label="" required>
			</label>
			<label>
				<span class="o-forms-input__label" aria-hidden="true">MM</span>
				<input type="text" name="" value="" pattern="0?[1-9]|1[012]" aria-label="" required>
			</label>
			<label>
				<span class="o-forms-input__label" aria-hidden="true">YYYY</span>
				<input type="text" name="" value="" pattern="[0-9]{4}" aria-label="" required>
			</label>
		</span>
	</div>

	<label class="o-forms-field">
		<span class="o-forms-title">
			<span class="o-forms-title--main">Required text input</span>
		</span>

		<span class="o-forms-input o-forms-input--text">
			<input type="text" name="text" value="" required>
		</span>
	</label>

	<label class="o-forms-field o-forms-field--optional">
		<span class="o-forms-title">
			<span class="o-forms-title--main">Optional text input</span>
		</span>

		<span class="o-forms-input o-forms-input--text">
			<input type="text" name="text" value="">
		</span>
	</label>

	<input class="o-buttons" type="submit">
</form>
`,
	field: `
<label class="o-forms-field o-forms-field--optional">
	<span class="o-forms-title">
		<span class="o-forms-title--main">Optional text input</span>
	</span>

	<span class="o-forms-input o-forms-input--text">
		<input type="text" name="text" value="">
	</span>
</label>
`,
	requiredField: `
<label class="o-forms-field">
	<span class="o-forms-title">
		<span class="o-forms-title--main">Required text input</span>
	</span>

	<span class="o-forms-input o-forms-input--text">
		<input type="text" name="text" value="" required>
	</span>
</label>
`,
	fieldWithPattern: `
<label class="o-forms-field o-forms-field--optional">
	<span class="o-forms-title">
		<span class="o-forms-title--main">Required date input</span>
	</span>

	<span class="o-forms-input o-forms-input--text">
		<input type="text" name="text" pattern="[0-9]{2}" value="" required>
	</span>
</label>
`
};