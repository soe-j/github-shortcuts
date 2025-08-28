const log = (...args) => console.log("[Github Shortcuts Background]", ...args);

chrome.commands.onCommand.addListener(async (command) => {
  log("received command", command);
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  log("active tab", tabs[0]);
  await chrome.tabs.sendMessage(tabs[0].id, { command });
});
