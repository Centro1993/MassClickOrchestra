var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var connection = null;

/*----------------crud controller for tracks----------*/

exports.createTrack = function(callback) {
};

//get all tracks without content
exports.getAllTrack = function(callback) {

};

//get a single track in ints entirety
exports.getTrack = function(id, callback) {

};

//get specific blog post via ID
exports.getPostByID = function(id, callback) {
    r.table('blog_posts').get(id).merge({
        time: r.row('time').toEpochTime()
    }).run(connection, function(err, result) {
        if (err) throw err;
        callback(result);
    });
};

//update track
exports.updateTrack = function(user, data, callback) {

};
