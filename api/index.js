import express from 'express'
import cors from 'cors'
import mysql from 'mysql'

const app = express()

app.use(express.json())
const db = mysql.createConnection({
    host:"localhost",
    database:"test",
    password:"@Richie254",
    user:"root"

})



app.use(express())
app.use(cors())
app.use(cors())



const Port = process.env.Port || 8800
app.use(express.json())

app.get('/', (req,res)=>{
    res.send({message:'This is the backend Server'})
})

app.get('/books', (req,res)=>{
    const q=('SELECT *FROM books')
    db.query(q, (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
         
    })
    app.post('/books',(req,res)=>{
        const q = "INSERT INTO books (`title`, `desc`,`price`,`cover`) VALUES (?)";
        const values= [
           req.body.title,
           req.body.desc,
           req.body.price,
          req.body.cover,
        
            
            ];
        db.query(q, [values], (err,data)=>{
            if(err) return res.json(err)
            return res.json('Book has been created successfully')
        })
    })
    
})

app.delete('/books/:id', (req,res)=>{
    const bookId = req.params.id;

    const q = 'DELETE FROM books WHERE id= ?'
    db.query(q,[bookId],(err,data)=>{
        if(err) return res.json(err)
        return res.json('Book has been deleted successfully')
    })
})
app.put('/books/:id', (req,res)=>{
    const bookId = req.params.id;

    const q = 'UPDATE books SET `title` =?, `desc`=?,`price`=?,`cover`=? WHERE id= ?'
    const values =[
        req.body.title,
        req.body.desc,
        req.body.price,
       req.body.cover,
    ]
    db.query(q,[...values, bookId],(err,data)=>{
        if(err) return res.json(err)
        return res.json('Book has been Updated successfully')
    })
})



app.listen(Port,()=>{
    console.log(`My app is listening at port ${Port}`)
})