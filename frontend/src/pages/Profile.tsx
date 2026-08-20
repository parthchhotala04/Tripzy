import { useEffect, useState } from "react";
import { authAPI } from "@/services/api";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, Shield } from "lucide-react";

export default function Profile() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const data = await authAPI.profile();
      setUser(data.user);
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-[70vh]">
          <p className="text-lg font-medium">Loading Profile...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-muted/30 py-10">
        <div className="container mx-auto px-4 max-w-4xl">

          <Card className="shadow-xl border-0 overflow-hidden">

            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 h-40 flex items-center justify-center">
              <Avatar className="h-28 w-28 border-4 border-white shadow-lg">
                <AvatarFallback className="text-4xl font-bold bg-white text-blue-600">
                  {user.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>

            <CardContent className="p-8">

              <div className="text-center">
                <h2 className="text-3xl font-bold">{user.name}</h2>

                <Badge className="mt-3">
                  <Shield className="w-3 h-3 mr-1" />
                  Verified User
                </Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-10">

                <div className="border rounded-xl p-5">
                  <div className="flex items-center gap-3">
                    <User className="text-blue-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Full Name
                      </p>
                      <p className="font-semibold text-lg">
                        {user.name}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-xl p-5">
                  <div className="flex items-center gap-3">
                    <Mail className="text-blue-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Email Address
                      </p>
                      <p className="font-semibold text-lg">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-xl p-5">
                  <div className="flex items-center gap-3">
                    <Phone className="text-blue-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Mobile Number
                      </p>
                      <p className="font-semibold text-lg">
                        {user.mobile}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-xl p-5">
                  <div className="flex items-center gap-3">
                    <Shield className="text-blue-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Account Status
                      </p>
                      <p className="font-semibold text-green-600">
                        Active
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              <div className="mt-10 flex justify-center gap-4">

                <Button disabled>
                  Edit Profile
                </Button>

                <Button variant="outline" disabled>
                  Change Password
                </Button>

              </div>

            </CardContent>

          </Card>

        </div>
      </div>
    </>
  );
}