const { body } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Valdidate/sanitize body parameters before creating or updating tasks in the database
const validations = {
  create: [
  	// Convert yyyy-mm-dd to yyyy/mm/dd format from calendar input. Slashes perferred for javascript date comparison
  	sanitizeBody('due_date').customSanitizer(value => {
      return value.replace(/-/g, '/');
    }),
    body('name').isLength({ min: 1, max: 100 }),
    body('description').isLength({ min: 1, max: 100 }),
    body('due_date', 'Due date should be in YYYY/MM/DD format.')
    .matches(/^(19[5-9][0-9]|20[0-4][0-9]|2050)[/](0?[1-9]|1[0-2])[/](0?[1-9]|[12][0-9]|3[01])$/, 'i')
  ],
  update: [
    //  Sanitize date and check character lengh for name and description
  	sanitizeBody('due_date').customSanitizer(value => {
      return value.replace(/-/g, '/');
    }),
  	body('name').isLength({ min: 1, max: 100 }).optional({nullable: true}),
  	body('description').isLength({ min: 1, max: 100 }).optional({nullable: true}),
    body('due_date', 'Due date should be in YYYY/MM/DD format.')
    .matches(/^(19[5-9][0-9]|20[0-4][0-9]|2050)[/](0?[1-9]|1[0-2])[/](0?[1-9]|[12][0-9]|3[01])$/, 'i')
    .optional({nullable: true}),
    body('completed').isBoolean().optional({nullable: true})
  ]
};

export default validations