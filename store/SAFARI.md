# App Store listing for Safari

## Public listing

- **Name.** Tabs to txt
- **Initial platform.** macOS
- **Language.** English (United States)
- **Suggested category.** Productivity
- **Subtitle.** Save and restore tabs
- **Keywords.** tabs,links,export,import,browser,file,productivity

### Description

Tabs to txt saves the URLs of selected Safari tabs in a TXT file so you can reopen them later.

Choose your tabs, name the file, and save it. To restore the list, select a TXT file and confirm. The extension opens HTTP and HTTPS links in background tabs in the same window.

The TXT file contains one URL per line and opens in any text editor. The extension processes data on your device and requires no account.

## Privacy and review

- **Support and Privacy Policy URLs.** Use the public `support.html` and `privacy.html` addresses in the [publishing guide](PUBLISHING.md). Both pages are also available from the extension. The public support and privacy contact is contato.tabstotxt@midnorth.com.br.
- **App Privacy label.** The extension processes data on your device. **Data Not Collected** is the expected answer if the generated app and its partners follow the same behavior under Apple's definition. Verify the build before submitting the declaration.
- **Website access.** Safari requires access to a domain before the extension can read its tab URL. The manifest requests HTTP and HTTPS patterns so users can export tabs from the sites they choose. Permissions granted in Safari determine which URLs are accessible. The extension does not inject scripts into pages or read their content.
- **Reviewer instructions.** No sign-in required. Enable the extension in Safari, grant access to two example sites, select their tabs, and save a TXT file. Import the same file and confirm that the tabs open in the import window. Check the support and privacy links.
- **Screenshots.** Use the 1280 × 800 Chrome screenshots as a reference. After testing the macOS build, capture the extension in Safari for the App Store listing.

## Packaging

Upload `packages/Tabs-to-txt-Safari.zip` in **App Store Connect → Xcode Cloud → Safari Web Extension Packager**. The service generates the app that contains the extension. Choose **macOS**, provide the bundle identifier and SKU from your account, and test the generated build through TestFlight before submitting it for review.

[Package without a Mac](https://developer.apple.com/documentation/safariservices/packaging-and-distributing-safari-web-extensions-with-app-store-connect) · [Metadata](https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information) · [Privacy](https://developer.apple.com/app-store/app-privacy-details/) · [Screenshots](https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications)
