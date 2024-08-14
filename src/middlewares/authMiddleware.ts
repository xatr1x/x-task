import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const response = await axios.post(`${process.env.CORESERVICE_URL}/authorization/token/new-validation/`, { token });

    if (response.status === 201 && response.data?.isActive) {
      const decodedToken = jwt.decode(token, { complete: true });
      req.user = decodedToken?.payload;

      next();
    } else {
      return res.status(401).json({ message: 'Invalid token' });
    }
  } catch (error) {
    console.error('Error validating token:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
