import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { busAPI } from "@/services/api";

import { toast } from "sonner";

import { Loader2 } from "lucide-react";

import {
    Bus,
    Search,
    Plus,
    Pencil,
    Trash2,
    Calendar,
    Clock,
    MapPin,
    IndianRupee,
    Users,
} from "lucide-react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Input } from "@/components/ui/input";

interface BusType {
    _id: string;

    busName: string;

    busNumber: string;

    operator: string;

    fromCity: string;

    toCity: string;

    journeyDate: string;

    departureTime: string;

    arrivalTime: string;

    fare: number;

    totalSeats: number;

    status: string;

    busType: string;
}

const ManageBuses = () => {

    const navigate = useNavigate();

    const [buses, setBuses] = useState<BusType[]>([]);

    const [filteredBuses, setFilteredBuses] = useState<BusType[]>([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [deleteId, setDeleteId] = useState("");

    const fetchBuses = async () => {

        try {

            setLoading(true);

            const response = await busAPI.getAllBuses();

            setBuses(response.buses);

            setFilteredBuses(response.buses);

        }

        catch (error: any) {

            toast.error(

                error.response?.data?.message ||

                "Unable to fetch buses."

            );

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchBuses();

    }, []);

    useEffect(() => {

        const keyword = search.toLowerCase();

        const filtered = buses.filter((bus) =>

            bus.busName.toLowerCase().includes(keyword) ||

            bus.operator.toLowerCase().includes(keyword) ||

            bus.fromCity.toLowerCase().includes(keyword) ||

            bus.toCity.toLowerCase().includes(keyword)

        );

        setFilteredBuses(filtered);

    }, [search, buses]);

    const handleDelete = async () => {

        try {

            const response = await busAPI.deleteBus(deleteId);

            toast.success(response.message);

            fetchBuses();

        }

        catch (error: any) {

            toast.error(

                error.response?.data?.message ||

                "Unable to delete bus."

            );

        }

    };

    const getStatusVariant = (status: string) => {

        switch (status) {

            case "Available":

                return "default";

            case "Maintenance":

                return "secondary";

            case "Cancelled":

                return "destructive";

            default:

                return "outline";

        }

    };

    const formatDate = (date: string) => {

        return new Date(date).toLocaleDateString(
            "en-IN",
            {

                day: "2-digit",

                month: "short",

                year: "numeric",

            }

        );

    };

    return (
        <div className="space-y-6">

            {/* ================= Header ================= */}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <Bus className="h-8 w-8 text-primary" />
                        Manage Buses
                    </h1>

                    <p className="text-muted-foreground mt-1">
                        View, search, edit and delete buses.
                    </p>
                </div>

                <Button
                    onClick={() => navigate("/admin/add-bus")}
                >
                    <Plus className="h-4 w-4 mr-2" />

                    Add New Bus
                </Button>

            </div>

            {/* ================= Search ================= */}

            <div className="relative">

                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                <Input
                    placeholder="Search by Bus Name, Operator, From City or To City..."
                    className="pl-10"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>
            {/* ================= Cards ================= */}

            <div className="grid gap-6">

                {filteredBuses.map((bus) => (

                    <Card
                        key={bus._id}
                        className="hover:shadow-lg transition-all duration-300"
                    >

                        <CardContent className="p-6">

                            <div className="flex flex-col lg:flex-row justify-between gap-6">

                                {/* Left Side */}

                                <div className="flex-1">

                                    <div className="flex items-center gap-3">

                                        <Bus className="text-primary h-7 w-7" />

                                        <div>

                                            <h2 className="text-2xl font-semibold">

                                                {bus.busName}

                                            </h2>

                                            <p className="text-muted-foreground">

                                                {bus.operator}

                                            </p>

                                        </div>

                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">

                                        {/* Route */}

                                        <div className="flex items-center gap-2">

                                            <MapPin className="h-4 w-4 text-primary" />

                                            <span>

                                                {bus.fromCity}

                                                {" → "}

                                                {bus.toCity}

                                            </span>

                                        </div>

                                        {/* Date */}

                                        <div className="flex items-center gap-2">

                                            <Calendar className="h-4 w-4 text-primary" />

                                            <span>

                                                {formatDate(bus.journeyDate)}

                                            </span>

                                        </div>

                                        {/* Time */}

                                        <div className="flex items-center gap-2">

                                            <Clock className="h-4 w-4 text-primary" />

                                            <span>

                                                {bus.departureTime}

                                                {" - "}

                                                {bus.arrivalTime}

                                            </span>

                                        </div>

                                        {/* Fare */}

                                        <div className="flex items-center gap-2">

                                            <IndianRupee className="h-4 w-4 text-primary" />

                                            <span>

                                                ₹{bus.fare}

                                            </span>

                                        </div>

                                        {/* Seats */}

                                        <div className="flex items-center gap-2">

                                            <Users className="h-4 w-4 text-primary" />

                                            <span>

                                                {bus.totalSeats} Seats

                                            </span>

                                        </div>

                                        {/* Bus Number */}

                                        <div>

                                            <span className="font-medium">

                                                Bus No :

                                            </span>

                                            {" "}

                                            {bus.busNumber}

                                        </div>

                                    </div>

                                </div>

                                {/* Right Side */}

                                <div className="flex flex-col justify-between items-end">

                                    <Badge variant={getStatusVariant(bus.status)}>

                                        {bus.status}

                                    </Badge>

                                    <div className="flex gap-3 mt-6">

                                        <Button
                                            variant="outline"
                                            onClick={() =>
                                                navigate(
                                                    `/admin/edit-bus/${bus._id}`
                                                )
                                            }
                                        >

                                            <Pencil className="h-4 w-4 mr-2" />

                                            Edit

                                        </Button>

                                        <Button
                                            variant="destructive"
                                            onClick={() =>
                                                setDeleteId(bus._id)
                                            }
                                        >

                                            <Trash2 className="h-4 w-4 mr-2" />

                                            Delete

                                        </Button>

                                    </div>

                                </div>

                            </div>

                        </CardContent>

                    </Card>

                ))}

            </div>

            {/* Loading */}

            {loading ? (

                <div className="flex justify-center py-20">

                    <Loader2 className="h-10 w-10 animate-spin text-primary" />

                </div>

            ) : filteredBuses.length === 0 ? (

                <Card>

                    <CardContent className="flex flex-col items-center justify-center py-16">

                        <Bus className="h-16 w-16 text-muted-foreground mb-4" />

                        <h2 className="text-xl font-semibold">

                            No buses found

                        </h2>

                        <p className="text-muted-foreground">

                            Click "Add New Bus" to create your first bus.

                        </p>

                    </CardContent>

                </Card>

            ) : (

                <div className="grid gap-6">

                    {/* Your cards from Phase 2 */}

                </div>

            )}
            <AlertDialog open={!!deleteId}>

                <AlertDialogContent>

                    <AlertDialogHeader>

                        <AlertDialogTitle>

                            Delete Bus

                        </AlertDialogTitle>

                        <AlertDialogDescription>

                            This action cannot be undone.

                            The selected bus will be permanently deleted.

                        </AlertDialogDescription>

                    </AlertDialogHeader>

                    <AlertDialogFooter>

                        <AlertDialogCancel
                            onClick={() => setDeleteId("")}
                        >
                            Cancel
                        </AlertDialogCancel>

                        <AlertDialogAction
                            onClick={async () => {

                                await handleDelete();

                                setDeleteId("");

                            }}
                        >
                            Delete
                        </AlertDialogAction>

                    </AlertDialogFooter>

                </AlertDialogContent>

            </AlertDialog>
        </div>
    );

};

export default ManageBuses;