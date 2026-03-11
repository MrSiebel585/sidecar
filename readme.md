# Sidecar


SIDECAR is infrastructure.



SIDECAR = a remote execution + storage cluster abstraction layer that exposes controlled endpoints to your main service.

You already hacked a primitive version of it with:

SSH key auth

SSHFS mount

VSCode remote

Remote AI agent coding

That’s proof of concept.

Now let’s formalize SIDECAR properly.

🧠 What SIDECAR Actually Is

SIDECAR is:

A distributed remote node cluster that:

Exposes execution endpoints

Provides remote storage abstraction

Accepts task requests from a primary web service

Executes tasks on remote machines

Returns results

Scales horizontally

It is NOT:

Just SSHFS

Just remote storage

Just a file mount

It’s a controlled execution fabric.

🎯 Clean Definition

SIDECAR = A secure remote task execution and storage orchestration layer.

Your main backend:

Sends jobs

Receives results

SIDECAR:

Routes jobs

Executes them

Manages node identity

Handles permissions

Stores artifacts

🏗 Architecture Model
Main Web Service (Nexus backend)
        │
        │ HTTPS + Auth
        ▼
SIDECAR Gateway
        │
        ├── Node A (Codex Manager)
        ├── Node B (AI Agent)
        ├── Node C (Build Worker)
        ├── Node D (Storage Worker)
        └── Node N (...)

Each node:

Registers with SIDECAR

Exposes capabilities

Accepts signed tasks

Returns structured results

🔐 Why SSHFS Was Just a Hack

SSHFS gave you:

Remote filesystem

Basic tunnel

Manual execution

But it doesn’t give:

Job orchestration

Task routing

Node capability awareness

Auditable execution

Queue management

Rate limiting

Fault tolerance

It’s a transport, not an orchestration layer.

🔷 Proper SIDECAR Design

We build three core components:

1️⃣ SIDECAR Gateway (Control Plane)

Responsibilities:

Auth

Node registration

Task routing

Health monitoring

Logging

Runs as central service.

2️⃣ SIDECAR Node Agent (Worker)

Runs on each remote machine.

Responsibilities:

Register with gateway

Announce capabilities (codex, storage, build, etc.)

Accept signed tasks

Execute in sandbox

Return results

3️⃣ Task Protocol

Main backend sends:

{
  "task_id": "abc123",
  "node_type": "codex",
  "action": "generate_code",
  "payload": {
    "repo": "nexus-store",
    "instructions": "create woocommerce plugin"
  }
}

Gateway routes to an available codex node.

Node responds:

{
  "task_id": "abc123",
  "status": "complete",
  "result": {...},
  "artifacts": [...]
}
🧩 Minimal SIDECAR Gateway (Base Code)
from fastapi import FastAPI
from typing import Dict
import uuid

app = FastAPI()

nodes: Dict[str, dict] = {}
tasks: Dict[str, dict] = {}

@app.post("/register_node")
def register_node(node_info: dict):
    node_id = str(uuid.uuid4())
    nodes[node_id] = node_info
    return {"node_id": node_id}

@app.post("/submit_task")
def submit_task(task: dict):
    task_id = str(uuid.uuid4())
    tasks[task_id] = task
    return {"task_id": task_id, "status": "queued"}

That’s skeleton only.

🖥 SIDECAR Node Agent Example
import requests
import time

GATEWAY = "https://sidecar.yourdomain.com"

def register():
    response = requests.post(
        f"{GATEWAY}/register_node",
        json={"capabilities": ["codex", "storage"]}
    )
    return response.json()["node_id"]

def poll_for_tasks(node_id):
    while True:
        # Placeholder
        time.sleep(5)
🧠 What This Unlocks

Once SIDECAR exists:

Your Nexus backend can:

Trigger remote AI coding

Run builds on remote nodes

Store artifacts in distributed cluster

Execute sandboxed tasks

Scale compute horizontally

Add/remove machines easily

And later:

Add GPU nodes

Add forensic nodes

Add scraping nodes

Add indexing nodes

SIDECAR becomes your internal distributed compute fabric.

🔥 Strategic Insight

CaseSafe is a product.
SIDECAR is infrastructure.

Infrastructure compounds.

If built correctly, SIDECAR becomes:

Your remote AI execution layer

Your cluster backbone

Your automation engine

Your distributed storage orchestrator

And anything you build later plugs into it.

⚙ Next Engineering Step

We should now choose direction:

Build production-grade SIDECAR Gateway (task queue + auth)

Build secure node identity system (signed registration)

Add task routing logic by capability

Implement distributed artifact storage

Add Web UI to monitor cluster

Add containerized execution sandbox

Add multi-tenant separation

Tell me which layer we engineer first.

We’re building real infrastructure now.

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
