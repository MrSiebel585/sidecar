const { exec } = require("child_process")
const { spawn } = require("child_process")

function startTerminal(ws) {

  // Spawn a shell process
  const shell = spawn("bash", [], {
    cwd: process.env.HOME || process.cwd(),
    env: { ...process.env, TERM: "xterm-256color" },
    shell: true
  })

  // Send output to WebSocket client
  shell.stdout.on("data", (data) => {
    ws.send(data.toString())
  })

  shell.stderr.on("data", (data) => {
    ws.send(data.toString())
  })

  // Handle incoming commands from WebSocket
  ws.on("message", (msg) => {
    const command = msg.toString()
    if (command) {
      shell.stdin.write(command + "\n")
    }
  })

  // Handle shell exit
  shell.on("close", (code) => {
    ws.send(`\r\n\x1b[33mShell exited with code ${code}\x1b[0m\r\n`)
  })

}

module.exports = startTerminal

