import express from "express";
import jwt from "jsonwebtoken";

import { RequestWithUser } from "../interfaces/customExpress";

const verifyToken = (
  req: RequestWithUser,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).send("A token is required for authentication.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY ?? "");
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid token.");
  }

  return next();
};

export default verifyToken;
