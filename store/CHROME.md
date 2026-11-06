# Chrome Web Store listing

## Public listing

- **Name.** Tabs to txt
- **Language.** English (United States)
- **Suggested category.** Productivity
- **Short description.** Export selected tabs to a TXT file and reopen the links in the same window.

### Description

Save the URLs of the tabs you choose in a TXT file. Select tabs in the browser's tab bar or pick them in the popup, name the file, and keep the list wherever you like.

To restore the list, choose **Import TXT** and click **Open tabs**. HTTP and HTTPS links open in background tabs in the same window. The file uses UTF-8 with one URL per line.

The extension processes data on your device. It requires no account, includes no ads or telemetry, and sends no TXT files to servers operated by the project.

## Privacy fields

- **Single purpose.** Save and restore tab lists using local TXT files.
- **Justification for `tabs`.** When you open the popup, the extension needs the URLs and titles of tabs in the current window to show the selection, let you adjust it, and export the URLs you choose. The active tab permission covers only the active tab.
- **Remote code.** No. All scripts run by the extension are included in the ZIP.
- **Data handling.** Disclose local processing of browsing activity. The dashboard may label the category **Web history**. The extension uses URLs and titles from open tabs and does not access the browser's saved history. It also reads the selected TXT file locally to recover URLs. Disclose that the extension does not send this data to a project server, sell it, or use it for ads or telemetry.
- **Privacy Policy URL.** Use the public `privacy.html` address in the [publishing guide](PUBLISHING.md).

[Privacy fields](https://developer.chrome.com/docs/webstore/cws-dashboard-privacy) · [Local data handling](https://developer.chrome.com/docs/webstore/program-policies/user-data-faq)

## Submission and review

- **Package.** `packages/Tabs-to-txt-Chrome.zip`
- **Images.** [Export](images/01-export-tabs.png) and [import](images/02-import-tabs.png) screenshots at 1280 × 800. [Small promo tile](images/promo-440x280.png) at 440 × 280. The 128 × 128 icon is included in the ZIP.
- **Support contact.** contato.tabstotxt@midnorth.com.br. Use the public `support.html` address once it is live.
- **Reviewer instructions.** No account required. Open two example sites, select their tabs, save a TXT file, and import the same file. Confirm that the links open in background tabs. The [sample TXT file](sample-tabs.txt) contains public test URLs.

[Prepare the extension](https://developer.chrome.com/docs/webstore/prepare) · [Submit for review](https://developer.chrome.com/docs/webstore/publish) · [Store images](https://developer.chrome.com/docs/webstore/images)
