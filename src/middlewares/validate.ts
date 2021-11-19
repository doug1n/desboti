import express from "express";
import yup from "yup";

const validate =
  (schema: yup.BaseSchema) =>
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      await schema.validate(req.body);

      return next();
    } catch (err: any) {
      return res.status(422).json({ message: err.message });
    }
  };

export default validate;
