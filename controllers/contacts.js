const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
	const result = await mongodb.getDb().db().collection("contacts").find();
	result.toArray().then((lists) => {
		res.setHeader("Content-Type", "application/json");
		res.status(200).json(lists);
	});
};

const getSingle = async (req, res) => {
	try {
		const userId = new ObjectId(req.params.id);
		const result = await mongodb
			.getDb()
			.db()
			.collection("contacts")
			.find({ _id: userId });
		result.toArray().then((lists) => {
			if (lists.length > 0) {
				res.setHeader("Content-Type", "application/json");
				res.status(200).json(lists[0]);
			} else {
				res.status(404).json({ error: "Contact not found" });
			}
		});
	} catch (error) {
		res.status(400).json({ error: "Invalid contact ID" });
	}
};

const createContact = async (req, res) => {
	try {
		if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.favoriteColor || !req.body.birthday) {
			res.status(400).send({ message: "Content can not be empty!" });
			return;
		}
		const contact = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			favoriteColor: req.body.favoriteColor,
			birthday: req.body.birthday,
		};

		const response = await mongodb
			.getDb()
			.db()
			.collection("contacts")
			.insertOne(contact);

		if (response.acknowledged) {
			res.status(201).json({ id: response.insertedId });
		} else {
			res.status(500).json({ error: "Failed to create contact" });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const updateContact = async (req, res) => {
	/*
		#swagger.description = 'Update a specific contact by ID'
		#swagger.parameters['body'] = {
			in: 'body',
			description: 'Fields to update for the contact. You only need to send the fields you want to update.',
			schema: {
				firstName: "string",
				lastName: "string",
				email: "string",
				favoriteColor: "string",
				birthday: "string"
			}
		}
	*/
	try {
		const userId = new ObjectId(req.params.id);
		
		// Ensure that at least one field is being updated
		if (!req.body.firstName && !req.body.lastName && !req.body.email && !req.body.favoriteColor && !req.body.birthday) {
			res.status(400).send({ message: "Content can not be empty! Please provide at least one field to update." });
			return;
		}

		// Build the update object dynamically, ignoring Swagger UI defaults ("string", "any")
		const updateData = {};
		if (req.body.firstName && req.body.firstName !== "string" && req.body.firstName !== "any") updateData.firstName = req.body.firstName;
		if (req.body.lastName && req.body.lastName !== "string" && req.body.lastName !== "any") updateData.lastName = req.body.lastName;
		if (req.body.email && req.body.email !== "string" && req.body.email !== "any") updateData.email = req.body.email;
		if (req.body.favoriteColor && req.body.favoriteColor !== "string" && req.body.favoriteColor !== "any") updateData.favoriteColor = req.body.favoriteColor;
		if (req.body.birthday && req.body.birthday !== "string" && req.body.birthday !== "any") updateData.birthday = req.body.birthday;

		if (Object.keys(updateData).length === 0) {
			res.status(400).send({ message: "No valid fields provided to update." });
			return;
		}

		const response = await mongodb
			.getDb()
			.db()
			.collection("contacts")
			.updateOne({ _id: userId }, { $set: updateData });

		if (response.modifiedCount > 0) {
			res.status(204).send();
		} else {
			res.status(404).json({ error: "Contact not found" });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const deleteContact = async (req, res) => {
	try {
		const userId = new ObjectId(req.params.id);
		const response = await mongodb
			.getDb()
			.db()
			.collection("contacts")
			.deleteOne({ _id: userId });

		if (response.deletedCount > 0) {
			res.status(204).send();
		} else {
			res.status(404).json({ error: "Contact not found" });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	getAll,
	getSingle,
	createContact,
	updateContact,
	deleteContact,
};
