import "./ListItem.css";

interface ListItemProps {
  thumbnailColumn?: React.ReactNode;
  contentColumn: React.ReactNode;
  actionsColumn?: React.ReactNode;
  onClick?: () => void;
  grouped: boolean;
}

const ListItem = ({
  thumbnailColumn,
  contentColumn,
  actionsColumn,
  onClick,
  grouped,
}: ListItemProps) => {

  const liststyle = grouped ? "list-item list-grouped" : "list-item";
  const cursorstyle = onClick ? { cursor: "pointer" } : { cursor: "auto" };

  return (
    <div
      className={liststyle}
      onClick={onClick ? onClick : undefined} style={cursorstyle}>
      <div className="list-item-column first-column">{thumbnailColumn}</div>

      <div className={`${"list-item-column middle-column"}`}>
        {contentColumn}
      </div>

      {actionsColumn && <div className="list-item-column last-column">
        {actionsColumn}
      </div> }
    </div>
  );
};

export default ListItem;
