import { Request, Response, NextFunction } from 'express';

function addResponseBody(_req: Request, res: Response, next: NextFunction) {
  const json = res.json;
  res.json = function (this: any, body?: any): Response {
    res.body = body;
    return json.call(this, body);
  };

  next();
}

export { addResponseBody };
