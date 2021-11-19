import express from "express";

export interface RequestWithUser extends express.Request {
  user?: any;
}
