import express from 'express'
import mongoose from 'mongoose';
import axios from 'axios'
import cors from 'cors'
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
dotenv.config();
import router from './Routes/AuthRoute.js'
import cookieParser from 'cookie-parser';

const app = express()

const { MONGO_URL, PORT } = process.env;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

let company;
let filters;

app.listen(PORT,()=>{
    console.log("server running on port " + PORT);
})
app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );
// app.use(bodyParser.json())
app.use(cookieParser());
//app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use('/', router)
// app.post("/screener",(req,res)=>{
//     console.log("aa");
//     console.log(req.body);
//     filters = req.body
// })
// app.get("/screener",async (req,res)=>{
//     try {
//         const url = `https://financialmodelingprep.com/api/v3/stock-screener?apikey=A1dOsl0ugaT1uVHZadDHIhVNiocDcIyL&country=${encodeURIComponent(filters.country)}&dividendMoreThan=${encodeURIComponent(filters.dividendMoreThan)}&marketCapMoreThan=${encodeURIComponent(filters.marketCapMoreThan)}&sector=${encodeURIComponent(filters.sector)}&priceLowerThan=${filters.priceLowerThan}`
//         const resp = await axios.get(url)
//         const result = resp.data
//         console.log(url);
//         res.json(result)
//     } catch (error) {
//         res.send(error)
//         console.error(error)
//     }
//     // res.send("aa")
// })
// app.post("/financials", (req,res)=>{
//     console.log("fa",req.body.name)
//     company = req.body.name;
// })
// app.get("/financials", async (req, res) => {
//     console.log("GET route starting");
//     try {
//       const response = await axios.get(`https://financialmodelingprep.com/api/v3/financial-statement-full-as-reported/${company}?period=annual&limit=50&apikey=A1dOsl0ugaT1uVHZadDHIhVNiocDcIyL`);
//       const result = response.data;
//       console.log('result');
        
//       res.json(result); // Send the data to the client
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     } finally {
//       console.log("GET route completed");
//     }
// });

// app.get("/qualitative", async (req,res)=>{
//     try {
//        const response1 = await axios.get(`https://api.stockdata.org/v1/news/all?symbols=${company}&
//        filter_entities=true&language=en&api_token=EOvvecDOC2k8oiMxRg7uI6z2E0aRQjf3os0fgyIp`)
//        const result1 = response1.data
//        res.json(result1)
//     } catch (error) {
//         console.error(error);
//     }
// })

// app.get("/historical", async (req,res)=>{
//     try {
//         const response2 = await axios.get(`https://api.datajockey.io/v0/company/financials?apikey=b94331b1d213992dc89568b2fda0d80cb9f6e06fba1d35f065ef&ticker=${company}`)
//         const result2 = response2.data
//         res.json(result2)
//     } catch(err) {
//         console.error(err);
//     }
// })

// app.get("/DCF", async (req,res) => {
//     try {
//         const resp = await axios.get(`https://financialmodelingprep.com/api/v3/discounted-cash-flow/${company}?apikey=A1dOsl0ugaT1uVHZadDHIhVNiocDcIyL`)
//         const result = resp.data
//         res.json(result)
//     } catch (error) {
//         console.error(error);
//     }
// })

// app.get("/recommendations", async(req,res) => {
//     try {
//         const response = await axios.get(`https://financialmodelingprep.com/api/v3/historical-rating/${company}?apikey=A1dOsl0ugaT1uVHZadDHIhVNiocDcIyL`)
//         const result = await response.data
//         res.json(result)
//     } catch (error) {
//         console.error(error);
//     }
// })


