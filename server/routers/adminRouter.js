import express from 'express';
import { getAdminStats } from '../controllers/admin.js';

export const adminRouter = express.Router();

adminRouter.route('/stats').get(getAdminStats);
