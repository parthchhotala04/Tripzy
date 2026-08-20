import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

import { busAPI, bookingAPI } from "@/services/api";

export default function SeatSelection() {

  const navigate = useNavigate();
  const { busId } = useParams();

  // Bus Details
  const [bus, setBus] = useState<any>(null);

  // Booked Seats
  const [bookedSeats, setBookedSeats] = useState<number[]>([]);

  // Selected Seats
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  // Loading
  const [loading, setLoading] = useState(true);

  // Booking Loading
  const [bookingLoading, setBookingLoading] = useState(false);

  // Passenger Form
  const [passenger, setPassenger] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Seat Layout (40 Seats)
  const seatRows = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
    [17, 18, 19, 20],
    [21, 22, 23, 24],
    [25, 26, 27, 28],
    [29, 30, 31, 32],
    [33, 34, 35, 36],
    [37, 38, 39, 40],
  ];

  useEffect(() => {
    if (busId) {
      loadBus();
    }
  }, [busId]);

  const loadBus = async () => {

    try {

      setLoading(true);

      // Get Bus Details
      const busRes = await busAPI.getBusById(busId!);

      setBus(busRes.bus);

      // Get Booked Seats
      const seatRes = await busAPI.getAvailableSeats(busId!);

      setBookedSeats(seatRes.bookedSeats || []);

    } catch (error) {

      console.error(error);

      toast.error("Unable to load bus details.");

    } finally {

      setLoading(false);

    }

  };

  // Select / Unselect Seat
  const handleSeatClick = (seat: number) => {

    if (bookedSeats.includes(seat)) return;

    if (selectedSeats.includes(seat)) {

      setSelectedSeats(
        selectedSeats.filter((s) => s !== seat)
      );

    } else {

      setSelectedSeats([...selectedSeats, seat]);

    }

  };

  // Passenger Form
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setPassenger({
      ...passenger,
      [e.target.name]: e.target.value,
    });

  };
    // Total Price
  const totalPrice =
    selectedSeats.length * (bus?.fare || 0);

  // Loading Screen
  if (loading) {
    return (
      <>
        <Navbar />

        <div className="container mx-auto py-10 text-center">
          <h2 className="text-2xl font-semibold">
            Loading Bus...
          </h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container mx-auto py-8">

        <h2 className="text-3xl font-bold mb-2">
          Select Your Seats
        </h2>

        <p className="text-gray-500 mb-6">
          {bus?.fromCity} → {bus?.toCity}
        </p>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Seat Layout */}
          <div className="lg:col-span-2">

            <Card className="p-6">

              <h3 className="text-xl font-semibold mb-6">
                🚌 Driver
              </h3>

              <div className="space-y-3">

                {seatRows.map((row, index) => (

                  <div
                    key={index}
                    className="flex gap-3 justify-center"
                  >

                    {row.map((seat) => {

                      const booked =
                        bookedSeats.includes(seat);

                      const selected =
                        selectedSeats.includes(seat);

                      return (

                        <button
                          key={seat}
                          disabled={booked}
                          onClick={() =>
                            handleSeatClick(seat)
                          }
                          className={`w-14 h-14 rounded-lg font-semibold border transition

                          ${
                            booked
                              ? "bg-red-500 text-white cursor-not-allowed"
                              : selected
                              ? "bg-blue-600 text-white"
                              : "bg-green-100 hover:bg-green-300"
                          }
                          `}
                        >
                          {seat}
                        </button>

                      );

                    })}

                  </div>

                ))}

              </div>

              <div className="flex gap-6 mt-8 text-sm">

                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-green-100 border"></div>
                  Available
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-blue-600"></div>
                  Selected
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-red-500"></div>
                  Booked
                </div>

              </div>

            </Card>

          </div>

          {/* Booking Summary */}
          <div>

            <Card className="p-6">

              <h3 className="text-xl font-semibold mb-5">
                Booking Summary
              </h3>

              <p className="mb-2">
                <strong>Bus:</strong> {bus?.busName}
              </p>

              <p className="mb-2">
                <strong>Operator:</strong> {bus?.operator}
              </p>

              <p className="mb-2">
                <strong>Fare:</strong> ₹{bus?.fare}
              </p>

              <p className="mb-2">
                <strong>Seats:</strong>{" "}
                {selectedSeats.length
                  ? selectedSeats.join(", ")
                  : "None"}
              </p>

              <h3 className="text-2xl font-bold mt-4 mb-6">
                Total ₹{totalPrice}
              </h3>

              <div className="space-y-4">

                <Input
                  placeholder="Passenger Name"
                  name="name"
                  value={passenger.name}
                  onChange={handleChange}
                />

                <Input
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={passenger.email}
                  onChange={handleChange}
                />

                <Input
                  placeholder="Phone"
                  name="phone"
                  value={passenger.phone}
                  onChange={handleChange}
                />
                                <Button
                  className="w-full"
                  disabled={bookingLoading}
                  onClick={async () => {

                    if (selectedSeats.length === 0) {
                      toast.error("Please select at least one seat.");
                      return;
                    }

                    if (
                      !passenger.name ||
                      !passenger.email ||
                      !passenger.phone
                    ) {
                      toast.error("Please fill all passenger details.");
                      return;
                    }

                    try {

                      setBookingLoading(true);

                      const response =
                        await bookingAPI.createBooking({
                          busId: busId!,
                          seatNumbers: selectedSeats,
                          passengerDetails: passenger,
                        });

                      toast.success("Booking Successful!");

                      navigate("/booking-confirmation", {
                        state: {
                          booking: response.booking,
                        },
                      });

                    } catch (error: any) {

                      toast.error(
                        error.response?.data?.message ||
                        "Booking Failed"
                      );

                    } finally {

                      setBookingLoading(false);

                    }

                  }}
                >
                  {bookingLoading
                    ? "Booking..."
                    : "Book Now"}
                </Button>

              </div>

            </Card>

          </div>

        </div>

      </div>

    </>
  );

}