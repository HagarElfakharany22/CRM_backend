import { Link, NavLink } from "react-router-dom";

export default function Sidebar({ user }) {
const menuItems =
  user.role === "admin"
    ? [
        { name: "Dashboard", path: "/dashboard", end: true },
        { name: "Leads", path: "/leads", end: false },
        { name: "Contacts", path: "/contacts", end: false },
        { name: "Deals", path: "/deals", end: false },
        { name: "Tasks", path: "/tasks", end: false },
        { name: "Reports", path: "/reports", end: false },
      ]
    : user.role === "employee"
    ? [
        { name: "Tasks", path: "/tasks", end: false },
        { name: "Leads", path: "/leads", end: false },
      ]
    : [
        { name: "Leads", path: "/leads", end: false },
      ];

  return (
    <aside
      className="d-flex flex-column bg-dark text-white"
      style={{ width: "16rem", minHeight: "100vh" }}
    >
      {/* Logo */}
      <Link
  to="/dashboard"
  className="p-3 fs-4 fw-bold text-primary text-decoration-none"
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
  
  );
}
