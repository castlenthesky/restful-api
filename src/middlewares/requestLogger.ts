import { Request, Response, Next } from "express";

function requestLogger(req: Request, res: Response, next: Next) {
  // console.info(`${req.method} ${req.originalUrl}`);
  const start = new Date().getTime();
  res.on("finish", () => {
    const elapsed = new Date().getTime() - start;
    // @TODO: status code is being logged prior to being set and sent to client
    console.info(
      `${req.method} ${req.originalUrl} ${res.statusCode} ${elapsed}ms`
    );
  });
  next();
}

export { requestLogger };
