import { useEffect, useState } from "react";
import { Loader2, Search, Ticket } from "lucide-react";

import { adminBookingAPI } from "@/services/api";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import BookingTable from "@/components/admin/BookingTable";

const ManageBookings = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchBookings = async () => {
    try {
      const response = await adminBookingAPI.getAllBookings();
      
      setBookings(response.bookings || []);
      setFilteredBookings(response.bookings || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    const value = search.toLowerCase();

    const filtered = bookings.filter((booking) => {
      return (
        booking._id.toLowerCase().includes(value) ||
        booking.user?.name?.toLowerCase().includes(value) ||
        booking.user?.email?.toLowerCase().includes(value)
      );
    });

    setFilteredBookings(filtered);
  }, [search, bookings]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">

      {/* Heading */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Manage Bookings
          </h1>

          <p className="text-muted-foreground mt-1">
            View and manage all customer bookings.
          </p>

        </div>

        <Card className="px-5 py-3 flex items-center gap-3">

          <Ticket className="text-primary h-6 w-6" />

          <div>

            <p className="text-sm text-muted-foreground">
              Total Bookings
            </p>

            <p className="text-2xl font-bold">
              {bookings.length}
            </p>

          </div>

        </Card>

      </div>

      {/* Search */}

      <Card>

        <CardContent className="p-4">

          <div className="relative">

            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

            <Input
              className="pl-10"
              placeholder="Search by Booking ID, Passenger Name or Email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

        </CardContent>

      </Card>

      {/* Booking Table */}

      <BookingTable bookings={filteredBookings} />

    </div>
  );
};

export default ManageBookings;