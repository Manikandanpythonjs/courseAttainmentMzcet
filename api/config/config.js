const sql = require('msnodesqlv8')
const server = '103.207.1.91'
const database = 'CSE7919'
const userName = 'MZCET'
const password = 'MZCET@1234'
const port = 3128
const connectionString = `Server=${server};Database=${database};UID=${userName};port=${port};PWD=${password};Driver={SQL Server Native Client 11.0}`
// const config = {
//   server: '103.207.1.91',
//   database: 'CSE7919',
//   user: 'MZCET',
//   port: 3128,
//   password: 'MZCET@1234',
//   options: {
//     encrypt: true,
//     trustServerCertificate: false
//   }
// }

// const dbConn = new sql.ConnectionPool(config)
// dbConn.connect()
// const RequestDatabase = new sql.Request(dbConn)
module.exports = connectionString
// const config = {
//   server: 'LAPTOP-8JDMQ6SH\\SQLEXPRESS',

//   database: 'tkinter',
//   user: 'LAPTOP-8JDMQ6SH\\acer',
//   // password: 'MZCET@1234',
//   options: {
//     encrypt: true,
//     trustServerCertificate: true
//   }
// }
