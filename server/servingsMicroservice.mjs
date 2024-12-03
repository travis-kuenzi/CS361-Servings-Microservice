import express from 'express';

const app = express();
app.use(express.json());

app.post("/adjustServings", async(req, res) => {
    try {   
        const { data } = req.body;

        if (!data || !data.ingredients || typeof data.currentServings !== "number" || typeof data.desiredServings !== "number") {
            return res.status(400).json({
                error: "Invalid input. 'data' must include 'ingredients', 'currentServings', and 'desiredServings'."
            });
        }

        const scale = data.desiredServings / data.currentServings;

        for (const ingredient of data.ingredients) {
            ingredient.amount *= scale;
        }

        data.currentServings = data.desiredServings;

        return res.json({
            data: data,
            message: "Successfully scaled ingredient list"
        })

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: "An unexpected error occurred."
        });
    }
});


// Start the server
const PORT = 3004;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});