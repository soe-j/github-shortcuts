chrome.commands.onCommand.addListener(async (command) => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  await chrome.tabs.sendMessage(tabs[0].id, { command });
});
