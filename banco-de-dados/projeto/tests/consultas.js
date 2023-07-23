const db = require('../config/db.js');

// db('perfis')
// 	.then(res => console.log(res))
// 	.finally(() => db.destroy());

// db('perfis')
// 	.select('nome', 'id')
// 	.then(res => console.log(res))
// 	.finally(() => db.destroy());

// db.select('nome', 'id')
// 	.from('perfis')
// 	.limit(4)
// 	.offset(2)
// 	.then(res => console.log(res))
// 	.finally(() => db.destroy());

db('perfis')
	// .where({ id: 2 })
	// .first()
	// .where('id', '=', 2)
	// .where('nome', 'like', '%min%')
	// .whereNot({ id: 2 })
	.whereIn('id', [1, 2, 3])
	.then(res => console.log(res))
	.finally(() => db.destroy());
