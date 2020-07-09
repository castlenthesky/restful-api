import config from "./config";
import applicationLoaders from "./loaders";

async function startServer() {
  const { app } = await applicationLoaders();
  app.listen(config.app.port, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.info(`Server listening on port ${config.app.port}`);
  });
}

startServer();
