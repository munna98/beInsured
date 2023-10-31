import { intermediaryData } from "data/intermediaries";

export default function handler(req,res){
    res.status(200).json(intermediaryData)
}