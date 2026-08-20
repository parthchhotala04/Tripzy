import { NavLink, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Bus,
    ClipboardList,
    LogOut,
    Ticket
} from "lucide-react";

const menuItems = [
    {
        name: "Dashboard",
        icon: LayoutDashboard,
        path: "/admin/dashboard",
    },
    {
        name: "Add Bus",
        icon: Bus,
        path: "/admin/add-bus",
    },
    {
        name: "Manage Buses",
        icon: ClipboardList,
        path: "/admin/manage-buses",
    },
    {
        name: "Manage Bookings",
        path: "/admin/manage-bookings",
        icon: Ticket,
    }
];

const Sidebar = () => {
    const navigate = useNavigate();
    const logout=()=>{

localStorage.removeItem("token");
localStorage.removeItem("user");
navigate("/");

}
    return (
        <aside className="w-64 bg-slate-900 text-white min-h-screen">
            <div className="text-3xl font-bold text-center py-6 border-b border-slate-700">
                Tripzy
            </div>

            <nav className="mt-5 flex flex-col gap-2 px-3">
                {menuItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-lg px-4 py-3 transition ${isActive
                                    ? "bg-blue-600"
                                    : "hover:bg-slate-800"
                                }`
                            }
                        >
                            <Icon size={20} />
                            <span>{item.name}</span>
                        </NavLink>
                    );
                })}

                <button onClick={logout} className="mt-8 flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-red-600 transition">
                    <LogOut size={20} />
                    Logout
                </button>
            </nav>
        </aside>
    );
};

export default Sidebar;