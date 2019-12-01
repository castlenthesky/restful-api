import { request } from "http";

export default function adaptRequest (req:any = {}) {
  return Object.freeze({
    path: req.path,
    method: req.method,
    pathParams: req.params,
    queryParams: req.query,
    body: req.body
  })
}
