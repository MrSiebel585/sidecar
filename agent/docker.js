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

