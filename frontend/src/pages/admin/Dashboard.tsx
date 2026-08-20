import { useEffect, useState } from "react";
import { Users, Bus, Ticket, IndianRupee } from "lucide-react";

import { adminAPI } from "@/services/api";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBuses: 0,
    totalBookings: 0,
    totalRevenue: 0,
  });

  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [recentBuses, setRecentBuses] = useState<any[]>([]);

  const fetchDashboard = async () => {
    try {
      const response = await adminAPI.getDashboard();

      //console.log(response);

      setStats(response.stats);

      setRecentBookings(response.recentBookings || []);

      setRecentBuses(response.recentBuses || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h2 className="text-xl font-semibold">
          Loading Dashboard...
        </h2>
      </div>
    );
  }

  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
    },
    {
      title: "Total Buses",
      value: stats.totalBuses,
      icon: Bus,
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: Ticket,
    },
    {
      title: "Total Revenue",
      value: `₹${stats.totalRevenue}`,
      icon: IndianRupee,
    },
  ];

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Welcome Admin 👋
        </h1>

        <p className="text-muted-foreground mt-1">
          Dashboard Overview
        </p>
      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Card key={card.title}>

              <CardContent className="p-6 flex justify-between items-center">

                <div>

                  <p className="text-sm text-muted-foreground">
                    {card.title}
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {card.value}
                  </h2>

                </div>

                <Icon className="h-10 w-10 text-primary" />

              </CardContent>

            </Card>
          );
        })}

      </div>

      {/* Recent Bookings */}

      <Card>

        <CardHeader>

          <CardTitle>
            Recent Bookings
          </CardTitle>

        </CardHeader>

        <CardContent>

          <Table>

            <TableHeader>

              <TableRow>

                <TableHead>Passenger</TableHead>

                <TableHead>Bus</TableHead>

                <TableHead>Route</TableHead>

                <TableHead>Amount</TableHead>

              </TableRow>

            </TableHeader>

            <TableBody>

              {recentBookings.map((booking) => (

                <TableRow key={booking._id}>

                  <TableCell>
                    {booking.user?.name}
                  </TableCell>

                  <TableCell>
                    {booking.bus?.busName}
                  </TableCell>

                  <TableCell>
                    {booking.bus?.fromCity} → {booking.bus?.toCity}
                  </TableCell>

                  <TableCell>
                    ₹{booking.totalPrice}
                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </CardContent>

      </Card>

      {/* Recent Buses */}

      <Card>

        <CardHeader>

          <CardTitle>
            Recently Added Buses
          </CardTitle>

        </CardHeader>

        <CardContent>

          <Table>

            <TableHeader>

              <TableRow>

                <TableHead>Bus</TableHead>

                <TableHead>Number</TableHead>

                <TableHead>Operator</TableHead>

                <TableHead>Route</TableHead>

              </TableRow>

            </TableHeader>

            <TableBody>

              {recentBuses.map((bus) => (

                <TableRow key={bus._id}>

                  <TableCell>
                    {bus.busName}
                  </TableCell>

                  <TableCell>
                    {bus.busNumber}
                  </TableCell>

                  <TableCell>
                    {bus.operator}
                  </TableCell>

                  <TableCell>
                    {bus.fromCity} → {bus.toCity}
                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </CardContent>

      </Card>

    </div>
  );
};

export default Dashboard;