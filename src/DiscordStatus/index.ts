type Status = "online" | "invisible" | "dnd" | "idle";

module.exports = (Plugin, Library) => {

  const { Logger } = Library;

  const StatusSetting = BdApi.findModuleByProps("StatusSetting").StatusSetting;

  return class DiscordStatus extends Plugin {
    private closeBtn: HTMLButtonElement;

    onStart(): void {
      if (currentStatus() !== "online") {
        updateStatus("online");
      }

      log_debug(document.getElementsByClassName("winButtonClose-3Q8ZH5").length)
      this.closeBtn = document.getElementsByClassName("winButtonClose-3Q8ZH5")[0] as HTMLButtonElement;
      this.closeBtn.addEventListener("click", invis);
    }

    onStop(): void {
      removeListener(this.closeBtn, "click", invis);
      invis();
    }
  }

  function removeListener(el: Element, event: string, fun: EventListenerOrEventListenerObject): void {
    el.removeEventListener(event, fun)
  }

  function invis() {
    if (currentStatus() !== "invisible") {
      updateStatus("invisible");
    }
  }

  function currentStatus(): Status {
    return StatusSetting.getSetting();
  }

  function log_debug(message: { toString: () => string }): void {
    Logger.log(message.toString());
  }

  function updateStatus(toStatus: Status): void {
    log_debug("Changing status to: " + toStatus);
    StatusSetting.updateSetting(toStatus);
  }
};