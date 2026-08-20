import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Bus, IndianRupee } from "lucide-react";
import { busAPI } from "@/services/api";

export default function SearchResults() {

  const navigate = useNavigate();

  const [params] = useSearchParams();

  const [buses, setBuses] = useState([]);

  const [loading, setLoading] = useState(false);

  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const date = params.get("date") || "";

  useEffect(() => {

    getBus();

  }, [from, to, date]);

  const getBus = async () => {
    try {
      setLoading(true);

      const data = await busAPI.searchBus(
        from,
        to,
        date
      );

      setBuses(data.buses);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (

    <>
      <Navbar />

      <div className="container py-5">

        <h2 className="mb-4">

          {from} → {to}

        </h2>

        <p className="text-muted-foreground mb-4">
          Journey Date: {date}
        </p>

        {
          buses.length === 0 ?

            <div className="text-center py-10">
              <Bus className="mx-auto mb-4 h-12 w-12 text-gray-400" />

              <h2 className="text-2xl font-semibold">
                No buses found
              </h2>

              <p className="text-gray-500 mt-2">
                Try changing your search criteria.
              </p>
            </div>

            :

            buses.map((bus: any) => (

              <Card
                key={bus._id}
                className="mb-4 p-4 hover:shadow-xl transition"
              >

                <div className="grid md:grid-cols-5 gap-5 items-center">

                  <div>

                    <h3 className="font-bold">

                      {bus.busName}

                    </h3>

                    <p>{bus.operator}</p>

                  </div>

                  <div>

                    <p>

                      {bus.departureTime}

                    </p>

                    ↓

                    <p>

                      {bus.arrivalTime}

                    </p>

                  </div>

                  <div>

                    <Clock className="inline mr-2" />

                    {bus.duration}

                  </div>

                  <div>

                    <p>

                      Seats Left

                    </p>

                    <h3>

                      {bus.availableSeats}

                    </h3>

                  </div>

                  <div>

                    <h2 className="text-2xl font-bold">

                      ₹{bus.fare}

                    </h2>

                    <Button
                      className="mt-2 w-full"
                      onClick={() => navigate(`/select-seat/${bus._id}`)}
                    >

                      Book Now

                    </Button>

                  </div>

                </div>

              </Card>

            ))

        }

      </div>

    </>

  )

}