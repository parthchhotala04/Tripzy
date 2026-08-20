import { User } from "lucide-react";

const Topbar = () => {
  return (
    <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <h2 className="text-2xl font-bold">
        Admin Dashboard
      </h2>

      <div className="flex items-center gap-2">
        <User />
        <span>Admin</span>
      </div>
    </header>
  );
};

export default Topbar;