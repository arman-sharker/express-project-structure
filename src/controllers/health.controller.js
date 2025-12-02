import { HTTP_STATUS } from '../utils/httpStatus.js';

export const getHealth = (req, res) => {
  res.status(HTTP_STATUS.OK).json({
    status: 'ok',
    env: process.env.NODE_ENV || 'development',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
};
