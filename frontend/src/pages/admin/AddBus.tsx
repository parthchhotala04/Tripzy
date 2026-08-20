import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { busAPI } from "@/services/api";
import BusForm from "@/components/admin/BusForm";

const AddBus = () => {

  const navigate = useNavigate();

  const handleAddBus = async (data: any) => {

    const response = await busAPI.addBus(data);

    toast.success(response.message);

    navigate("/admin/manage-buses");

  };

  return (

    <BusForm
      mode="add"
      initialData={null}
      onSubmit={handleAddBus}
    />

  );

};

export default AddBus;