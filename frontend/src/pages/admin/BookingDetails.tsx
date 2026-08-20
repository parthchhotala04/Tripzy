import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Loader2,
  ArrowLeft,
  User,
  Bus,
  Calendar,
  CreditCard,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { adminBookingAPI } from "@/services/api";

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchBooking = async () => {
    try {
      const response = await adminBookingAPI.getBooking(id!);
      setBooking(response.booking);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBooking();
    }
  }, [id]);

  const getStatusVariant = (
    status: string
  ): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "confirmed":
        return "default";

      case "cancelled":
        return "destructive";

      case "completed":
        return "secondary";

      default:
        return "outline";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold">
          Booking not found
        </h2>

        <Button
          className="mt-6"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-6xl mx-auto">

        <Button
          variant="outline"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <Card className="shadow-lg">

          <CardHeader>

            <CardTitle className="text-3xl">
              Booking Details
            </CardTitle>

          </CardHeader>

          <CardContent>

            <div className="grid md:grid-cols-2 gap-6">

              {/* Booking Information */}

              <Card>

                <CardHeader>

                  <CardTitle className="flex items-center gap-2">

                    <CreditCard className="h-5 w-5" />

                    Booking Information

                  </CardTitle>

                </CardHeader>

                <CardContent className="space-y-3">

                  <p>
                    <strong>Booking ID :</strong>{" "}
                    {booking._id}
                  </p>

                  <p>
                    <strong>Status :</strong>

                    <Badge
                      className="ml-2"
                      variant={getStatusVariant(
                        booking.status
                      )}
                    >
                      {booking.status}
                    </Badge>
                  </p>

                  <p>
                    <strong>Payment :</strong> Paid
                    {booking.totalPrice}
                  </p>

                  <p>
                    <strong>Total Price :</strong> ₹
                    {booking.totalPrice}
                  </p>

                </CardContent>

              </Card>

              {/* Passenger */}

              <Card>

                <CardHeader>

                  <CardTitle className="flex items-center gap-2">

                    <User className="h-5 w-5" />

                    Passenger

                  </CardTitle>

                </CardHeader>

                <CardContent className="space-y-3">

                  <p>
                    <strong>Name :</strong>{" "}
                    {booking.user?.name}
                  </p>

                  <p>
                    <strong>Email :</strong>{" "}
                    {booking.user?.email}
                  </p>

                  <p>
                    <strong>Mobile :</strong>{" "}
                    {booking.user?.mobile}
                  </p>

                </CardContent>

              </Card>

              {/* Bus Details */}

              <Card>

                <CardHeader>

                  <CardTitle className="flex items-center gap-2">

                    <Bus className="h-5 w-5" />

                    Bus Details

                  </CardTitle>

                </CardHeader>

                <CardContent className="space-y-3">

                  <p>
                    <strong>Bus :</strong>{" "}
                    {booking.bus?.busName}
                  </p>

                  <p>
                    <strong>Bus Number :</strong>{" "}
                    {booking.bus?.busNumber}
                  </p>

                  <p>
                    <strong>Operator :</strong>{" "}
                    {booking.bus?.operator}
                  </p>

                  <p>
                    <strong>Bus Type :</strong>{" "}
                    {booking.bus?.busType}
                  </p>

                </CardContent>

              </Card>

              {/* Journey */}

              <Card>

                <CardHeader>

                  <CardTitle className="flex items-center gap-2">

                    <Calendar className="h-5 w-5" />

                    Journey Details

                  </CardTitle>

                </CardHeader>

                <CardContent className="space-y-3">

                  <p>
                    <strong>Route :</strong>{" "}
                    {booking.bus?.fromCity} →
                    {booking.bus?.toCity}
                  </p>

                  <p>
                    <strong>Date :</strong>{" "}
                    {booking.bus?.journeyDate
                      ? new Date(
                          booking.bus.journeyDate
                        ).toLocaleDateString()
                      : "-"}
                  </p>

                  <p>
                    <strong>Departure :</strong>{" "}
                    {booking.bus?.departureTime}
                  </p>

                  <p>
                    <strong>Arrival :</strong>{" "}
                    {booking.bus?.arrivalTime}
                  </p>

                  <p>
                    <strong>Seats :</strong>{" "}
                    {booking.seatNumbers?.join(", ")}
                  </p>

                </CardContent>

              </Card>

            </div>

          </CardContent>

        </Card>

      </div>

    </div>
  );
};

export default BookingDetails;