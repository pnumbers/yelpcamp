const mongoose = require('mongoose');
const review = require('./review');
const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };

const ImageSchema = new Schema({
    url: String,
    filename: String,
})

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200')
})

const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    price: Number,
    description: String,
    location: String,
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts);

CampgroundSchema.virtual('properties.popUpMarkup').get(function () {
    const markup = `
    <strong><a href="/campgrounds/${this._id}"><h6>${this.title}</h6></a><strong>
    <p>${this.description.substring(0, 20)}...</p>`
    return markup
})

CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema);