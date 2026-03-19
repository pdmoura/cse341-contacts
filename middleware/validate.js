const Validator = require('validatorjs');

const saveContact = (req, res, next) => {
    const validationRule = {
        firstName: 'required|string',
        lastName: 'required|string',
        email: 'required|email',
        favoriteColor: 'required|string',
        birthday: ['required', 'string', 'regex:/^\\d{4}-\\d{2}-\\d{2}$/']
    };

    const validator = new Validator(req.body, validationRule, {
        "regex.birthday": "Please provide a valid birthday in the format YYYY-MM-DD."
    });

    if (validator.fails()) {
        res.status(412).send({
            success: false,
            message: 'Validation failed. Please check your request parameters.',
            data: validator.errors.all()
        });
    } else {
        next();
    }
};

module.exports = {
    saveContact
};
