chrome.runtime.onMessage.addListener(async ({ command }) => {
  log("received command", command);

  switch (command) {
    case "edit-title":
      (await findElement('[aria-label="Edit Pull Request title"]')).click();
      (await findElement('[aria-label="Pull Request title"')).focus();
      break;
    case "edit-comment":
      (await findElement(".timeline-comment-actions"))
        .querySelector("summary")
        .click();
      (await findElement('[aria-label="Edit comment"]')).click();
      break;
    case "confirm":
      const readyButton = document
        .querySelector(
          `form[action="${document.location.pathname}/ready_for_review"]`
        )
        ?.querySelector('button[type="submit"]');
      if (readyButton) {
        readyButton.click();
        break;
      }
      const mergeButton = findElementByContent("Confirm merge");
      if (mergeButton) {
        mergeButton.click();
        break;
      }
      log("no confirm button found");
      break;
    case "change-tab":
      if (document.location.pathname.match(/^(\/.+\/.+\/pull\/\d+)$/)) {
        (
          await findElement(`a[href="${document.location.pathname}/files"]`)
        ).click();
      } else {
        (
          await findElement(
            `a[href="${document.location.pathname.replace(
              /(\/.+\/.+\/pull\/\d+)(\/.+)/,
              "$1"
            )}"]`
          )
        ).click();
      }
      break;

    default: {
      log("unknown command", command);
    }
  }
});

const log = (...args) => console.log("[Github Shortcuts]", ...args);
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const findElement = async (selector) => {
  while (!document.querySelector(selector)) {
    log("waiting for element", selector);
    await wait(100);
  }
  log("found element", selector);
  return document.querySelector(selector);
};
const findElementByContent = (content) => {
  for (const e of document.querySelectorAll("button").values()) {
    if (e.innerText.match(content)) {
      return e;
    }
  }
};
