const mongoose = require("mongoose")

const authorSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    dob: Date,
    bio: String,
    pic: String,
    books: [{
        type: mongoose.Schema.Types.ObjectId, ref:'Book'
    }]
})

authorSchema.methods = {
    getFullName: function () {
        return this.firstName + ' ' + this.lastName
    },
    getBooks: function () {
        return this.books
    },
    getDataTransferObject: function (userId) {
      return {
        ...this._doc, books: this.getBooks().map((book) => book.getDataTransferObject(userId))
      };
    }
}

authorSchema.statics = {
    list: function () {
        return this.find({}).exec();
    },
    get: function (id) {
        return this.findById(id).populate('books').exec();
    },
    constructData: function (req) {
        return req.file? {
            ...req.body,
            pic: "images/" + req.file.filename
        } : req.body;
    },
    search: function (query) {
        let name = query.split(' ')
        let searchObject = (name.length == 2)? {
            $or: [{firstName: new RegExp(query)}, {lastName: new RegExp(query)}, {
                $and: [{firstName: new RegExp(name[0])}, {lastName: new RegExp(name[1])}]
            }]
        } : {
            $or: [{firstName: new RegExp(query)}, {lastName: new RegExp(query)}]
        }
        
        return this.find(searchObject).exec();
    },
}

module.exports = mongoose.model('Author', authorSchema)
