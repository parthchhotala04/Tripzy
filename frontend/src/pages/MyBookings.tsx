import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Ticket, Loader } from "lucide-react";
import { bookingAPI } from "@/services/api";
import { toast } from "sonner";

const MyBookings = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getBookings = async () => {
    try {
      setLoading(true);

      const response = await bookingAPI.getMyBookings();

      setBookings(response.bookings || []);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to fetch bookings"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  const handleCancel = async (bookingId: string) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    try {
      await bookingAPI.cancelBooking(bookingId);

      toast.success("Booking cancelled successfully");

      await getBookings();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Unable to cancel booking"
      );
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            My Bookings
          </h1>

          <p className="text-muted-foreground">
            View and manage your bus bookings
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-16">
            <div className="text-center">
              <Loader className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">
                Loading your bookings...
              </p>
            </div>
          </div>
        )}

        {/* No Bookings */}
        {!loading && bookings.length === 0 && (
          <Card className="border-dashed">
            <CardContent className="p-12 text-center">
              <Ticket className="mx-auto h-12 w-12 text-muted-foreground mb-4" />

              <h3 className="text-xl font-semibold mb-2">
                No Bookings Yet
              </h3>

              <p className="text-muted-foreground mb-6">
                Start by searching and booking your first bus.
              </p>

              <Button onClick={() => navigate("/")}>
                Search Buses
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Booking List */}
        {!loading && bookings.length > 0 && (
          <div className="space-y-5">
            {bookings.map((booking: any, index: number) => {
              const bookingDate = booking.bus?.journeyDate
                ? new Date(
                    booking.bus.journeyDate
                  ).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "N/A";

              return (
                <Card
                  key={booking._id}
                  className={`transition-all hover:shadow-lg ${
                    booking.status === "Cancelled"
                      ? "opacity-60"
                      : ""
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-6">

                      {/* Left */}
                      <div className="flex-1 space-y-3">

                        <div className="flex items-center gap-3">
                          <h2 className="text-xl font-semibold">
                            {booking.bus?.busName}
                          </h2>

                          <Badge
                            variant={
                              booking.status === "Confirmed"
                                ? "default"
                                : "destructive"
                            }
                          >
                            {booking.status}
                          </Badge>
                        </div>

                        <div className="flex flex-wrap gap-5 text-muted-foreground">

                          <div className="flex items-center gap-2">
                            <MapPin size={18} />

                            <span>
                              {booking.bus?.fromCity} →{" "}
                              {booking.bus?.toCity}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Calendar size={18} />

                            <span>{bookingDate}</span>
                          </div>

                        </div>

                        <div className="flex items-center gap-2">
                          <Ticket size={18} />

                          <span>
                            Seats :{" "}
                            {booking.seatNumbers?.join(", ")}
                          </span>
                        </div>

                        <div className="text-sm text-muted-foreground">
                          Booking ID :{" "}
                          {booking._id
                            ?.slice(-8)
                            .toUpperCase()}
                        </div>

                      </div>

                      {/* Right */}
                      <div className="flex flex-col justify-between items-end">

                        <div className="text-right">
                          <p className="text-muted-foreground text-sm">
                            Total Paid
                          </p>

                          <h2 className="text-3xl font-bold text-primary">
                            ₹{booking.totalPrice}
                          </h2>
                        </div>

                        {booking.status === "Cancelled" ? (
                          <Badge variant="destructive">
                            Cancelled
                          </Badge>
                        ) : (
                          <Button
                            variant="destructive"
                            onClick={() =>
                              handleCancel(booking._id)
                            }
                          >
                            Cancel Booking
                          </Button>
                        )}

                      </div>

                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;