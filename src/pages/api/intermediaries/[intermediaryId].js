import { intermediaryData } from "data/intermediaries";

export default function handler(req, res) {
  const { intermediaryId } = req.query;

  if (req.method === 'GET') {
    // Handle GET request to retrieve an intermediary
    const intermediary = intermediaryData.find((intermediary) => intermediary.id === intermediaryId);
    if (intermediary) {
      res.status(200).json(intermediary);
    } else {
      res.status(404).json({ message: 'Intermediary not found' });
    }
  } else if (req.method === 'PUT') {
    // Handle PUT request to update an intermediary
    const updatedDataIndex = intermediaryData.findIndex((intermediary) => intermediary.id === intermediaryId);
    if (updatedDataIndex === -1) {
      res.status(404).json({ message: 'Intermediary not found' });
      return;
    }

    // Update the intermediary's data based on the request body
    try {
      const { id, name } = req.body.values;
      intermediaryData[updatedDataIndex].id = id;
      intermediaryData[updatedDataIndex].name = name;
      res.status(200).json(intermediaryData[updatedDataIndex]);
    } catch (error) {
      console.error('Error updating intermediary:', error);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
  } else if (req.method === 'DELETE') {
    // Handle DELETE request to delete an intermediary
    const deletedData = intermediaryData.find((intermediary) => intermediary.id === intermediaryId);
    if (!deletedData) {
      res.status(404).json({ message: 'Intermediary not found' });
      return;
    }

    const index = intermediaryData.findIndex((intermediary) => intermediary.id === intermediaryId);
    intermediaryData.splice(index, 1);

    res.status(204).end(); // Respond with a 204 status code (No Content) and no response body
  }
}
