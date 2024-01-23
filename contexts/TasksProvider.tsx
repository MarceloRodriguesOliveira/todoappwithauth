"use client";

import { createContext, ReactNode, useContext, useReducer } from "react";

export enum TaskActions {
  addNewTAsk,
  removeTaskById,
  updateTaskStatus,
  updateTaskName,
}

export interface Item {
  id: number;
  name: string;
  status: boolean;
}

export type NewTask = {
  name: string;
};

export type UpdateName = {
  id: number;
  newName: string;
};

type UpdateStatus = {
  id: number;
  status: boolean;
};

type RemoveTask = {
  id: number;
};

type State = {
  taskList: Item[];
};

type TaskProviderProps = {
  children: ReactNode;
};

// type Action =
//   | {
//       type: TaskActions.addNewTAsk
//       payload: Item | NewTask
//     }
//   | {
//       type: TaskActions.removeTaskById
//       payload: RemoveTask
//     }
//   | {
//       type: TaskActions.updateTaskName
//       payload: UpdateName
//     }
//     |{
//         type: TaskActions.updateTaskStatus
//         payload: UpdateStatus
//     }

type Action =
  | {
      type: TaskActions.addNewTAsk;
      payload: string;
    }
  | {
      type: TaskActions.removeTaskById;
      payload: number;
    }
  | {
      type: TaskActions.updateTaskName;
      payload: UpdateName;
    }
  | {
      type: TaskActions.updateTaskStatus;
      payload: UpdateStatus;
    };
//
type ContextType = {
  state: State;
  dispatch: (action: Action) => void;
};

const initialData: State = {
  taskList: [],
};

export const TaskContext = createContext<ContextType | undefined>(undefined);

const taskUpdates = (state: State, action: Action) => {
  switch (action.type) {
    case TaskActions.addNewTAsk: {
      const name = action.payload;
      console.log(name);

      return {
        ...state,
        taskList: [
          ...state.taskList,
          { id: state.taskList.length + 1, name, status: false },
        ],
      };
    }
    case TaskActions.removeTaskById: {
      const id = action.payload;

      const filteredList = state.taskList.filter((tarefa) => tarefa.id !== id);

      // state.taskList = [...filteredList]

      return { ...state, taskList: [...filteredList] };
    }
    case TaskActions.updateTaskName: {
      const { id, newName } = action.payload;

      const index = state.taskList.findIndex((task) => {
        return task.id === id;
      });

      state.taskList[index].name = newName;

      return { ...state, taskList: [...state.taskList] };
    }
    case TaskActions.updateTaskStatus: {
      const { id, status } = action.payload;
      console.log(id);
      console.log(status);

      const index = state.taskList.findIndex((task) => {
        return task.id === id;
      });

      if (status) {
        state.taskList[index].status = false;
        return { ...state, taskList: [...state.taskList] };
      }

      state.taskList[index].status = true;

      return { ...state, taskList: [...state.taskList] };
    }
  }
};

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [state, dispatch] = useReducer(taskUpdates, initialData);
  const value = { state, dispatch };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTask deve ser utilizado dentro do TaskProvider");
  }
  return context;
};
