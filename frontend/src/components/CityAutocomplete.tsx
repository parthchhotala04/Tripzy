import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cityAPI } from "@/services/api";

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

interface City {
  _id: string;
  name: string;
  state: string;
}

export default function CityAutocomplete({
  label,
  value,
  onChange,
}: Props) {
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [loading, setLoading] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  // Fetch city suggestions with debounce
  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (value.trim().length < 2) {
        setSuggestions([]);
        setSelectedIndex(-1);
        return;
      }

      try {
        setLoading(true);

        const cities = await cityAPI.getCities(value);

        setSuggestions(cities);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [value]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setSuggestions([]);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const chooseCity = (city: City) => {
    onChange(city.name);
    setSuggestions([]);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (!suggestions.length) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev === suggestions.length - 1 ? 0 : prev + 1
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev <= 0 ? suggestions.length - 1 : prev - 1
        );
        break;

      case "Enter":
        e.preventDefault();

        if (selectedIndex >= 0) {
          chooseCity(suggestions[selectedIndex]);
        }
        break;

      case "Escape":
        setSuggestions([]);
        setSelectedIndex(-1);
        break;
    }
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <Search
        className="absolute left-3 top-3 text-gray-400"
        size={18}
      />

      <Input
        className="pl-10"
        placeholder={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
      />

      {(loading ||
        suggestions.length > 0 ||
        (value.length >= 2 && !loading)) && (
        <div className="absolute left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
          {loading && (
            <div className="px-4 py-3 text-gray-500">
              Searching...
            </div>
          )}

          {!loading &&
            suggestions.map((city, index) => (
              <div
                key={city._id}
                onClick={() => chooseCity(city)}
                className={`px-4 py-3 cursor-pointer transition ${
                  index === selectedIndex
                    ? "bg-blue-100"
                    : "hover:bg-blue-50"
                }`}
              >
                <div className="font-medium">
                  📍 {city.name}
                </div>

                <div className="text-xs text-gray-500">
                  {city.state}
                </div>
              </div>
            ))}

          {!loading &&
            value.length >= 2 &&
            suggestions.length === 0 && (
              <div className="px-4 py-3 text-gray-500">
                No cities found
              </div>
            )}
        </div>
      )}
    </div>
  );
}