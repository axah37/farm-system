import Express from "express";
import cors from "cors"
import { createConnection, getConnection } from "./db";
import taskRoute from "./routes/taskRoute";

const app = Express()
const port = process.env.PORT || "3000"

app.use(cors())
app.use(Express.json());
app.use(taskRoute)

createConnection()

app.listen(port, () => {
	console.log(`Listening to request on http://localhost:${port}`)
})