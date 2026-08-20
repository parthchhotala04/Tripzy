import { Link } from "react-router-dom";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Eye } from "lucide-react";

interface BookingTableProps {
    bookings: any[];
}

const BookingTable = ({ bookings }: BookingTableProps) => {
    const getBadgeVariant = (status: string) => {
        switch (status) {
            case "confirmed":
                return "default";

            case "pending":
                return "secondary";

            case "cancelled":
                return "destructive";

            case "completed":
                return "outline";

            default:
                return "secondary";
        }
    };

    if (bookings.length === 0) {
        return (
            <div className="text-center py-10">
                <h2 className="text-lg font-semibold">
                    No Bookings Found
                </h2>

                <p className="text-gray-500">
                    There are no bookings to display.
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-lg border overflow-x-auto">
            <Table>

                <TableHeader>

                    <TableRow>

                        <TableHead>Booking ID</TableHead>

                        <TableHead>Passenger</TableHead>

                        <TableHead>Route</TableHead>

                        <TableHead>Seats</TableHead>

                        <TableHead>Amount</TableHead>

                        <TableHead>Status</TableHead>

                        <TableHead className="text-center">
                            Action
                        </TableHead>

                    </TableRow>

                </TableHeader>

                <TableBody>

                    {bookings.map((booking) => (

                        <TableRow key={booking._id}>

                            <TableCell className="font-medium">
                                {booking._id.slice(-6).toUpperCase()}
                            </TableCell>

                            <TableCell>
                                {booking.user?.name}
                            </TableCell>

                            <TableCell>

                                {booking.bus?.fromCity}

                                {" → "}

                                {booking.bus?.toCity}

                            </TableCell>

                            <TableCell>
                                {booking.seatNumbers.join(", ")}
                            </TableCell>

                            <TableCell>
                                ₹{booking.totalPrice}
                            </TableCell>

                            <TableCell>

                                <Badge
                                    variant={getBadgeVariant(booking.status)}
                                >
                                    {booking.status}
                                </Badge>

                            </TableCell>

                            <TableCell className="text-center">

                                <Link
                                    to={`/admin/booking/${booking._id}`}
                                >

                                    <Button
                                        size="sm"
                                        variant="outline"
                                    >

                                        <Eye className="w-4 h-4 mr-2" />

                                        View

                                    </Button>

                                </Link>

                            </TableCell>

                        </TableRow>

                    ))}

                </TableBody>

            </Table>
        </div>
    );
};

export default BookingTable;