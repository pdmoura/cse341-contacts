const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			trim: true,
			minlength: 1,
			maxlength: 50,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
			minlength: 1,
			maxlength: 50,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
			match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
		},
		favoriteColor: {
			type: String,
			required: true,
			trim: true,
			minlength: 1,
			maxlength: 30,
		},
		birthday: {
			type: String,
			required: true,
			trim: true,
			match: /^\d{4}-\d{2}-\d{2}$/,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

contactSchema.pre("save", function (next) {
	if (this.birthday) {
		const date = new Date(this.birthday);
		if (isNaN(date.getTime())) {
			return next(new Error("Invalid date"));
		}
	}
	next();
});

module.exports = mongoose.model("Contact", contactSchema);
