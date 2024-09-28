import { APIError } from "errors/api.error";
import { NextFunction, Request, Response } from "express";
import Logging from "utils/logging.util";

export function errorHandler(err: APIError, req: Request, res: Response, next: NextFunction) {
    res.status(err.statusCode ?? 500).json({ success: false, message: err.message ?? "Internal error", data: null });
    Logging.error(err)
}