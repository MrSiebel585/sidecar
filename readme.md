# Sidecar

Open the workspace:


http://localhost:3000


You should now see the Sidecar interface with:


Terminal
Files
Docker
Logs


---

# Using the CLI

Sidecar includes a simple CLI.

Start the agent:


sidecar start


Future CLI commands will include:


sidecar start
sidecar stop
sidecar machines
sidecar join


---

# Multi-Machine Support

Sidecar can connect to multiple machines running the agent.

Example workspace:


Machines
├ Local Machine
├ Dev Server
├ Production Server
└ Raspberry Pi Lab


Switching machines updates all workspace apps.

---

# Example API Endpoints

Filesystem:


GET /fs/list?dir=/path


Docker containers:


GET /docker/containers


Log streaming:


ws://server:7777/logs?file=/var/log/syslog


Health endpoint:


GET /health


---

# Development

### Agent Dependencies


express
ws
node-pty
dockerode
cors


### Workspace Dependencies


next.js
react
xterm.js
react-rnd
zustand


Run development servers separately:


Agent: localhost:7777
Workspace: localhost:3000


---

# Roadmap

## Phase 1 — Core Server Control


Terminal
Files
Docker viewer
Live logs


## Phase 2 — Infrastructure Tools


Docker container controls
Service discovery
Port monitoring
Database explorers


## Phase 3 — Platform Features


Plugin system
Team workspaces
Machine networking
AI developer agent


---

# Long-Term Vision

Sidecar aims to become:


The control panel for all developer machines.


Instead of managing infrastructure through:


SSH
Cloud dashboards
Multiple terminals


Developers manage everything from one workspace.

---

# Contributing

Contributions are welcome.

To contribute:


Fork the repository
Create a feature branch
Submit a pull request


Areas that need help:


UI improvements
Docker integrations
File explorer features
Plugin system
Security and authentication


---

# License

MIT License

---

# Acknowledgments

Sidecar builds on several excellent open source tools:


xterm.js
node-pty
dockerode
react-rnd
Next.js


These libraries make rapid development of developer tools possible.

---

**Sidecar is an open experiment in building a developer workspace for infrastructure.**