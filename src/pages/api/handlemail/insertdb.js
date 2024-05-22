import { connectMongoDB, disconnectMongoDB } from '@/service/db';
import mongoose, { Schema } from 'mongoose'; // Importar Schema de mongoose
import { getCurrentDateFormatted } from '@/utils/functions'
import { Collection } from '@/service/model/schemas/collectionsSchema';
import { partnerCollection } from './partnersCollection';

import { UsersModel } from '@/service/model/schemas/userSchema';

export default async function insertDb(req, res) {
    if (req.method === "GET") {
        res.status(200).json({ message: "Ok" });
    } else if (req.method === "POST") {
        const {
          formData
        } = req.body;

        

        try {
        //   const data = {
        //     partnerType,
        //     info: partnerData.info,
        //     address: partnerData.address,
        //     uniqueId
        // }
        // partnerData.requirements ? data.requirements = partnerData.requirements : null;

        // console.log(data);
            await insertDataIntoDB(formData);
         

            res.status(200).json({ message: "Dados salvos com sucesso", formData });
        } catch (error) {
            console.error("Erro ao salvar dados:", error);
            res.status(500).json({ message: "Erro ao salvar dados" });
        }
    }
}

// function getCurrentDateFormatted() {
//   const currentDate = new Date();
  
//   // Extract year, month, day, hour, and minutes from the current date
//   const year = currentDate.getFullYear();
//   const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Add leading zero if necessary
//   const day = String(currentDate.getDate()).padStart(2, '0'); // Add leading zero if necessary
//   const hour = String(currentDate.getHours()).padStart(2, '0'); // Add leading zero if necessary
//   const minutes = String(currentDate.getMinutes()).padStart(2, '0'); // Add leading zero if necessary
  
//   // Format the date in 'yyyy/mm/dd-hh-mm' format
//   const formattedDate = `${year}/${month}/${day}-${hour}:${minutes}`;
  
//   return formattedDate;
// }

const insertDataIntoDB = async (data) => {
  const { inputs, uniqueId } = data

    try {
        // Conectar-se ao banco de dados
        await connectMongoDB();
        console.log(data);
      
        // Inserir os dados na coleção
        
        const currentDateFormatted = getCurrentDateFormatted();
        const novoItem = new Collection(partnerCollection({uniqueId, inputs, currentDateFormatted}));

        // Salvar o novo item no banco de dados
        await novoItem.save();
      
        console.log("Dados inseridos na coleção com sucesso!");

        // Desconectar-se do banco de dados
        await disconnectMongoDB();

    } catch (error) {
        console.error("Erro ao inserir dados na coleção:", error);
        throw error; // Rejeitar o erro para que possa ser capturado pelo código chamador
    }
}

