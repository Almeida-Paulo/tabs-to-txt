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
      ? (urls.length === 1 ? "1 URL ready to open." : urls.length + " URLs ready to open.")
      : "No valid HTTP or HTTPS URLs found.";
    if (skipped > 0) statusMessage.textContent += " Skipped entries (" + skipped + ").";
  } catch {
    statusMessage.textContent = "Unable to read the TXT file. Select the file again.";
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
    if (!importTab) throw new Error("Import page has no associated browser tab.");

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
    statusMessage.textContent = opened === 1 ? "1 tab opened." : opened + " tabs opened.";
    if (failed.length > 0) {
      statusMessage.textContent += " Unopened URLs (" + failed.length + "). Use Open tabs to retry.";
    } else {
      fileInput.value = "";
    }
  } catch {
    statusMessage.textContent = "Browser window unavailable. Reopen Import TXT from the extension.";
  } finally {
    fileInput.disabled = false;
    openButton.disabled = pendingUrls.length === 0;
  }
});
