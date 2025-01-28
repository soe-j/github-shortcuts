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
