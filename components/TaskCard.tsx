type Item = {
  name: string;
  done: boolean;
};

type Props = {
  task: Item;
};

export default function TaskCard({ task }: Props) {
  return (
    <div className="w-full border flex justify-between border-gray-800 my-6 p-3">
      <h3 className="border border-red-500">{task.name}</h3>
      <div>
        <input type="checkbox" checked={task.done} />
      </div>
    </div>
  );
}
