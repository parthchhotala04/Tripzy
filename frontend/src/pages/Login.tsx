import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Bus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { authAPI } from "@/services/api";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await authAPI.login(formData);

      console.log("Login Response:", response);
      //console.log("Token:", response.token);
      //console.log("User:", response.user);
      localStorage.setItem("token", response.token);
      localStorage.setItem(
        "user",
        JSON.stringify(response.user)
      );
      //console.log("Saved Token:", localStorage.getItem("token"));

      toast.success("Login Successful");

      if (response.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
      console.log(response);

    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
        "Invalid Email or Password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">

      <Card className="w-full max-w-md shadow-xl">

        <CardContent className="p-8">

          <div className="flex flex-col items-center mb-8">

            <div className="bg-primary p-3 rounded-full mb-4">

              <Bus className="text-white h-8 w-8" />

            </div>

            <h1 className="text-3xl font-bold">
              Tripzy
            </h1>

            <p className="text-muted-foreground">
              Welcome Back
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>

              <Label>Email</Label>

              <Input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>

            <div>

              <Label>Password</Label>

              <div className="relative">

                <Input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="absolute right-3 top-3"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>

            <div className="flex justify-end">

              <Link
                to="/forgot-password"
                className="text-primary text-sm"
              >
                Forgot Password?
              </Link>

            </div>

            <Button
              className="w-full"
              disabled={loading}
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </Button>

          </form>

          <p className="text-center mt-6">

            Don't have an account?

            <Link
              to="/register"
              className="text-primary ml-2 font-medium"
            >
              Register
            </Link>

          </p>

        </CardContent>

      </Card>

    </div>
  );
};

export default Login;