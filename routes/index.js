exports.view = function(req, res){
	res.render('index');
};

exports.logout = function(req, res) {
	req.session = null;
	res.render('index');
}