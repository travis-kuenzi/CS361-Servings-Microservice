const microPort = '3004'; // Port where your microservice is running

import express from 'express';

const app = express();
app.use(express.json());

const recipeData = {
    data: {
        ingredients: [
            { 
                id: 10011011,
                aisle: "Produce",
                image: "asparagus-white.jpg",
                consistency: "SOLID",
                name: "asparagus",
                nameClean: "white asparagus",
                original: "1 pound green or white asparagus, woody ends snapped off & discarded",
                originalName: "green or white asparagus, woody ends snapped off & discarded",
                amount: 1,
                unit: "pound" 
            },
            {
                id: 11819,
                aisle: "Produce",
                image: "red-chili.jpg",
                consistency: "SOLID",
                name: "chili pepper flakes",
                nameClean: "chili pepper",
                original: "1/2 teaspoon chili pepper flakes",
                originalName: "chili pepper flakes",
                amount: 0.5,
                unit: "teaspoon"
            },
            {
                id: 10311297,
                aisle: "Produce",
                image: "parsley.jpg",
                consistency: "SOLID",
                name: "flat leaf parsley",
                nameClean: "flat leaf parsley",
                original: "1 cup flat leaf parsley, lightly packed & rough chopped",
                originalName: "flat leaf parsley, lightly packed & rough chopped",
                amount: 1,
                unit: "cup"
            }
        ],
        currentServings: 4,
        desiredServings: 8
    }
};

// Function to test the /adjustServings endpoint
async function adjustServings(recipeData) {
    const url = `http://localhost:${microPort}/adjustServings`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipeData) // Convert the JavaScript object to a JSON string
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(`Adjust Servings Response:\n${JSON.stringify(data, null, 2)}`);
    } catch (error) {
        console.error('Error making the request:', error);
    }
}

// Call the function to test the endpoint
adjustServings(recipeData);
