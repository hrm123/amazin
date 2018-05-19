const  mongoose = require("mongoose");
const Schema = mongoose.Schema;
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const mongooseAlgolia = require('mongoose-algolia');
const configKeys = require('../configKeys');

console.log(configKeys);
const ProductSchema = new Schema({
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}],
    image: String,
    title: String,
    description: String,
    price: Number,
    created: {type: Date, default: Date.now}
}, {
    toObject : { virtuals: true },
    toJSON: { virtuals: true }
});

/*
ProductSchema
    .virtual('averageRating')
    .get(function() {
        var rating = 0;
        if(this.reviews.length ==0){
            rating = 0;
        } else {
            this.reviews.map((r) => {
                rating += r.rating;
            })
        }
        return (rating / (this.reviews.length === 0 ? 1 : this.reviews.length));
    });
*/

ProductSchema.plugin(deepPopulate);

ProductSchema.plugin(mongooseAlgolia, {
    appId: configKeys.appId,
    apiKey: configKeys.apiKey,
    indexName: 'amazinv1',
    selector: '_id title image reviews description price owner created',
    populate: {
        path: 'owner reviews',
        selecct: 'name rating'
    },
    defaults: {
        author: 'unknown'

    },
    mappings: {
        title: function(value){
            return `${value}`;
            }
    },
    virtuals: {
        averageRating: function(dc){
            var rating = 0;
            if(dc.reviews.length == 0) {
                rating = 0;
            } else {
                dc.reviews.map((r) => {
                    rating += r.rating
                });
                rating = rating / dc.reviews.length == 0 ? 1 : dc.reviews.length;
            }
            return rating;
        }
    },
    debug: true
});

let Model = mongoose.model('Product', ProductSchema);
Model.SyncToAlgolia();
Model.SetAlgoliaSettings({
    searchableAttributes: ['title']
});

module.exports = Model;
