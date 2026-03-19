const Contact = require("../models/contact");
const { Types } = require("mongoose");

const getAll = async (req, res) => {
	try {
		const lists = await Contact.find();
		res.setHeader("Content-Type", "application/json");
		res.status(200).json(lists);
	} catch (error) {
		res.status(500).json({ message: error.message || "Some error occurred while retrieving contacts." });
	}
};

const getSingle = async (req, res) => {
	try {
		const userId = req.params.id;
		if (!Types.ObjectId.isValid(userId)) {
			return res.status(400).json({ message: "Invalid contact ID format." });
		}
		
		const contact = await Contact.findById(userId);
		if (contact) {
			res.setHeader("Content-Type", "application/json");
			res.status(200).json(contact);
		} else {
			res.status(404).json({ message: "Contact not found with the specified ID." });
		}
	} catch (error) {
		res.status(500).json({ message: error.message || "An unexpected error occurred." });
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

		const response = await contact.save();

		if (response) {
			res.status(201).json({ id: response._id });
		} else {
			res.status(500).json({ message: "Failed to create contact." });
		}
	} catch (error) {
		res.status(500).json({ message: error.message || "An unexpected error occurred while creating the contact." });
	}
};

const updateContact = async (req, res) => {
	/*
		#swagger.description = 'Update a specific contact by ID'
		#swagger.parameters['body'] = {
			in: 'body',
			description: 'Fields to update for the contact.',
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
		const userId = req.params.id;
		if (!Types.ObjectId.isValid(userId)) {
			return res.status(400).json({ message: "Invalid contact ID format." });
		}

		const updateData = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			favoriteColor: req.body.favoriteColor,
			birthday: req.body.birthday,
		};

		const response = await Contact.findByIdAndUpdate(userId, updateData);

		if (response) {
			res.status(204).send();
		} else {
			res.status(404).json({ message: "Contact not found with the specified ID." });
		}
	} catch (error) {
		res.status(500).json({ message: error.message || "An unexpected error occurred while updating the contact." });
	}
};

const deleteContact = async (req, res) => {
	try {
		const userId = req.params.id;
		if (!Types.ObjectId.isValid(userId)) {
			return res.status(400).json({ message: "Invalid contact ID format." });
		}

		const response = await Contact.findByIdAndDelete(userId);

		if (response) {
			res.status(204).send();
		} else {
			res.status(404).json({ message: "Contact not found with the specified ID." });
		}
	} catch (error) {
		res.status(500).json({ message: error.message || "An unexpected error occurred while deleting the contact." });
	}
};

module.exports = {
	getAll,
	getSingle,
	createContact,
	updateContact,
	deleteContact,
};
