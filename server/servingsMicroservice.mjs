import express from 'express';
import cors from 'cors';

const app = express();

// Allow requests from http://localhost:3000
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());

app.post("/adjustServings", async(req, res) => {
    try {   
        console.log("Running adjust servings!\n");

        console.log(req.body);
        let { data } = req.body;

        console.log(`Current servings: ${data.currentServings}`);
        console.log(`Desired servings: ${data.desiredServings}`);

        if (!data || !data.ingredients) {
            return res.status(400).json({
                error: "Invalid input. 'data' must include 'ingredients', 'currentServings', and 'desiredServings'."
            });
        }

        const scale = data.desiredServings / data.currentServings;

        // console.log("Old ingredients list:\n");
        // console.log(data.ingredients);

        for (const ingredient of data.ingredients) {
            ingredient.amount *= scale;
        }

        // console.log("New ingredients list:\n");
        // console.log(data.ingredients);

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