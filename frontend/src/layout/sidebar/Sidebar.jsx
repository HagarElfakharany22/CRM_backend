import { Link, NavLink } from "react-router-dom";
import styles from '../sidebar/side.module.css'

export default function Sidebar({ user, isOpen, toggleSidebar }) {
  const menuItems =
    user.role === "admin"
      ? [
          { name: "Dashboard", path: "/dashboard", end: true },
          { name: "Leads", path: "/leads" },
          { name: "Contacts", path: "/contacts" },
          { name: "Deals", path: "/deals" },
          { name: "Boards", path: "/boards" },
          { name: "Tasks", path: "/tasks" },
          { name: "Reports", path: "/reports" },
        ]
      : user.role === "employee"
      ? [
        { name: "Boards", path: "/boards", end: false },
          { name: "Tasks", path: "/tasks" },
          { name: "Leads", path: "/leads" },
        ]
      : [{ name: "Leads", path: "/leads" }];

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className={styles.overlay} onClick={toggleSidebar}></div>}

      <aside
        className={`bg-dark text-white ${styles.sidebar} ${
          isOpen ? styles.open : ""
        }`}
      >
        {/* Logo */}
        <Link
          to="/dashboard"
          className="p-3 fs-4 fw-bold text-primary text-decoration-none d-block"
        >
          CRM Pro
        </Link>

        {/* Menu */}
        <nav className="flex-grow-1 px-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.end}
              onClick={toggleSidebar} // يقفل بعد الضغط في الموبايل
              className={({ isActive }) =>
                `d-block px-3 py-2 mb-1 rounded text-decoration-none ${
                  isActive ? "bg-primary text-white" : "text-white"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
