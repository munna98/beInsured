import { intermediaryData } from "data/intermediaries";

export default function handler(req,res){
    if(req.method ==='GET'){
        res.status(200).json(intermediaryData)
    }else if(req.method ==='POST'){
        const {name} =req.body.values
        const newValues={
            id: Date.now(),
            name: name
        }
        intermediaryData.push(newValues)
        res.status(201).json(newValues)
    }
}