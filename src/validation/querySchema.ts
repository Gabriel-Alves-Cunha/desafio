export const querySchema = {
	type: "number",
	positive: true,
	integer: true,
	$$root: true, // Basically the validator expects that you want to validate a Javascript object. If you want others, you can define the root level schema, as well. In this case set the $$root: true property.
};
