"use client"

import { useEffect, useRef, useState } from "react"
import { Terminal } from "xterm"
import { FitAddon } from "xterm-addon-fit"
import "xterm/css/xterm.css"

export default function TerminalApp({ agentUrl = "http://localhost:7777" }) {
  const ref = useRef(null)
  const [status, setStatus] = useState("connecting")
  const termRef = useRef(null)
  const wsRef = useRef(null)

  useEffect(() => {
    if (!ref.current) return

    const term = new Terminal({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
      theme: {
        background: "#1e1e1e",
        foreground: "#d4d4d4",
        cursor: "#ffffff",
        selection: "#264f78",
        black: "#000000",
        red: "#cd3131",
        green: "#0dbc79",
        yellow: "#e5e510",
        blue: "#2472c8",
        magenta: "#bc3fbc",
        cyan: "#11a8cd",
        white: "#e5e5e5",
        brightBlack: "#666666",
        brightRed: "#f14c4c",
        brightGreen: "#23d18b",
        brightYellow: "#f5f543",
        brightBlue: "#3b8eea",
        brightMagenta: "#d670d6",
        brightCyan: "#29b8db",
        brightWhite: "#e5e5e5"
      }
    })

    const fitAddon = new FitAddon()
    term.loadAddon(fitAddon)

    term.open(ref.current)
    fitAddon.fit()

    termRef.current = term

    setStatus("connected")
    term.writeln("\x1b[36mSidecar Terminal Connected\x1b[0m")
    term.writeln("")

    const ws = new WebSocket(`ws://localhost:7777/terminal`)

    ws.onopen = () => {
      setStatus("connected")
      term.writeln("\x1b[32mConnected to agent\x1b[0m\r\n")
    }

    ws.onmessage = (e) => {
      term.write(e.data)
    }

    ws.onerror = (e) => {
      setStatus("error")
      term.writeln("\x1b[31mWebSocket error\x1b[0m")
    }

    ws.onclose = () => {
      setStatus("disconnected")
      term.writeln("\x1b[33mDisconnected from agent\x1b[0m")
    }

    wsRef.current = ws

    term.onData((data) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(data)
      }
    })

    // Handle resize
    const handleResize = () => {
      fitAddon.fit()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      ws.close()
      term.dispose()
    }
  }, [])

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{
        padding: "4px 8px",
        background: "#252526",
        fontSize: "11px",
        color: status === "connected" ? "#4ec9b0" : status === "error" ? "#f14c4c" : "#dcdcaa",
        borderBottom: "1px solid #3d3d3d"
      }}>
        Terminal • {status}
      </div>
      <div ref={ref} style={{ flex: 1, padding: "4px" }} />
    </div>
  )
}

