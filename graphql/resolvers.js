//how you are going to face the data




// const tasks = [
//   {
//     id: '1',
//     title: 'Create wireframes',
//     description: 'Design wireframes for the dashboard page',
//     status: 'Todo',
//     dueDate: '2025-06-12',
//   },
//   {
//     id: '2',
//     title: 'Set up GraphQL',
//     description: 'Initialize Apollo Server with schema and resolvers',
//     status: 'In Progress',
//     dueDate: '2025-06-11',
//   },
//   {
//     id: '3',
//     title: 'Style login page',
//     description: 'Use Tailwind CSS for responsiveness',
//     status: 'Done',
//     dueDate: '2025-06-10',
//   },
// ];

import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../lib/mongodb.js';

export const resolvers = {
  Query: {
    tasks: async () => {
      const db = await connectToDatabase();
      const tasks = await db.collection('tasks').find().toArray();
      return tasks.map(task => ({
        id: task._id.toString(),
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: task.dueDate,
      }));
    },
    task: async (_, { id }) => {
      const db = await connectToDatabase();
      const task = await db.collection('tasks').findOne({ _id: new ObjectId(id.toString()) });
      if (!task) return null;
      return {
        id: task._id.toString(),
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: task.dueDate,
      };
    },
    tasksByStatus: async (_, { status }) => {
      const db = await connectToDatabase();
      const tasks = await db.collection('tasks').find({ status }).toArray();
      return tasks.map(task => ({
        id: task._id.toString(),
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: task.dueDate,
      }));
    },
  },

  Mutation: {
    addTask: async (_, { title, description, status, dueDate }) => {
      const db = await connectToDatabase();
      const result = await db.collection('tasks').insertOne({
        title,
        description,
        status,
        dueDate,
      });

      return {
        id: result.insertedId.toString(),
        title,
        description,
        status,
        dueDate,
      };
    },

    updateTaskStatus: async (_, { id, status }) => {
      const db = await connectToDatabase();
      await db.collection('tasks').updateOne(
        { _id: new ObjectId(id.toString()) },
        { $set: { status } }
      );

      const updated = await db.collection('tasks').findOne({ _id: new ObjectId(id) });

      if (!updated) return null;

      return {
        id: updated._id.toString(),
        title: updated.title,
        description: updated.description,
        status: updated.status,
        dueDate: updated.dueDate,
      };
    },
  },
};


