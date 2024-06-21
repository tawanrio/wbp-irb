import multer from "multer";
export default function handleUpload(req, res) {
    if (req.method === "GET") {

        const upload = multer({dest:'/uploads'}).single("avatar");



        res.status(200).json({ message: "Ok" });

    }
}

export const config = {
    api: {
      bodyParser: false, // Desativar o bodyParser padrão do Next.js
    },
  };
  