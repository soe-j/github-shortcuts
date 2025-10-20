const log = (...args) => console.log("[Github Shortcuts Background]", ...args);

chrome.commands.onCommand.addListener(async (command) => {
  log("received command", command);
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  log("active tab", tabs[0]);

  if (
    !tabs[0] ||
    !/^https:\/\/github\.com\/[^\/]+\/[^\/]+\/pull\/\d+/.test(tabs[0].url)
  ) {
    log("no active github pull request tab found");
    return;
  }

  await chrome.tabs.sendMessage(tabs[0].id, { command });
});
