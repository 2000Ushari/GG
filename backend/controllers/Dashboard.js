import { DashboardService } from "../services/DashboardService.js";

const getAccessoryData = async (req, res) => {
    try {
        const accessoryData = await DashboardService.accessoryData();
        if (accessoryData) {
        res.status(200).json(accessoryData[0]);
        }
    } catch (error) {
        console.error("Error fetching accessory data:", error);
        res.status(500).json({ error: error.message });
    }
    };

    const getAccessoryVsStock = async (req, res) => {
        try {
            const accessoryVsStock = await DashboardService.accessoryVsStock();
            if (accessoryVsStock) {
            res.status(200).json(accessoryVsStock[0]);
            }
        } catch (error) {
            console.error("Error fetching accessory vs stock data:", error);
            res.status(500).json({ error: error.message });
        }
        }

    const getOrderCountByStatus = async (req, res) => {
        try {
            const orderCountByStatus = await DashboardService.getOrderCountByStatus();
            if (orderCountByStatus) {
            res.status(200).json(orderCountByStatus[0]);
            }
        } catch (error) {
            console.error("Error fetching order count by status:", error);
            res.status(500).json({ error: error.message });
        }
        };



const getNumberOfCustomers = async  (req, res) => {
    try {
        const customerCount = await DashboardService.getNumberOfCustomers();
        if (customerCount) {
        res.status(200).json(customerCount[0]);
        }
    } catch (error) {
        console.error("Error fetching customer count:", error);
        res.status(500).json({ error: error.message });
    }
    };


    const getNumberOfAccessories =  async  (req, res) => {
        try {
            const customerCount = await DashboardService.getNumberOfAccessories();
            if (customerCount) {
            res.status(200).json(customerCount[0]);
            }
        } catch (error) {
            console.error("Error fetching customer count:", error);
            res.status(500).json({ error: error.message });
        }
        };

        const getSales = async (req, res) => {
            try {
                const sales = await DashboardService.getSales();
                if (sales) {
                res.status(200).json(sales[0]);
                }
            } catch (error) {
                console.error("Error fetching sales data:", error);
                res.status(500).json({ error: error.message });
            }
            };
        const getOrderCount = async (req, res) => {
            try {
                const orderCount = await DashboardService.getOrderCount();
                if (orderCount) {
                res.status(200).json(orderCount[0]);
                }
            } catch (error) {
                console.error("Error fetching order count:", error);
                res.status(500).json({ error: error.message });
            }
            };
            


export { getAccessoryData, getNumberOfCustomers, getNumberOfAccessories, getSales, getAccessoryVsStock, getOrderCountByStatus, getOrderCount };