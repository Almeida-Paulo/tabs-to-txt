const extensionApi = globalThis.browser ?? globalThis.chrome;
const statusMessage = document.getElementById("status");
const tabPicker = document.getElementById("tab-picker");
const tabOptions = document.getElementById("tab-options");
const exportForm = document.getElementById("export-form");
const fileNameInput = document.getElementById("file-name");
const downloadLink = document.getElementById("download");
const importButton = document.getElementById("import-button");
const importStatus = document.getElementById("import-status");

tabOptions.addEventListener("change", updateSelection);

fileNameInput.addEventListener("input", () => {
  fileNameInput.setCustomValidity("");
});

exportForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = fileNameInput.value.trim();
  const firstPart = name.split(".", 1)[0].trimEnd();
  const reservedName = /^(?:con|prn|aux|nul|com[1-9¹²³]|lpt[1-9¹²³])$/i;

  if (!name || /^\.txt$/i.test(name) || /[<>:"/\\|?*\x00-\x1f]/.test(name)
    || name.endsWith(".") || reservedName.test(firstPart)) {
    fileNameInput.setCustomValidity("Invalid file name. Use a name supported by Windows.");
    fileNameInput.reportValidity();
    return;
  }

  downloadLink.download = /\.txt$/i.test(name) ? name : name + ".txt";
  downloadLink.click();
});

importButton.addEventListener("click", async () => {
  importButton.disabled = true;
  importStatus.textContent = "";
  try {
    await extensionApi.tabs.create({ url: extensionApi.runtime.getURL("import.html") });
  } catch {
    importStatus.textContent = "Unable to open the import page.";
  } finally {
    importButton.disabled = false;
  }
});

function updateSelection() {
  const checkedTabs = [...tabOptions.querySelectorAll("input:checked")];
  const urls = checkedTabs.map((checkbox) => checkbox.value).filter(Boolean);

  if (downloadLink.href) {
    URL.revokeObjectURL(downloadLink.href);
    downloadLink.removeAttribute("href");
  }
  exportForm.hidden = urls.length === 0;

  if (urls.length === 0) {
    statusMessage.textContent = "No exportable tabs selected.";
    return;
  }

  const textFile = new Blob([urls.join("\r\n") + "\r\n"], {
    type: "text/plain;charset=utf-8",
  });
  downloadLink.href = URL.createObjectURL(textFile);

  const missingCount = checkedTabs.length - urls.length;
  statusMessage.textContent = urls.length === 1
    ? "1 URL selected."
    : `${urls.length} URLs selected.`;

  if (missingCount > 0) {
    statusMessage.textContent += ` Unavailable URLs (${missingCount}).`;
  }
}

async function loadTabs() {
  const tabs = (await extensionApi.tabs.query({ currentWindow: true }))
    .filter((tab) => !tab.hidden)
    .sort((first, second) => first.index - second.index);
  const hasHighlightedTabs = tabs.some((tab) => tab.highlighted);

  for (const tab of tabs) {
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    const title = document.createElement("span");
    checkbox.type = "checkbox";
    checkbox.value = tab.url || tab.pendingUrl || "";
    checkbox.checked = Boolean(hasHighlightedTabs ? tab.highlighted : tab.selected || tab.active);
    checkbox.disabled = !checkbox.value;
    title.textContent = tab.title || checkbox.value || "URL unavailable";
    label.append(checkbox, title);
    tabOptions.append(label);
  }

  tabPicker.hidden = tabs.length === 0;
  updateSelection();
}

loadTabs().catch(() => {
  statusMessage.textContent = "Unable to load tab URLs. Reopen the extension to retry.";
});
