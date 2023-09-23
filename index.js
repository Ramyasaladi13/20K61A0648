const express=require("express");
const app=express()
const port = 3000;
app.use(express.json());
app.get("/trains",async(req,res)=>{
    try {
        const trainData = [
            {
                tarinNumber: '12267',
                trainName: "MUMBAI CENTRAL - AHMEDABAD AC Duronto Exp",
                trainType: "Duronto",
                runDays: "M,T,W,T,F,S,S",
                departureTime: '23:25',
                seatsSleeper:  Math.floor(Math.random() * 151) + 50,
                priceSleeper: Math.floor(Math.random() * 1501) + 500,
                seatsAc: Math.floor(Math.random() * 151) + 50,
                priceAc: Math.floor(Math.random() * 1501) + 500,
            },
            {
                tarinNumber: '12268',
                trainName: "AHMEDABAD - MUMBAI CENT AC Duronto Exp",
                trainType: "Duronto",
                runDays: "M,T,W,T,F,S,S",
                departureTime: '23:40',
                seatsSleeper:  Math.floor(Math.random() * 151) + 50,
                priceSleeper: Math.floor(Math.random() * 1501) + 500,
                seatsAc: Math.floor(Math.random() * 151) + 50,
                priceAc: Math.floor(Math.random() * 1501) + 500,
            },
            {
                tarinNumber: '22201',
                trainName: "KOLKATA SEALDAM - PURI Duronto Express",
                trainType: "Duronto",
                runDays: "M,T,W,T,F,S,S",
                departureTime: '23:40',
                seatsSleeper:  Math.floor(Math.random() * 151) + 50,
                priceSleeper: Math.floor(Math.random() * 1501) + 500,
                seatsAc: Math.floor(Math.random() * 151) + 50,
                priceAc: Math.floor(Math.random() * 1501) + 500,
                
            }
        ];
        const currentTime = new Date();
        const twelveHoursLater = new Date(currentTime.getTime() + 12 * 60 * 60 * 1000);
        const filteredTrains = trainData.filter(train => {
            const departureTime = new Date(train.departureTime);
            return(
                currentTime.getTime() + 30 * 60 * 1000 < departureTime.getTime() &&
                departureTime.getTime() <= twelveHoursLater.getTime()
            );
        });
        const sortedTrains = filteredTrains.sort((a, b) => {
            if (a.priceSleeper !== b.priceSleeper) {
                return a.priceSleeper - b.priceSleeper;
            } else if (a.priceSleeper !== b.seatsSleeper){
              return b.seatsSleeper - a.seatsSleeper;
            } else {
              const aDepartureTime = new Date(a.departureTime).getHours();
              const bDepartureTime = new Date(b.departureTime).getHours();
              return bDepartureTime - aDepartureTime;
            }
        });
        res.json(sortedTrains);   
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }    
});
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
