import { HTTP_STATUS } from '../utils/httpStatus.js';

export default function notFound(req, res, next) {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    message: 'Not Found',
    path: req.path,
    method: req.method,
  });
}
