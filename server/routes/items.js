    const express = require('express');
    const cors = require('cors');
    const router = express.Router();
    const app = express();

    // Use CORS middleware
    app.use(cors());

    const Item = require('../models/Item');

    // Create an item
    router.post('/', async (req, res) => {
    const newItem = new Item(req.body);
    try {
        const item = await newItem.save();
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    });

    // Read all items
    router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    });

    // Update an item
    router.put('/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        });
        res.json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    });

    // Delete an item
    router.delete('/:id', async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    });

    module.exports = router;
