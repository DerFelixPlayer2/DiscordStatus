type Status = "online" | "invisible" | "dnd" | "idle";

module.exports = (Plugin, Library) => {

  const { Logger } = Library;

  const StatusSetting = BdApi.findModuleByProps("StatusSetting").StatusSetting;

  return class DiscordStatus extends Plugin {
    onStart(): void {
      if (this.currentStatus() !== "online") {
        this.updateStatus("online");
      }
      this.log_debug("Started");
    }

    onStop(): void {
      if (this.currentStatus() !== "invisible") {
        this.updateStatus("invisible");
      }
      this.log_debug("Stopped");
    }

    private currentStatus(): Status {
      return StatusSetting.getSetting();
    }

    private log_debug(message: string): void {
      Logger.log(message);
    }

    private updateStatus(toStatus: Status): void {
      this.log_debug("Changing status to: " + toStatus);
      StatusSetting.updateSetting(toStatus);
    }
  }
};