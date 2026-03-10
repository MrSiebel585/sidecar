Below is a clean base code starter for Project Sidecar so you can begin development immediately.
This is a minimal working foundation that includes:

Sidecar Agent

Terminal WebSocket

Filesystem API

Docker container API

Workspace UI

Movable windows

Browser terminal

This is intentionally simple so you can extend it easily.

1. Project Structure

Create this structure:

sidecar
│
├ agent
│   ├ package.json
│   ├ server.js
│   ├ terminal.js
│   ├ filesystem.js
│   └ docker.js
│
└ workspace
    ├ package.json
    ├ pages
    │   └ index.js
    └ components
        ├ Window.js
        └ Terminal.js
2. Agent Setup
agent/package.json
{
  "name": "sidecar-agent",
  "version": "0.1.0",
  "main": "server.js",
  "dependencies": {
    "express": "^4.19.2",
    "ws": "^8.16.0",
    "cors": "^2.8.5",
    "node-pty": "^1.0.0",
    "dockerode": "^3.3.5"
  }
}

Install dependencies:

cd agent
npm install
3. Agent Terminal Module
agent/terminal.js
const pty = require("node-pty")

function startTerminal(ws) {

  const shell = pty.spawn("bash", [], {
    name: "xterm-color",
    cols: 80,
    rows: 30,
    cwd: process.env.HOME,
    env: process.env
  })

  shell.onData(data => ws.send(data))

  ws.on("message", msg => {
    shell.write(msg)
  })

}

module.exports = startTerminal
4. Filesystem API
agent/filesystem.js
const fs = require("fs")

function registerFilesystem(app) {

  app.get("/fs/list", async (req, res) => {

    const dir = req.query.dir || process.cwd()

    try {

      const files = await fs.promises.readdir(dir, { withFileTypes: true })

      res.json(
        files.map(f => ({
          name: f.name,
          type: f.isDirectory() ? "dir" : "file"
        }))
      )

    } catch (err) {

      res.status(500).json({ error: err.message })

    }

  })

}

module.exports = registerFilesystem
5. Docker API
agent/docker.js
const Docker = require("dockerode")
const docker = new Docker()

function registerDocker(app) {

  app.get("/docker/containers", async (req, res) => {

    try {

      const containers = await docker.listContainers()

      res.json(containers)

    } catch (err) {

      res.status(500).json({ error: err.message })

    }

  })

}

module.exports = registerDocker
6. Agent Server
agent/server.js
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

Run the agent:

node server.js
7. Workspace UI

Create the workspace using Next.js.

npx create-next-app workspace
cd workspace
npm install xterm react-rnd
8. Window Component
workspace/components/Window.js
import { Rnd } from "react-rnd"

export default function Window({ children }) {

  return (

    <Rnd
      default={{
        x: 100,
        y: 100,
        width: 600,
        height: 400
      }}
    >

      <div style={{
        background: "#1e1e1e",
        height: "100%",
        color: "white"
      }}>
        {children}
      </div>

    </Rnd>

  )

}
9. Terminal UI
workspace/components/Terminal.js
import { useEffect, useRef } from "react"
import { Terminal } from "xterm"
import "xterm/css/xterm.css"

export default function TerminalApp() {

  const ref = useRef()

  useEffect(() => {

    const term = new Terminal()

    term.open(ref.current)

    const ws = new WebSocket("ws://localhost:7777/terminal")

    ws.onmessage = e => term.write(e.data)

    term.onData(data => ws.send(data))

  }, [])

  return <div ref={ref} style={{ height: "100%" }} />

}
10. Workspace Page
workspace/pages/index.js
import Window from "../components/Window"
import TerminalApp from "../components/Terminal"

export default function Home() {

  return (

    <div style={{
      height: "100vh",
      background: "#0f172a"
    }}>

      <Window>
        <TerminalApp />
      </Window>

    </div>

  )

}
11. Start the Workspace
cd workspace
npm run dev

Open:

http://localhost:3000

You should see a movable window containing a working terminal connected to your machine.

What You Now Have

Working components:

Sidecar Agent
 ├ Terminal WebSocket
 ├ Filesystem API
 ├ Docker API
 └ Health endpoint

Workspace
 ├ Window manager
 └ Browser terminal

This is a functional base for Sidecar development.

Recommended Next Features

The next pieces to implement are:

File Explorer UI
Docker dashboard
Live log streaming
Multi-machine connections

Once those are added, Sidecar becomes a real server management workspace.