import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import BusForm from "@/components/admin/BusForm";
import { busAPI } from "@/services/api";

const EditBus = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [bus, setBus] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  // Fetch Bus Details
  const fetchBus = async () => {
    try {

      const response = await busAPI.getBusById(id!);

      setBus(response.bus);

    } catch (error: any) {

      toast.error(
        error.response?.data?.message ||
        "Unable to fetch bus."
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchBus();
  }, []);

  // Update Bus
  const handleUpdate = async (data: any) => {

    try {

      const response = await busAPI.updateBus(id!, data);

      toast.success(response.message);

      navigate("/admin/manage-buses");

    } catch (error: any) {

      toast.error(
        error.response?.data?.message ||
        "Failed to update bus."
      );

    }

  };

  if (loading) {

    return (

      <div className="flex justify-center py-20">

        <Loader2 className="h-10 w-10 animate-spin" />

      </div>

    );

  }

  return (

    <BusForm
      mode="edit"
      initialData={bus}
      onSubmit={handleUpdate}
    />

  );

};

export default EditBus;