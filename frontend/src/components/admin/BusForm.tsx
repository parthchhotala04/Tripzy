import { useEffect, useState } from "react";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner";

import CityAutocomplete from "./CityAutocomplete";

interface BusFormData {
    busName: string;
    busNumber: string;
    operator: string;
    busType: string;

    fromCity: string;
    toCity: string;

    journeyDate: string;

    departureTime: string;
    arrivalTime: string;

    fare: number | string;
    totalSeats: number | string;

    status: string;
}

interface BusFormProps {
    mode: "add" | "edit";

    initialData: BusFormData | null;

    onSubmit: (data: BusFormData) => Promise<void>;
}
const BusForm = ({
    mode,
    initialData,
    onSubmit,
}: BusFormProps) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<BusFormData>({
        busName: "",
        busNumber: "",
        operator: "",

        busType: "AC Sleeper",

        fromCity: "",
        toCity: "",

        journeyDate: "",

        departureTime: "",
        arrivalTime: "",

        fare: "",

        totalSeats: "",

        status: "Available",
    });
    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
            });
        }
    }, [initialData]);
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSelectChange = (
        name: keyof BusFormData,
        value: string
    ) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const validate = () => {
        if (
            !formData.busName ||
            !formData.busNumber ||
            !formData.operator ||
            !formData.fromCity ||
            !formData.toCity ||
            !formData.journeyDate ||
            !formData.departureTime ||
            !formData.arrivalTime ||
            !formData.fare ||
            !formData.totalSeats
        ) {
            toast.error("Please fill all required fields.");

            return false;
        }

        if (
            formData.fromCity.trim().toLowerCase() ===
            formData.toCity.trim().toLowerCase()
        ) {
            toast.error("Source and destination cannot be the same.");
            return false;
        }

        return true;
    };
    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            setLoading(true);

            await onSubmit({
                ...formData,
                fare: Number(formData.fare),
                totalSeats: Number(formData.totalSeats),
            });

        } finally {

            setLoading(false);

        }
    };
    return (

        <Card className="max-w-5xl mx-auto">

            <CardContent className="p-8">

                <form
                    onSubmit={handleSubmit}
                    className="space-y-8"
                >
                    {/* ================= Bus Information ================= */}

                    <div>

                        <h2 className="text-2xl font-semibold mb-6">
                            Bus Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Bus Name */}

                            <div>

                                <Label>Bus Name</Label>

                                <Input
                                    name="busName"
                                    placeholder="Volvo AC Sleeper"
                                    value={formData.busName}
                                    onChange={handleChange}
                                />

                            </div>

                            {/* Bus Number */}

                            <div>

                                <Label>Bus Number</Label>

                                <Input
                                    name="busNumber"
                                    placeholder="GJ01AB1234"
                                    value={formData.busNumber}
                                    onChange={handleChange}
                                />

                            </div>

                            {/* Operator */}

                            <div>

                                <Label>Operator</Label>

                                <Input
                                    name="operator"
                                    placeholder="Patel Travels"
                                    value={formData.operator}
                                    onChange={handleChange}
                                />

                            </div>

                            {/* Bus Type */}

                            <div>

                                <Label>Bus Type</Label>

                                <Select
                                    value={formData.busType}
                                    onValueChange={(value) =>
                                        handleSelectChange("busType", value)
                                    }
                                >

                                    <SelectTrigger>

                                        <SelectValue />

                                    </SelectTrigger>

                                    <SelectContent>

                                        <SelectItem value="AC Sleeper">
                                            AC Sleeper
                                        </SelectItem>

                                        <SelectItem value="Non AC Sleeper">
                                            Non AC Sleeper
                                        </SelectItem>

                                        <SelectItem value="AC Seater">
                                            AC Seater
                                        </SelectItem>

                                        <SelectItem value="Non AC Seater">
                                            Non AC Seater
                                        </SelectItem>

                                        <SelectItem value="Luxury">
                                            Luxury
                                        </SelectItem>

                                    </SelectContent>

                                </Select>

                            </div>

                        </div>

                    </div>
                    {/* ================= Journey Details ================= */}

                    <div>

                        <h2 className="text-2xl font-semibold mb-6">
                            Journey Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* From City */}

                            <CityAutocomplete
                                label="From City"
                                name="fromCity"
                                value={formData.fromCity}
                                placeholder="Enter source city"
                                onChange={(value) =>
                                    setFormData({
                                        ...formData,
                                        fromCity: value,
                                    })
                                }
                            />

                            {/* To City */}

                            <CityAutocomplete
                                label="To City"
                                name="toCity"
                                value={formData.toCity}
                                placeholder="Enter destination city"
                                onChange={(value) =>
                                    setFormData({
                                        ...formData,
                                        toCity: value,
                                    })
                                }
                            />

                            {/* Journey Date */}

                            <div>

                                <Label>Journey Date</Label>

                                <Input
                                    type="date"
                                    name="journeyDate"
                                    value={formData.journeyDate}
                                    onChange={handleChange}
                                />

                            </div>

                            {/* Status */}

                            <div>

                                <Label>Status</Label>

                                <Select
                                    value={formData.status}
                                    onValueChange={(value) =>
                                        handleSelectChange("status", value)
                                    }
                                >

                                    <SelectTrigger>

                                        <SelectValue />

                                    </SelectTrigger>

                                    <SelectContent>

                                        <SelectItem value="Available">
                                            Available
                                        </SelectItem>

                                        <SelectItem value="Maintenance">
                                            Maintenance
                                        </SelectItem>

                                        <SelectItem value="Cancelled">
                                            Cancelled
                                        </SelectItem>

                                    </SelectContent>

                                </Select>

                            </div>

                        </div>

                    </div>
                    {/* ================= Timing ================= */}

                    <div>

                        <h2 className="text-2xl font-semibold mb-6">
                            Timing
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Departure Time */}

                            <div>

                                <Label>Departure Time</Label>

                                <Input
                                    type="time"
                                    name="departureTime"
                                    value={formData.departureTime}
                                    onChange={handleChange}
                                />

                            </div>

                            {/* Arrival Time */}

                            <div>

                                <Label>Arrival Time</Label>

                                <Input
                                    type="time"
                                    name="arrivalTime"
                                    value={formData.arrivalTime}
                                    onChange={handleChange}
                                />

                            </div>

                        </div>

                    </div>

                    {/* ================= Pricing ================= */}

                    <div>

                        <h2 className="text-2xl font-semibold mb-6">
                            Pricing & Seats
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Fare */}

                            <div>

                                <Label>Fare (₹)</Label>

                                <Input
                                    type="number"
                                    name="fare"
                                    placeholder="850"
                                    value={formData.fare}
                                    onChange={handleChange}
                                    min="1"
                                />

                            </div>

                            {/* Total Seats */}

                            <div>

                                <Label>Total Seats</Label>

                                <Input
                                    type="number"
                                    name="totalSeats"
                                    placeholder="40"
                                    value={formData.totalSeats}
                                    onChange={handleChange}
                                    min="1"
                                />

                            </div>

                        </div>

                    </div>

                    {/* ================= Buttons ================= */}

                    <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t">

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => window.history.back()}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="min-w-[180px]"
                        >

                            {loading ? (

                                <>

                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />

                                    {mode === "add"
                                        ? "Adding Bus..."
                                        : "Updating Bus..."}

                                </>

                            ) : (

                                mode === "add"
                                    ? "Add Bus"
                                    : "Update Bus"

                            )}

                        </Button>

                    </div>

                </form>

            </CardContent>

        </Card>
    );

};

export default BusForm;