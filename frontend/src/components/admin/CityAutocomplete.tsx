import { useEffect, useRef, useState } from "react";
import { busAPI } from "@/services/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, MapPin } from "lucide-react";

interface City {
  _id: string;
  name: string;
}

interface CityAutocompleteProps {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const CityAutocomplete = ({
  label,
  value,
  placeholder,
  onChange,
}: CityAutocompleteProps) => {
  const [cities, setCities] = useState<City[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  // Fetch Cities
  useEffect(() => {
    if (value.trim().length < 2) {
      setCities([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const response = await busAPI.getCities(value);

        setCities(response);

        setShowDropdown(true);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [value]);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>
      <Label>{label}</Label>

      <Input
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => {
          if (cities.length > 0) {
            setShowDropdown(true);
          }
        }}
      />

      {/* Loading */}

      {loading && (
        <Loader2 className="absolute right-3 top-10 h-4 w-4 animate-spin text-gray-400" />
      )}

      {/* Dropdown */}

      {showDropdown && cities.length > 0 && (
        <div className="absolute z-50 mt-2 w-full rounded-lg border bg-white shadow-lg">

          {cities.map((city) => (
            <button
              type="button"
              key={city._id}
              onClick={() => {
                onChange(city.name);
                setShowDropdown(false);
              }}
              className="flex w-full items-center gap-2 px-4 py-3 hover:bg-slate-100 text-left"
            >
              <MapPin className="h-4 w-4 text-blue-500" />

              {city.name}
            </button>
          ))}

        </div>
      )}
    </div>
  );
};

export default CityAutocomplete;