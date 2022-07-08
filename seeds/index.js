const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelpcamp');
}
main().then(() => {
    console.log("Connection Open");
});


const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62c679905ef7515e7e87aca0',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dbrd6dijv/image/upload/v1657278390/YelpCamp/yoc1hpusv1pyyqhs8dyn.jpg',
                    filename: 'YelpCamp/yoc1hpusv1pyyqhs8dyn',

                },
                {
                    url: 'https://res.cloudinary.com/dbrd6dijv/image/upload/v1657278392/YelpCamp/ul5a6gcvjds1bgmgnmul.jpg',
                    filename: 'YelpCamp/ul5a6gcvjds1bgmgnmul',

                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})