"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useTask, TaskActions, NewTask } from "@/contexts/TasksProvider";

import { HiOutlineTrash } from "react-icons/hi";
import { MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

type Item = {
  id: number;
  name: string;
  done: boolean;
};

export default function Tasks() {
  const { state, dispatch } = useTask();
  const [newTask, setNewTask] = useState("");
  const [list, setList] = useState<Item[]>([]);
  const [editBar, setEditBar] = useState(false);
  const [updateName, setUpdateName] = useState("");
  const [selectedId, setSelectedId] = useState(0);

  // const handleAddTask = (taskName: string) => {
  //   const newList = [...list];
  //   newList.push({
  //     id: list.length + 1,
  //     name: taskName,
  //     done: false,
  //   });
  //   setList(newList);
  // };

  const handleAddTask = (taskName: string) => {
    dispatch({
      type: TaskActions.addNewTAsk,
      payload: taskName,
    });
  };

  // const handleTaskChange = (id: number, done: boolean) => {
  //   const newList = [...list];
  //   for (const i in newList) {
  //     if (newList[i].id === id) {
  //       newList[i].done = done;
  //     }
  //   }
  //   setList(newList);
  // };

  const handleTaskChange = (id: number, status: boolean) => {
    dispatch({
      type: TaskActions.updateTaskStatus,
      payload: { id, status },
    });
  };

  const handleTaskEdit = (id: number) => {
    const newList = [...list];
    for (const i in newList) {
      if (newList[i].id === id) {
        newList[i].name = updateName;
      }
    }
    setList(newList);
    setUpdateName("");
    setEditBar(false);
  };

  const handleUpdateTaskName = (id: number, newName: string) => {
    dispatch({
      type: TaskActions.updateTaskName,
      payload: { id, newName },
    });
    setUpdateName("");
    setEditBar(false);
  };

  const showEditMenu = () => {
    if (!editBar) {
      setEditBar(true);
    }
  };

  // const handleTaskDelete = (id: number) => {
  //   const newList = list.filter((task) => task.id !== id);
  //   setList(newList);
  // };

  const handleTaskDelete = (id: number) => {
    dispatch({
      type: TaskActions.removeTaskById,
      payload: id,
    });
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" && newTask.length !== 0) {
      handleAddTask(newTask);
      setNewTask("");
    }
  };
  return (
    <div className="flex flex-col border border-red-500">
      <div className="w-full  text-black flex items-center justify-center m-auto max-w-screen-xl border-2 border-violet-600 p-2 rounded-md">
        <div className="mr-2">➕</div>
        <input
          type="text"
          placeholder="Adicione uma tarefa"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyUp={handleKeyUp}
          className="w-full text-lg outline-0 border b rounded-lg text-black px-1
        "
        />
      </div>
      {editBar && (
        <div className="w-full mt-6 mx-auto p-2 max-w-screen-xl border-2 border-violet-600 flex justify-between rounded-md ">
          <input
            type="text"
            value={updateName}
            placeholder="Altere o nome da tarefa"
            onChange={(e) => setUpdateName(e.target.value)}
            className="border border-green-800 w-full px-1 "
          />
          <button
            onClick={() => handleUpdateTaskName(selectedId, updateName)}
            className="border border-red-700 px-2 py-1 text-violet-700 text-xl"
          >
            <FaPlus />
          </button>
        </div>
      )}

      <div className=" w-full mt-10 mx-auto max-w-screen-xl">
        {state.taskList.length > 0 &&
          state.taskList.map((tarefa) => (
            <div
              key={tarefa.id}
              className="w-full border-2 flex justify-between items-center  border-violet-600 my-6 p-3 rounded-md bg-white shadow-md "
            >
              <div className="flex gap-x-1 border border-blue-900 items-center">
                <div>
                  <input
                    type="checkbox"
                    checked={tarefa.status}
                    onChange={(e) => handleTaskChange(tarefa.id, tarefa.status)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="checkbox"
                    className={`${
                      tarefa.status ? "line-through" : "initial"
                    }  text-zinc-900 font-semibold`}
                  >
                    {tarefa.name}
                  </label>
                </div>
              </div>
              <div className="border border-red-900 flex text-violet-700 text-2xl gap-x-2 ">
                <button
                  onClick={() => {
                    showEditMenu(), setSelectedId(tarefa.id);
                  }}
                >
                  <MdEdit />
                </button>
                <button onClick={() => handleTaskDelete(tarefa.id)}>
                  <HiOutlineTrash className="cursor-pointer" />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
