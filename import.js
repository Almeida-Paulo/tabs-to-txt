const extensionApi = globalThis.browser ?? globalThis.chrome;
const importForm = document.getElementById("import-form");
const fileInput = document.getElementById("txt-file");
const openButton = document.getElementById("open-tabs");
const statusMessage = document.getElementById("status");
let pendingUrls = [];

function readLinks(text) {
  const urls = [];
  let skipped = 0;

  for (const line of text.split(/\r\n?|\n/)) {
    const value = line.trim();
    if (!value) continue;

    if (!/^https?:\/\//i.test(value)) {
      skipped++;
      continue;
    }

    try {
      urls.push(new URL(value).href);
    } catch {
      skipped++;
    }
  }

  return { urls, skipped };
}

fileInput.addEventListener("change", async () => {
  pendingUrls = [];
  openButton.disabled = true;
  statusMessage.textContent = "";
  const file = fileInput.files[0];
  if (!file) return;

  fileInput.disabled = true;
  try {
    const { urls, skipped } = readLinks(await file.text());
    pendingUrls = urls;
    statusMessage.textContent = urls.length > 0
      ? (urls.length === 1 ? "1 link ready to open." : urls.length + " links ready to open.")
      : "The file has no valid HTTP or HTTPS links.";
    if (skipped > 0) statusMessage.textContent += " Skipped lines: " + skipped + ".";
  } catch {
    statusMessage.textContent = "Could not read the file. Select the TXT file again.";
    fileInput.value = "";
  } finally {
    fileInput.disabled = false;
    openButton.disabled = pendingUrls.length === 0;
  }
});

importForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (openButton.disabled) return;

  fileInput.disabled = true;
  openButton.disabled = true;
  statusMessage.textContent = "Opening tabs…";

  try {
    const importTab = await extensionApi.tabs.getCurrent();
    if (!importTab) throw new Error("The import page is not open in a tab.");

    let index = importTab.index + 1;
    let opened = 0;
    const failed = [];

    for (const url of pendingUrls) {
      try {
        await extensionApi.tabs.create({ url, windowId: importTab.windowId, index, active: false });
        index++;
        opened++;
      } catch {
        failed.push(url);
      }
    }

    pendingUrls = failed;
    statusMessage.textContent = opened === 1 ? "Opened 1 tab." : "Opened " + opened + " tabs.";
    if (failed.length > 0) {
      statusMessage.textContent += " Links that could not be opened: " + failed.length + ". Click Open tabs to try those links again.";
    } else {
      fileInput.value = "";
    }
  } catch {
    statusMessage.textContent = "Could not find this tab's window. Reopen the import page from the extension icon.";
  } finally {
    fileInput.disabled = false;
    openButton.disabled = pendingUrls.length === 0;
  }
});
