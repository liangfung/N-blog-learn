module.exports = {
	port: 3000,
	session: {
		secret: 'myblog',
		key: 'mublog',
		maxage: 2592000000
	},
	mongodb: 'mongodb://localhost:27017/myblog'
}
