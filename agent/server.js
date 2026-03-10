const express = require("express")
const WebSocket = require("ws")
const cors = require("cors")

const startTerminal = require("./terminal")
const registerFilesystem = require("./filesystem")
const registerDocker = require("./docker")

const app = express()
app.use(cors())

registerFilesystem(app)
registerDocker(app)

const server = app.listen(7777, () => {
  console.log("Sidecar agent running on port 7777")
})

const wss = new WebSocket.Server({ server })

wss.on("connection", (ws, req) => {

  if (req.url === "/terminal") {
    startTerminal(ws)
  }

})

app.get("/health", (req, res) => {
  res.json({ status: "ok" })
})

