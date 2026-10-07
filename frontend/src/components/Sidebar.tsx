import {
  LayoutGrid,
  Package,
  Tags,
  ArrowLeftRight,
  Menu,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const navItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutGrid,
  },
  {
    name: "Products",
    path: "/products",
    icon: Package,
  },
  {
    name: "Categories",
    path: "/categories",
    icon: Tags,
  },
  {
    name: "Transactions",
    path: "/transactions",
    icon: ArrowLeftRight,
  },
];

function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="flex items-center justify-between border-b bg-white px-4 py-4 md:hidden">
        <h1 className="text-xl font-bold text-gray-900">
          Inventory
        </h1>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 hover:bg-gray-100"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r bg-white px-4 py-6 md:block">
        <h1 className="mb-8 px-3 text-xl font-bold text-gray-900">
          Inventory
        </h1>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 ${
                    isActive
                      ? "bg-gray-100 font-medium text-gray-900"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }
              >
                <Icon size={20} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Navigation */}
      {open && (
        <div className="border-b bg-white px-4 py-3 md:hidden">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2.5 ${
                      isActive
                        ? "bg-gray-100 font-medium text-gray-900"
                        : "text-gray-600 hover:bg-gray-100"
                    }`
                  }
                >
                  <Icon size={20} />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}

export default Sidebar;