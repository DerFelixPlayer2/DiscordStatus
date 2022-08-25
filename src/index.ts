module.exports = (Plugin, Library) => {

  const { Logger, Patcher } = Library;

  return class DiscordStatus extends Plugin {
    onStart() {
      Logger.log("Started");
    }

    onStop() {
      Logger.log("Stopped");
      Patcher.unpatchAll();
    }
  }
};