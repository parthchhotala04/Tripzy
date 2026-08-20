import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function BookingConfirmation() {

  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state?.booking;

  if (!booking) {
    navigate("/");
    return null;
  }

  return (
    <>
      <Navbar />

      <div className="container mx-auto py-10">

        <Card className="max-w-2xl mx-auto shadow-lg">

          <CardContent className="p-8">

            <div className="text-center">

              <CheckCircle
                className="mx-auto text-green-600 mb-4"
                size={70}
              />

              <h1 className="text-3xl font-bold">
                Booking Successful 🎉
              </h1>

              <p className="text-gray-500 mt-2">
                Your bus ticket has been booked successfully.
              </p>

            </div>

            <div className="mt-8 space-y-4">

              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">
                  Booking ID
                </span>

                <span>
                  {booking._id}
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">
                  Passenger
                </span>

                <span>
                  {booking.passengerDetails.name}
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">
                  Email
                </span>

                <span>
                  {booking.passengerDetails.email}
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">
                  Phone
                </span>

                <span>
                  {booking.passengerDetails.phone}
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">
                  Seats
                </span>

                <span>
                  {booking.seatNumbers.join(", ")}
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">
                  Total Amount
                </span>

                <span className="font-bold text-green-600">
                  ₹{booking.totalPrice}
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">
                  Status
                </span>

                <span className="text-green-600 font-semibold">
                  {booking.status}
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">
                  Booking Date
                </span>

                <span>
                  {new Date(
                    booking.createdAt
                  ).toLocaleString()}
                </span>
              </div>

            </div>

            <div className="mt-10 grid gap-4">

              <Button
                onClick={() =>
                  navigate("/my-bookings")
                }
              >
                View My Bookings
              </Button>

              <Button
                variant="outline"
                onClick={() =>
                  navigate("/")
                }
              >
                Back To Home
              </Button>

            </div>

          </CardContent>

        </Card>

      </div>

    </>
  );

}