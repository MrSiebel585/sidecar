"use client"

import { Rnd } from "react-rnd"

export default function Window({ children, title, defaultX = 100, defaultY = 100, defaultWidth = 600, defaultHeight = 400 }) {

  return (
    <Rnd
      default={{
        x: defaultX,
        y: defaultY,
        width: defaultWidth,
        height: defaultHeight
      }}
      minWidth={300}
      minHeight={200}
    >
      <div style={{
        background: "#1e1e1e",
        height: "100%",
        color: "white",
        display: "flex",
        flexDirection: "column",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)"
      }}>
        <div style={{
          background: "#2d2d2d",
          padding: "8px 12px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          borderBottom: "1px solid #3d3d3d",
          cursor: "move"
        }}>
          <div style={{ display: "flex", gap: "6px" }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ff5f56" }} />
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ffbd2e" }} />
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#27c93f" }} />
          </div>
          <span style={{ fontSize: "13px", color: "#888", marginLeft: "8px" }}>{title || "Window"}</span>
        </div>
        <div style={{ flex: 1, overflow: "auto" }}>
          {children}
        </div>
      </div>
    </Rnd>
  )
}

