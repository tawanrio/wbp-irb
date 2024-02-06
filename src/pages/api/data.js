import {  clientInfo,
    template,
    base,
    _home,
    _about,
    _factory,
    _distributors,
    _autoparts,
    _contact,
    _autocenters,
    _partners,
    _products, } from "@/controller/data";
export default function handler(req, res) {
  res.status(200).json({
    clientInfo,
    template,
    base,
    _home,
    _about,
    _factory,
    _distributors,
    _autoparts,
    _contact,
    _autocenters,
    _partners,
    _products,
  });
}
