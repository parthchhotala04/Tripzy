import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bus, ShieldCheck, Clock, Headphones } from "lucide-react";
import CityAutocomplete from "@/components/CityAutocomplete";
import { toast } from "sonner";

const Home = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    fromCity: "",
    toCity: "",
    journeyDate: "",
  });
  const [recentSearches, setRecentSearches] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem("recentSearches") || "[]"
    );

    setRecentSearches(data);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSearchData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    if (
      !searchData.fromCity ||
      !searchData.toCity ||
      !searchData.journeyDate
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    if (
      searchData.fromCity.trim().toLowerCase() ===
      searchData.toCity.trim().toLowerCase()
    ) {
      toast.error("Source and destination cannot be the same.");
      return;
    }

    // save recent search
    const recentSearches = JSON.parse(
      localStorage.getItem("recentSearches") || "[]"
    );

    const currentSearch = {
      from: searchData.fromCity,
      to: searchData.toCity,
      date: searchData.journeyDate,
    };

    // Remove duplicate search if it exists
    const filtered = recentSearches.filter(
      (item: any) =>
        !(
          item.from === currentSearch.from &&
          item.to === currentSearch.to &&
          item.date === currentSearch.date
        )
    );

    // Keep only the latest 5 searches
    filtered.unshift(currentSearch);

    localStorage.setItem(
      "recentSearches",
      JSON.stringify(filtered.slice(0, 5))
    );

    navigate(
      `/search?from=${encodeURIComponent(searchData.fromCity)}&to=${encodeURIComponent(searchData.toCity)}&date=${searchData.journeyDate}`
    );
  };




  return (
    <>
      <Navbar />

      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white">

        <div className="container mx-auto px-6 py-20">

          <div className="max-w-3xl">

            <h1 className="text-5xl font-bold mb-6">
              Book Bus Tickets Easily
            </h1>

            <p className="text-lg mb-10">
              Fast, Secure and Comfortable Bus Booking
            </p>

            <Card className="text-black">

              <CardContent className="p-6">

                <div className="grid md:grid-cols-4 gap-4">

                  <CityAutocomplete
                    label="From"
                    value={searchData.fromCity}
                    onChange={(value) =>
                      setSearchData({
                        ...searchData,
                        fromCity: value
                      })
                    }
                  />

                  <CityAutocomplete
                    label="Destination"
                    value={searchData.toCity}
                    onChange={(value) =>
                      setSearchData({
                        ...searchData,
                        toCity: value
                      })
                    }
                  />
                  <Input
                    type="date"
                    name="journeyDate"
                    value={searchData.journeyDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                  />

                  <Button onClick={handleSearch}>
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>

                </div>

              </CardContent>

            </Card>

          </div>

        </div>

      </div>

      <section className="container mx-auto py-16 px-6">

        {recentSearches.length > 0 && (
          <section className="container mx-auto py-8 px-6">
            <h2 className="text-2xl font-bold mb-5">
              Recent Searches
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentSearches.map((item, index) => (
                <Card
                  key={index}
                  className="cursor-pointer hover:shadow-lg transition"
                  onClick={() => {
                    setSearchData({
                      fromCity: item.from,
                      toCity: item.to,
                      journeyDate: item.date,
                    });
                    navigate(
                      `/search?from=${item.from}&to=${item.to}&date=${item.date}`
                    );
                  }}
                >
                  <CardContent className="p-5">
                    <p className="font-semibold">
                      {item.from} → {item.to}
                    </p>

                    <p className="text-sm text-muted-foreground mt-1">
                      {item.date}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        <h2 className="text-3xl font-bold text-center mb-10">
          Popular Routes
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {[
            "Ahmedabad → Surat",
            "Rajkot → Ahmedabad",
            "Surat → Vadodara",
            "Bhavnagar → Rajkot",
            "Ahmedabad → Dwarka",
            "Surat → Mehsana",
          ].map((route) => (
            <Card key={route}>
              <CardContent className="p-6 text-center font-semibold">
                {route}
              </CardContent>
            </Card>
          ))}

        </div>

      </section>

      <section className="bg-slate-100 py-16">

        <div className="container mx-auto">

          <h2 className="text-3xl font-bold text-center mb-10">
            Why Choose Tripzy?
          </h2>

          <div className="grid md:grid-cols-4 gap-8">

            <Card>

              <CardContent className="p-6 text-center">

                <ShieldCheck className="mx-auto h-12 w-12 text-green-600 mb-3" />

                <h3 className="font-bold">
                  Secure Payments
                </h3>

              </CardContent>

            </Card>

            <Card>

              <CardContent className="p-6 text-center">

                <Bus className="mx-auto h-12 w-12 text-blue-600 mb-3" />

                <h3 className="font-bold">
                  Premium Buses
                </h3>

              </CardContent>

            </Card>

            <Card>

              <CardContent className="p-6 text-center">

                <Clock className="mx-auto h-12 w-12 text-yellow-600 mb-3" />

                <h3 className="font-bold">
                  On Time
                </h3>

              </CardContent>

            </Card>

            <Card>

              <CardContent className="p-6 text-center">

                <Headphones className="mx-auto h-12 w-12 text-purple-600 mb-3" />

                <h3 className="font-bold">
                  24×7 Support
                </h3>

              </CardContent>

            </Card>

          </div>

        </div>

      </section>

      <footer className="bg-black text-white py-6">

        <div className="container mx-auto text-center">

          © 2026 Tripzy. All Rights Reserved.

        </div>

      </footer>

    </>
  );
};

export default Home;