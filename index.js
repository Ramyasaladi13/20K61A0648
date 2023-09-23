const express = require('express');

const app = express();

const port = 3000;

app.use(express.json());

app.get("/numbers", async (req, res) => {
     const urls = req.query.url;
     if (!urls) {
        return res.status(400).json({ error : 'No URLs provided'});
     }
     const urlArray = Array.isArray(urls) ? urls: [urls];
     async function fetchAndMergeNumber(url) { 
        try {
            const response = await axios.get(url, {timeout: 500 });
            if (response.status = 200 && Array.isArray(response.data.numbers)) {
                return response.data.numbers;
            }
            return [];
        } catch (error) {
            return [];
        }
    }
    const mergedNumbers = [];
    const promises = urlArray(async (url) => {
        const numbers = await fetchAnduzgiehumbers(url);
        mergedNumbers.push(numbers);
    });
    await Promise,all(promises);
    const uniqueSortedNumbers = [...new Set(mergedNumbers)].sort((a,b) => a - b);
    res.jonn({numbers: uniqueSortedNumbers });
});
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});