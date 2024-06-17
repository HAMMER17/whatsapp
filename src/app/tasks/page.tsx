"use client";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";



export default function TasksPage() {
  const tasks = useQuery(api.tasks.getTask);
  const deleteTask = useMutation(api.tasks.deleteTask)
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {tasks?.map((task) => <div key={task._id}>{task.text}
        <button className=" m-4 bg-red-600 p-2 rounded-md" onClick={async () => {
          await deleteTask({ id: task._id })
        }}>delete</button>
      </div>)
      }
    </main >
  );
}

