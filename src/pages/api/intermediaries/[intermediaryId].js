import { intermediaryData } from "data/intermediaries";

export default function handler(req, res) {
    const { intermediaryId } = req.query;
    if (req.method === 'GET') {
        const intermediary = intermediaryData.find(intermediary => intermediary.id === intermediaryId);
        res.status(200).json(intermediary);
    } else if (req.method === 'DELETE') {
        const deletedData = intermediaryData.find(intermediary => intermediary.id === intermediaryId);
        const index = intermediaryData.findIndex(intermediary => intermediary.id === intermediaryId);
        intermediaryData.splice(index, 1);
        res.status(204).end(); // Respond with a 204 status code (No Content) and no response body
    }
}


