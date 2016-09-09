const auth = require("./../Configuration/auth.json");

// Search for a GIF on Giphy
module.exports = (query, rating, callback) => {
    unirest.get("http://api.giphy.com/v1/gifs/random?api_key=" + auth.tokens.giphy_api_key + "&rating=" + rating + "&format=json&limit=1&tag=" + encodeURI(query.replaceAll("&", ""))).header("Accept", "application/json").end(res => {
        if(res.status==200 && res.body) {
        	callback(res.body.data.id);
    	} else {
            callback();
        }
    };
};

String.prototype.replaceAll = (target, replacement) => {
	return this.split(target).join(replacement);
};