import Joi from 'joi';
import { HTTP_STATUS } from '../utils/httpStatus.js';

export default function validate(schema, options = {}) {
  const validateOptions = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
    ...options,
  };

  return (req, res, next) => {
    const data = {
      body: req.body,
      params: req.params,
      query: req.query,
    };

    const composed = Joi.object({
      body: Joi.object().default({}),
      params: Joi.object().default({}),
      query: Joi.object().default({}),
    }).concat(schema);

    const { error, value } = composed.validate(data, validateOptions);

    if (error) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Validation error',
        details: error.details.map((d) => ({
          message: d.message,
          path: d.path.join('.'),
          type: d.type,
        })),
      });
    }

    // Attach validated data to request
    req.validated = value;
    return next();
  };
}
