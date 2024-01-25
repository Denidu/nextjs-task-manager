
import connectDb from '../../../utils/db';
import Task from '../../../models/Task';

connectDb();

export default async function handler(req, res) {
  if (req.method === 'GET') {

    try {
      const tasks = await Task.find();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching tasks' });
    }
  } else if (req.method === 'POST') {
 
    const { title, description } = req.body;

    try {
      const newTask = new Task({ title, description });
      const savedTask = await newTask.save();
      res.status(201).json(savedTask);
    } catch (error) {
      res.status(500).json({ error: 'Error creating task' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

