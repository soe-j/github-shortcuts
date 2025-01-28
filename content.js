chrome.runtime.onMessage.addListener(async ({ command }) => {
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
    case "ready-for-review":
      (
        await findElement(
          `form[action="${document.location.pathname}/ready_for_review"]`
        )
      )
        .querySelector('button[type="submit"]')
        .click();
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
  }
});

const log = (...args) => console.log("[Github Shortcuts]", ...args);
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const findElement = async (selector) => {
  while (!document.querySelector(selector)) {
    log("waiting for element", selector);
    await wait(100);
  }
  return document.querySelector(selector);
};
