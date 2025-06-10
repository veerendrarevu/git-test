const express = require("express");
const router = express.Router();
const Promotion = require("../../models/admin/Promotion");

// Get all promotions
router.get("/", async(req, res) => {
    try {
        const promotions = await Promotion.find();
        res.json(promotions.length > 0 ? promotions : []); // Ensure it's always an array
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch promotions" });
    }
});

// Add a new promotion
router.post("/", async(req, res) => {
    try {
        const { title, subtitle, description, image, timer } = req.body;
        const newPromotion = new Promotion({ title, subtitle, description, image, timer });
        await newPromotion.save();
        res.status(201).json(newPromotion);
    } catch (error) {
        res.status(500).json({ error: "Failed to add promotion" });
    }
});

// Update a promotion
router.put("/:id", async(req, res) => {
    try {
        const { title, subtitle, description, image, timer } = req.body;
        const updatedPromotion = await Promotion.findByIdAndUpdate(
            req.params.id, { title, subtitle, description, image, timer }, { new: true }
        );
        res.json(updatedPromotion);
    } catch (error) {
        res.status(500).json({ error: "Failed to update promotion" });
    }
});

// Delete a promotion
router.delete("/:id", async(req, res) => {
    try {
        await Promotion.findByIdAndDelete(req.params.id);
        res.json({ message: "Promotion deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete promotion" });
    }
});

router.get("/api/promotions", async(req, res) => {
    try {
        const promotions = await Promotion.find({});
        res.json(promotions); // Ensure startTime is returned
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch promotions" });
    }
});


module.exports = router;