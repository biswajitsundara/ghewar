import { useEffect, useRef, useState } from "react";
import "./ActionMenu.css";
import threedots from "./threedots.svg";

interface MenuItem {
  icon: any;
  label: string;
  onClick: () => void;
}

interface ActionMenuProps {
  menuItems: MenuItem[];
}

const ActionMenu = ({ menuItems }: ActionMenuProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const clickHandler = (item: MenuItem) => {
    setShowMenu(false);
    item.onClick();
  };

  const toggleActionsMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <img src={threedots} onClick={toggleActionsMenu} />
      {showMenu && (
        <div className="action-menu" ref={menuRef}>
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="action-menu-item"
              onClick={() => clickHandler(item)}
            >
              <div className="action-menu-text">
                {item.icon && (
                  <img src={item.icon} className="action-menu-icon" />
                )}
                <span>{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ActionMenu;
