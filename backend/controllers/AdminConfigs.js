import { AdminConfigService } from '../services/AdminConfigService.js';

//DistrictTable and delivery rates
export const getDistricts = async (req, res) => {
  try {
    const [districts] = await AdminConfigService.getDistricts();
    res.status(200).json(districts);
  } catch (error) {
    console.error('Error fetching districts:', error);
    res.status(500).json({ error: error.message });
  }
};

//get rate per km
export const getDeliveryRate = async (req, res) => {
  try {
    const [rate] = await AdminConfigService.getDeliveryRate();
    res.status(200).json(rate);
  } catch (error) {
    console.error('Error fetching rate per km:', error);
    res.status(500).json({ error: error.message });
  }
};
//update rate per km
export const updateDeliveryRate = async (req, res) => {
  try {
    //rate will be in url params
    const rate = req.params.rate;
    console.log(rate);
    await AdminConfigService.updateDeliveryRate(rate);
    res.status(200).json({ message: 'Rate updated successfully' });
  } catch (error) {
    console.error('Error updating rate per km:', error);
    res.status(500).json({ error: error.message });
  }
};

//stockTable details
export const getStockDetails = async (req, res) => {
  try {
    const [stocks] = await AdminConfigService.getStockDetails();
    res.status(200).json(stocks);
  } catch (error) {
    console.error("Error fetching stock details:", error);
    res.status(500).json({ error: error.message });
  }
};

//update stock status
export const updateStockStatus = async (req, res) => {
  try {
    const stockId = req.params.stockId;
    const status = req.body.status;
    await AdminConfigService.updateStockStatus(stockId, status);
    res.status(200).json({ message: 'Stock status updated successfully' });
  } catch (error) {
    console.error("Error updating stock status:", error);
    res.status(500).json({ error: error.message });
  }
}

//update stock quantity
export const updateStockQuantity = async (req, res) => {
  const stockId = req.params.stockId;
  const { quantityToAdd } = req.body;

  if (!quantityToAdd || isNaN(quantityToAdd)) {
    return res.status(400).json({ error: 'Invalid quantity to add' });
  }

  try {
    await AdminConfigService.updateStockQuantity(stockId, parseInt(quantityToAdd));
    res.status(200).json({ message: 'Stock quantity updated successfully' });
  } catch (error) {
    console.error("Error updating stock quantity:", error);
    res.status(500).json({ error: error.message });
  }
};

//get the sizes
export const getSizes = async (req, res) => {
  try {
    const [sizes] = await AdminConfigService.getSizes();
    res.status(200).json(sizes);
  } catch (error) {
    console.error('Error fetching sizes:', error);
    res.status(500).json({ error: error.message });
  }
}

export const addSize = async (req, res) => {
  const { size } = req.body;

  if (!size || typeof size !== 'string' || !size.trim()) {
    return res.status(400).json({ error: 'Invalid size value' });
  }

  try {
    await AdminConfigService.addSize(size.trim().toUpperCase());
    res.status(201).json({ message: 'Size added successfully' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'This size already exists.' });
    }
    console.error('Error adding size:', error);
    res.status(500).json({ error: 'Failed to add size' });
  }
};

/////CAPACITY TABLE///////
//get the capacity
export const getCapacity = async (req, res) => {
  try {
    const [capacity] = await AdminConfigService.getCapacity();
    res.status(200).json(capacity);
  } catch (error) {
    console.error('Error fetching capacity:', error);
    res.status(500).json({ error: error.message });
  }
}

// Add capacity with duplicate check

export const addCapacity = async (req, res) => {
  const { capacityInUnits, wrappingCharge } = req.body;

  if (
    !capacityInUnits || isNaN(capacityInUnits) || capacityInUnits <= 0 ||
    !wrappingCharge || isNaN(wrappingCharge) || wrappingCharge < 0
  ) {
    return res.status(400).json({ error: 'Invalid input for capacity or wrapping charge' });
  }

  try {
    await AdminConfigService.addCapacity(parseInt(capacityInUnits), parseFloat(wrappingCharge));
    res.status(201).json({ message: 'Capacity added successfully' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ error: 'This capacity already exists' });
    } else {
      console.error("Error adding capacity:", error);
      res.status(500).json({ error: 'Failed to add capacity' });
    }
  }
};

// UPDATE capacity 
export const updateCapacity = async (req, res) => {
  const { giftboxCapacityId } = req.params;
  const { capacityInUnits, wrappingCharge } = req.body;

  if (
    !capacityInUnits || isNaN(capacityInUnits) || capacityInUnits <= 0 ||
    !wrappingCharge || isNaN(wrappingCharge) || wrappingCharge < 0
  ) {
    return res.status(400).json({ error: 'Invalid input for capacity or wrapping charge' });
  }

  try {
    await AdminConfigService.updateCapacity(
      giftboxCapacityId,
      parseInt(capacityInUnits),
      parseFloat(wrappingCharge)
    );
    res.status(200).json({ message: 'Capacity updated successfully' });
  } catch (error) {
    console.error('Error updating capacity:', error);
    res.status(500).json({ error: 'Failed to update capacity' });
  }
};
