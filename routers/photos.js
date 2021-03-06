/********** REQUIRES **********/
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const Photo = require('../models/photo');

/********** MIDDLEWARE **********/

/********** ROUTES **********/
//Index Route
router.get('/', async (req, res) => {
    try {
        const allPhotos = await Photo.find({});

        res.json({
            status: 200,
            data: allPhotos
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

//Create Route
router.post('/', async (req, res) => {
    let hashedPassword = await bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    req.body.password = hashedPassword;

    console.log(req.body, 'hitting create Photo');
    try {
        const createdPhoto = await Photo.create(req.body);
        res.json({
            status: 200,
            message: 'Registration successful.',
            data: createdPhoto
        });
        
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

//Show Route
router.get('/:id', async (req, res) => {
    try {
        const foundPhoto = await Photo.findById(req.params.id);
        res.json({
            status: 200,
            data: foundPhoto
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

//Update Route
router.put('/:id', async (req, res) => {
    try {
        const updatedPhoto = await Photo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({
            status: 200,
            data: updatedPhoto
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

//Delete Route
router.delete('/:id', async (req, res) => {
    try {
        const deletedPhoto = await Photo.findByIdAndRemove(req.params.id);

        console.log(deletedPhoto, ' this is deletedPhoto');
        res.json({
            status: 200,
            message: 'Photo successfully deleted.'
        });
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;