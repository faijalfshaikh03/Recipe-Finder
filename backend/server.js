import express from "express"


const app = express()
const PORT = process.env.PORT || 8000

app.get('/api/health', (req,res) => {
    res.status(200).json({success: true})
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})