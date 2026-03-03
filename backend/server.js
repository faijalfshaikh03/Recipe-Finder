import express from "express"
import { db } from "./db/db.js"
import { favouritesTable } from "./db/schema.js"
import "dotenv/config"


const app = express()
app.use(express.json());
const PORT = process.env.PORT || 8000

app.get('/api/health', (req,res) => {
    res.status(200).json({success: true})
})

app.post('/api/favorites', async (req,res) => {
    try {
        const {userId, recipeId, title, image, cookTime, servings} = req.body;

        if(!userId || !recipeId || !title) {
            res.status(400).json({error: "Missing required fields"})
        }

        console.log(req.body)
        const newFavorite = await db.insert(favouritesTable).values({
            userId,
            recipeId,
            title,
            image,
            cookTime,
            servings
        }).returning()

        res.status(201).json(newFavorite[0])

    } catch (error) {
        console.log("Some error occured ",error)
        return res.status(400).json({message: "Some error occured"});
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})