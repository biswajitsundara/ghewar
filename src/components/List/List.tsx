import { ReactNode } from "react";
import "./List.css";

interface Item {
  id: string;
  content: ReactNode;
}
interface ListProps {
  items: Item[];
  emptyMessage?: string;
  styledList?: boolean;
}

const List = ({ items, emptyMessage, styledList }: ListProps) => {
  if (!items || items.length === 0) {
    return (
      <p className="empty-list">{emptyMessage || "No items to display"}</p>
    );
  }

  const listclass = styledList ? "styled" : "none";

  return (
    <ul className={`ulstyle ${listclass}ul`}>
      {items.map((item) => (
        <li key={item.id} className={`listyle ${listclass}li`}>
          {item.content}
        </li>
      ))}
    </ul>
  );
};

export default List;
