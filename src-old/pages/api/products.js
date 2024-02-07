import { products } from "@/controller/data";
export default function handler(req, res) {
  res.status(200).json({
   products
  });
}
