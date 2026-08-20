import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bus, Menu, User, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const handleLogin = () => {
    setOpen(false);
    navigate("/login");
  };

  const handleRegister = () => {
    setOpen(false);
    navigate("/register");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // Remove if you don't store user data
    setOpen(false);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-background shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Bus className="h-6 w-6 text-primary-foreground" />
            </div>

            <span className="text-2xl font-bold text-primary">
              Tripzy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="hover:text-primary transition-colors"
            >
              Home
            </Link>

            <Link
              to="/search"
              className="hover:text-primary transition-colors"
            >
              Search Buses
            </Link>

            {token && (
              <Link
                to="/my-bookings"
                className="hover:text-primary transition-colors"
              >
                My Bookings
              </Link>
            )}
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-3">
            {token ? (
              <>
                <Link to="/profile">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>

                <Button
                  variant="destructive"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={handleLogin}
                >
                  Login
                </Button>

                <Button onClick={handleRegister}>
                  Register
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden border-t py-4 space-y-4">
            <Link
              to="/"
              className="block hover:text-primary"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>

            <Link
              to="/search"
              className="block hover:text-primary"
              onClick={() => setOpen(false)}
            >
              Search Buses
            </Link>

            {token && user.role === "user" && (
              <Link
                to="/my-bookings"
                className="block hover:text-primary"
                onClick={() => setOpen(false)}
              >
                My Bookings
              </Link>
            )}
            {token && user.role === "admin" && (
              <Link
                to="/admin/dashboard"
                className="block hover:text-primary"
                onClick={() => setOpen(false)}
              >
                Dashboard
              </Link>
            )}

            <div className="pt-4 border-t flex flex-col gap-2">
              {token ? (
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleLogin}
                  >
                    Login
                  </Button>

                  <Button
                    className="w-full"
                    onClick={handleRegister}
                  >
                    Register
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;