import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Bus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { authAPI } from "@/services/api";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const { confirmPassword, ...userData } = formData;

      const response = await authAPI.register(userData);

      toast.success(response.message || "Registration Successful");

      navigate("/login");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
        "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center px-4">

      <Card className="w-full max-w-md shadow-xl">

        <CardContent className="p-8">

          <div className="text-center mb-8">

            <div className="bg-primary inline-flex p-3 rounded-full mb-4">
              <Bus className="text-white h-8 w-8" />
            </div>

            <h1 className="text-3xl font-bold">Tripzy</h1>

            <p className="text-muted-foreground">
              Create your account
            </p>

          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <Label>Full Name</Label>
              <Input
                name="name"
                placeholder="Enter Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Mobile Number</Label>
              <Input
                type="tel"
                name="mobile"
                placeholder="Enter Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                pattern="[0-9]{10}"
                maxLength={10}
                required
              />
            </div>

            <div>
              <Label>Password</Label>

              <div className="relative">

                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="absolute right-3 top-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>

              </div>
            </div>

            <div>
              <Label>Confirm Password</Label>

              <div className="relative">

                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="absolute right-3 top-3"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>
            </div>

            <Button
              className="w-full"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Register"}
            </Button>

          </form>

          <p className="text-center mt-6">

            Already have an account?

            <Link
              to="/login"
              className="text-primary ml-2 font-semibold"
            >
              Login
            </Link>

          </p>

        </CardContent>

      </Card>

    </div>
  );
};

export default Register;