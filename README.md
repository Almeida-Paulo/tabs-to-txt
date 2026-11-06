# Tabs to txt

Save selected tabs to a TXT file and reopen the links whenever you need them. The file contains one URL per line in UTF-8, in the order the tabs appeared in your browser.

![Tabs to txt with three tabs selected for export](store/images/01-export-tabs.png)

## How to use

1. Select tabs in the browser's tab bar or use **Choose tabs in this window** in the popup.
2. Enter a **File name** and click **Save TXT**.
3. To reopen the links, click **Import TXT**, select your file, then click **Open tabs**.

HTTP and HTTPS links open in background tabs in the same window. The extension ignores blank lines and reports how many other lines it skipped. Try it with the [sample TXT file](store/sample-tabs.txt).

## Local installation

- **Chrome, Edge, and Brave.** Open `chrome://extensions`, `edge://extensions`, or `brave://extensions`. Turn on **Developer mode**, click **Load unpacked**, and select the folder containing `manifest.json`.
- **Firefox.** Open `about:debugging#/runtime/this-firefox`, click **Load Temporary Add-on**, and select `manifest.json`. The installation lasts until you restart Firefox. [Mozilla documentation](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/)
- **Safari on macOS.** Generate the Safari ZIP with `scripts/package.py` or download it from the project's Releases page when available. On supported versions, use **Safari → Settings → Developer → Add Temporary Extension**. Grant access to the websites whose URLs you want to export. [Temporary installation](https://developer.apple.com/documentation/safariservices/running-your-safari-web-extension) · [Website permissions](https://developer.apple.com/documentation/safariservices/managing-safari-web-extension-permissions)

## Privacy

The extension processes URLs, tab titles, and files on your device. It requires no account and includes no telemetry. See the [Privacy Policy](privacy.html) and [support page](support.html).

## Feedback and bug reports

Choose **Feature request** or **Bug report** when opening an issue. Use example URLs in public reports. For privacy questions, email [contato.tabstotxt@midnorth.com.br](mailto:contato.tabstotxt@midnorth.com.br). [Open an issue on GitHub](https://github.com/Almeida-Paulo/tabs-to-txt/issues/new/choose)

## Development and publishing

The extension uses Manifest V3 and plain JavaScript, HTML, and CSS. You can load the source folder directly. To build the distribution ZIPs, run `python scripts/package.py` from the extension root with Python 3.8 or later. The packager uses only the Python standard library and writes ZIPs and SHA-256 checksums to `packages/`.

See the [publishing guide](store/PUBLISHING.md) to set up the repository, host the policy, and submit the packages to the stores.
