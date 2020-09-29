const handleProfile = (req,res, db, bcrypt)=>{
				
	const { id } = req.params;
	let found = false;

	db.select('*').from('users').where({
		id: id
	})
	.then(user=>{
		if (user.length){
		res.json(user[0])
	} else {
		res.status(400).json('Not found')
	}
	})
	.catch(err=> res.status(400).json('Not found'));

}

module.exports =  {
	handleProfile: handleProfile
}