const Contact = require("../models/contact");

const getAll = async (req, res) => {
	try {
		const contacts = await Contact.find();
		res.setHeader("Content-Type", "application/json");
		res.status(200).json(contacts);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getSingle = async (req, res) => {
	try {
		const contact = await Contact.findById(req.params.id);
		if (contact) {
			res.setHeader("Content-Type", "application/json");
			res.status(200).json(contact);
		} else {
			res.status(404).json({ error: "Contact not found" });
		}
	} catch (error) {
		if (error.name === "CastError") {
			res.status(400).json({ error: "Invalid contact ID" });
		} else {
			res.status(500).json({ error: error.message });
		}
	}
};

const createContact = async (req, res) => {
	/*
		#swagger.description = 'Create a new contact'
		#swagger.parameters['body'] = {
			in: 'body',
			description: 'Contact data',
			schema: {
				firstName: "John",
				lastName: "Doe",
				email: "john.doe@example.com",
				favoriteColor: "blue",
				birthday: "2000-01-15"
			}
		}
	*/
	try {
		const contact = new Contact({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			favoriteColor: req.body.favoriteColor,
			birthday: req.body.birthday,
		});

		const savedContact = await contact.save();
		res.status(201).json({ id: savedContact._id });
	} catch (error) {
		if (error.name === "ValidationError") {
			const errors = Object.values(error.errors).map(
				(err) => err.message,
			);
			res.status(400).json({ error: errors.join(", ") });
		} else {
			res.status(500).json({ error: error.message });
		}
	}
};

const updateContact = async (req, res) => {
	/*
		#swagger.description = 'Update a specific contact by ID'
		#swagger.parameters['body'] = {
			in: 'body',
			description: 'Fields to update for the contact. You only need to send the fields you want to update.',
			schema: {
				firstName: "John",
				lastName: "Doe",
				email: "john.doe@example.com",
				favoriteColor: "blue",
				birthday: "2000-01-15"
			}
		}
	*/
	try {
		if (
			!req.body.firstName &&
			!req.body.lastName &&
			!req.body.email &&
			!req.body.favoriteColor &&
			!req.body.birthday
		) {
			res.status(400).send({
				message:
					"Content can not be empty! Please provide at least one field to update.",
			});
			return;
		}

		// Build the update object dynamically
		const updateData = {};
		if (req.body.firstName) updateData.firstName = req.body.firstName;
		if (req.body.lastName) updateData.lastName = req.body.lastName;
		if (req.body.email) updateData.email = req.body.email;
		if (req.body.favoriteColor)
			updateData.favoriteColor = req.body.favoriteColor;
		if (req.body.birthday) updateData.birthday = req.body.birthday;

		const updatedContact = await Contact.findByIdAndUpdate(
			req.params.id,
			{ $set: updateData },
			{ new: true, runValidators: true },
		);

		if (updatedContact) {
			res.status(204).send();
		} else {
			res.status(404).json({ error: "Contact not found" });
		}
	} catch (error) {
		if (error.name === "ValidationError") {
			const errors = Object.values(error.errors).map(
				(err) => err.message,
			);
			res.status(400).json({ error: errors.join(", ") });
		} else {
			res.status(500).json({ error: error.message });
		}
	}
};

const deleteContact = async (req, res) => {
	try {
		const deletedContact = await Contact.findByIdAndDelete(req.params.id);
		if (deletedContact) {
			res.status(204).send();
		} else {
			res.status(404).json({ error: "Contact not found" });
		}
	} catch (error) {
		if (error.name === "CastError") {
			res.status(400).json({ error: "Invalid contact ID" });
		} else {
			res.status(500).json({ error: error.message });
		}
	}
};

module.exports = {
	getAll,
	getSingle,
	createContact,
	updateContact,
	deleteContact,
};
