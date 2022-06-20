const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelper')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const rand1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '629d486b39b00c40db9274d7',
            location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [{
                url: 'https://res.cloudinary.com/dy0loatah/image/upload/v1655578474/YelpCamp/mdfc0j0jnk9wbnwrjvtl.jpg',
                filename: 'YelpCamp/mdfc0j0jnk9wbnwrjvtl',
            },
            {
                url: 'https://res.cloudinary.com/dy0loatah/image/upload/v1655578481/YelpCamp/dos76dkenudr3au0am1s.jpg',
                filename: 'YelpCamp/dos76dkenudr3au0am1s',
            }
            ],
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit consequatur harum similique cum facere, ex, ullam quae dolor tempora et, voluptatem voluptas alias fugit! Tempora sint consequatur esse iusto eum.',
            price
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})