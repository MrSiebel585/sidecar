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

