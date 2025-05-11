import { AdminConfigService } from "../services/AdminConfigService.js";      

export const getDistricts = async (req, res) => {
  try {
    const [districts] = await AdminConfigService.getDistricts();
    res.status(200).json(districts);
  } catch (error) {
    console.error("Error fetching districts:", error);
    res.status(500).json({ error: error.message });
  }
};

//get rate per km
export const getDeliveryRate = async (req, res) => {
    try {
        const [rate] = await AdminConfigService.getDeliveryRate();
        res.status(200).json(rate);
    } catch (error) {
        console.error("Error fetching rate per km:", error);
        res.status(500).json({ error: error.message });
    }
}
//update rate per km
export const updateDeliveryRate = async (req, res) => {
    try {
//rate will be in url params
        const rate = req.params.rate;
        console.log(rate);
        await AdminConfigService.updateDeliveryRate(rate);
        res.status(200).json({ message: "Rate updated successfully" });
    } catch (error) {
        console.error("Error updating rate per km:", error);
        res.status(500).json({ error: error.message });
    }
}

export default {
    getDistricts
}
    