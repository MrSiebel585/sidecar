export const metadata = {
  title: "Sidecar - Developer Workspace",
  description: "A developer workspace for infrastructure management",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, overflow: "hidden" }}>{children}</body>
    </html>
  )
}

