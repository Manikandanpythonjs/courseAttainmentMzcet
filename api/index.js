const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const connectionString = require('./config/config')
// const RequestDatabase = require('./config/config')
const router = require('./Routes/login')
// const sql = require('msnodesqlv8')
// const sql = require('mssql')
const sql = require('msnodesqlv8')

const app = express()
const ports = 5000

var login = require('./Routes/login.js')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/login', login)

// app.get('/', (req, res) => {
//   RequestDatabase.query('Select * from Staff_login').then(function (recordset) {
//     res.send(recordset)
//   })
// })

app.get('/', (req, res) => {
  const { dep, sem } = req.query
  console.log('Department:', dep)
  console.log('Semester:', sem)
  // let semint = parseInt(sem)
  const params = [dep, sem]
  sql.query(
    connectionString,
    'SELECT * FROM course_details WHERE Department=? AND semester=?',
    params,
    (err, rows) => {
      if (err) {
        console.error(err)
      } else if (rows) {
        res.json(rows)
      } else {
        res.send('No data found.')
      }
    }
  )
})

app.get('/getstudentdetails', (req, res) => {
  const { dept, year, sem, subcode } = req.query
  console.log('Department:', dept)
  console.log('sem:', sem), console.log('subcode', subcode)
  const params = [dept, sem, subcode, year]
  sql.query(
    connectionString,
    `SELECT
    sd.Student_name,
    sd.Reg_No,
    sd.Department,
    sd.Year,
    md.Sem,
    md.Co1,
    md.Co2,
    md.Co3,
    md.Co4,
    md.Co5,
    md.Co6,
    subj.Course_name,
    subj.Course_id,
    subj.staff_name
FROM
    mark_details md
JOIN
    student_details sd ON md.Reg_No = sd.Reg_No
JOIN
    course_details subj ON md.Course_id = subj.Course_id
WHERE
    
    sd.Department =? AND
    md.Sem = ? AND
    md.Course_id= ? AND 
    sd.year=?
    `,

    params,
    (err, rows) => {
      if (err) {
        console.error(err)
        res.status(500).json({ error: 'Internal Server Error' })
      } else if (rows.length > 0) {
        res.json(rows)
      } else {
        res.status(404).json({ message: 'No data found.' })
      }
    }
  )
})

// app.get('/getstudentdetails', (req, res) => {
//   const { dept, year } = req.query
//   console.log('Department:', dept)
//   console.log('Year:', year)
//   const params = [dept, year]
//   sql.query(
//     connectionString,
//     `SELECT s.Student_name, s.Reg_No, s.Year, s.Department, m.Course_name, m.mark,m.Sem,m.Co1,m.Co2,m.Co3,m.Co4,m.Co5,m.Co6
//      FROM student_details s
//      JOIN mark_details m ON s.Student_name = m.Student_name AND s.Reg_No = m.Reg_No
//      WHERE s.Department=? AND s.Year=?`,
//     params,
//     (err, rows) => {
//       if (err) {
//         console.error(err)
//         res.status(500).json({ error: 'Internal Server Error' })
//       } else if (rows.length > 0) {
//         res.json(rows)
//       } else {
//         res.status(404).json({ message: 'No data found.' })
//       }
//     }
//   )
// })

app.post('/postMark', (req, res) => {
  const { studentName, regNo, subjectName, conum, conumValue, department, year, sem, courseid } =
    req.body
  console.log(conum, conumValue, department, subjectName, regNo, sem)

  const updateQuery = `UPDATE mark_details 
                       SET ${conum} = ?
                       WHERE Reg_No = ? AND Course_id = ? AND Sem = ?`

  const updateValues = [conumValue, regNo, courseid, sem]

  sql.query(connectionString, updateQuery, updateValues, (err, result) => {
    if (err) {
      console.error('Error updating mark_details:', err)
      res.status(500).json({ error: 'Internal Server Error' })
    } else {
      res.status(200).json({ message: 'Mark updated successfully' })
    }
  })
})

// app.post('/postMark', (req, res) => {
//   const { studentName, regNo, subjectName,conum} = req.body

//   const updateQuery = `UPDATE mark_details
//   SET ${conum} = ?
//   WHERE student_name = ? AND register_number = ? AND subject = ?`

//   const insertValues = [studentName, regNo, subjectName,]

//   sql.query(connectionString, updateQuery, insertValues, (err, result) => {
//     if (err) {
//       console.error(err)
//       res.status(500).json({ error: 'Internal Server Error' })
//     } else {
//       const selectQuery = `SELECT *  FROM mark_details
//       WHERE Department = ? AND Year = ? AND Sem = ?;`

//       const selectValues = [department, year, semester]

//       sql.query(connectionString, selectQuery, selectValues, (selectErr, rows) => {
//         if (selectErr) {
//           console.error(selectErr)
//           res.status(500).json({ error: 'Internal Server Error' })
//         } else if (rows.length > 0) {
//           res.json(rows)
//         } else {
//           res.status(404).json({ message: 'No data found.' })
//         }
//       })
//     }
//   })
// })

// app.post('/postMark', (req, res) => {
//   const { studentName, regNo, department, year, semester, subjectName, examType, mark } = req.body
//   const query = `INSERT INTO mark_details (Student_name, Reg_No,Department,Year,Course_name,Sem,mark)
//                  VALUES (?, ?, ?, ?, ?, ?, ?)`

//   const values = [studentName, regNo, department, year, semester, subjectName, examType, mark]

//   sql.query(connectionString, query, values, (err, result) => {
//     if (err) {
//       console.error(err)
//       res.status(500).json({ error: 'Internal Server Error' })
//     } else {
//       console.log('Mark inserted successfully')
//       res.sendStatus(200)
//     }
//   })
// })

// app.get('/getstudentdetails', (req, res) => {
//   const { dep, year } = req.query
//   console.log('Department:', dep)
//   console.log('Year:', year)
//   // let semint = parseInt(sem)
//   const params = [dep, year]
//   sql.query(
//     connectionString,
//     'SELECT * FROM student_details WHERE Department=? AND Year=?',
//     params,
//     (err, rows) => {
//       if (err) {
//         console.error(err)
//       } else if (rows) {
//         res.json(rows)
//       } else {
//         res.send('No data found.')
//       }
//     }
//   )
// })

// app.get('/', (req, res) => {
//   // const { dep, sem } = req.body
//   // console.log(dep, sem)
//   // const params = [dep, sem]
//   sql.query(
//     connectionString,
//     'SELECT * FROM course_details',

//     (err, rows) => {
//       if (err) {
//         console.error(err)
//         res.status(500).send('Internal Server Error')
//       } else if (rows && rows.length > 0) {
//         res.json({ rows })
//       } else {
//         res.status(404).send('No data found.')
//       }
//     }
//   )
// })
app.listen(ports, () => {
  console.log(`CourseAttainment app listening on port ${ports}!`)
  // connectToSqlServer()
})
