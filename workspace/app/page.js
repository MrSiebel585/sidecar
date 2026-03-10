"use client"

import { useState, useEffect } from "react"
import Window from "../components/Window"
import Terminal from "../components/Terminal"

export default function Home() {
  const [containers, setContainers] = useState([])
  const [files, setFiles] = useState([])
  const [currentPath, setCurrentPath] = useState("/")
  const [activeTab, setActiveTab] = useState("terminal")

  useEffect(() => {
    // Fetch Docker containers
    fetch("http://localhost:7777/docker/containers")
      .then(res => res.json())
      .then(data => setContainers(data || []))
      .catch(() => setContainers([]))

    // Fetch initial files
    fetchFiles("/")
  }, [])

  const fetchFiles = (path) => {
    fetch(`http://localhost:7777/fs/list?dir=${encodeURIComponent(path)}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setFiles(data)
          setCurrentPath(path)
        }
      })
      .catch(() => setFiles([]))
  }

  const navigateTo = (item) => {
    if (item.type === "dir") {
      const newPath = currentPath === "/" 
        ? `/${item.name}` 
        : `${currentPath}/${item.name}`
      fetchFiles(newPath)
    }
  }

  const goUp = () => {
    if (currentPath === "/") return
    const parts = currentPath.split("/").filter(Boolean)
    parts.pop()
    const newPath = parts.length === 0 ? "/" : "/" + parts.join("/")
    fetchFiles(newPath)
  }

  return (
    <div style={{
      height: "100vh",
      background: "#0f172a",
      display: "flex",
      flexDirection: "column"
    }}>
      {/* Header */}
      <header style={{
        background: "#1e293b",
        padding: "12px 20px",
        borderBottom: "1px solid #334155",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <h1 style={{ margin: 0, fontSize: "20px", color: "#38bdf8", fontWeight: "600" }}>
            🚀 Sidecar
          </h1>
          <span style={{ color: "#64748b", fontSize: "13px" }}>Developer Workspace</span>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <span style={{ color: "#22c55e", fontSize: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e" }} />
            Agent: localhost:7777
          </span>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        
        {/* Terminal Window */}
        <Window title="Terminal" defaultX={50} defaultY={50} defaultWidth={700} defaultHeight={450}>
          <Terminal />
        </Window>

        {/* Docker Window */}
        <Window title="Docker Containers" defaultX={800} defaultY={50} defaultWidth={500} defaultHeight={350}>
          <div style={{ padding: "12px", height: "100%", overflow: "auto" }}>
            <h3 style={{ margin: "0 0 12px 0", color: "#d4d4d4", fontSize: "14px" }}>Running Containers</h3>
            {containers.length === 0 ? (
              <p style={{ color: "#6b7280", fontSize: "13px" }}>No containers found or Docker not available</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {containers.map((c, i) => (
                  <div key={i} style={{
                    background: "#2d2d2d",
                    padding: "10px 12px",
                    borderRadius: "6px",
                    border: "1px solid #3d3d3d"
                  }}>
                    <div style={{ fontWeight: "500", color: "#4ec9b0", fontSize: "13px" }}>
                      {c.Names?.[0]?.replace(/^\//, "") || "unnamed"}
                    </div>
                    <div style={{ fontSize: "11px", color: "#6b7280", marginTop: "4px" }}>
                      {c.Image} • {c.State}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Window>

        {/* File Explorer Window */}
        <Window title={`Files: ${currentPath}`} defaultX={50} defaultY={520} defaultWidth={500} defaultHeight={350}>
          <div style={{ padding: "12px", height: "100%", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
              <button 
                onClick={goUp}
                style={{
                  background: "#3b82f6",
                  border: "none",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "12px"
                }}
              >
                ↑ Up
              </button>
              <button 
                onClick={() => fetchFiles("/")}
                style={{
                  background: "#374151",
                  border: "none",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "12px"
                }}
              >
                / Root
              </button>
            </div>
            <div style={{ flex: 1, overflow: "auto" }}>
              {files.length === 0 ? (
                <p style={{ color: "#6b7280", fontSize: "13px" }}>Loading...</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  {files.map((f, i) => (
                    <div 
                      key={i}
                      onClick={() => navigateTo(f)}
                      style={{
                        padding: "8px 12px",
                        cursor: "pointer",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "13px",
                        color: f.type === "dir" ? "#4ec9b0" : "#d4d4d4",
                        background: "transparent"
                      }}
                      onMouseEnter={(e) => e.target.style.background = "#2d2d2d"}
                      onMouseLeave={(e) => e.target.style.background = "transparent"}
                    >
                      <span>{f.type === "dir" ? "📁" : "📄"}</span>
                      <span>{f.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Window>

      </div>
    </div>
  )
}

