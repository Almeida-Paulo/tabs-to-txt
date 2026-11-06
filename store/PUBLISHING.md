# Publish Tabs to txt

## 1. GitHub

Create the standalone repository **Almeida-Paulo/tabs-to-txt** using the extension folder as the repository root. Enable **Issues** to make the feature request and bug report forms available. [Planned GitHub repository](https://github.com/Almeida-Paulo/tabs-to-txt)

Check your Git author name and email before the first commit. To keep your personal email private, use the `noreply` address listed in your GitHub settings. [Git commit email privacy](https://docs.github.com/en/account-and-profile/how-tos/email-preferences/setting-your-commit-email-address)

Choose a license before presenting the project as open source. You can attach the ZIPs from `packages/` to a GitHub release. The repository contains the source code, listing images, and packager. [Licensing a repository](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository)

## 2. Public URLs

After pushing to GitHub, open **Settings → Pages** and publish from the `main` branch and repository root. Check that both pages are accessible without signing in before using these addresses in the stores. [Set up GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

- **Privacy Policy.** [Planned Privacy Policy URL](https://almeida-paulo.github.io/tabs-to-txt/privacy.html)
- **Support.** [Planned support URL](https://almeida-paulo.github.io/tabs-to-txt/support.html)
- **Contact.** contato.tabstotxt@midnorth.com.br

## 3. Packages, images, and listings

1. Run `python scripts/package.py` from the extension root with Python 3.8 or later.
2. For Chrome, use the [listing copy](CHROME.md), the Chrome ZIP, and the [listing images](images/).
3. For Safari, use the [listing copy](SAFARI.md) and the Safari ZIP. Start with macOS.

## 4. Submission checks

1. Load the extension in a Chrome test profile. Select two example tabs, save the TXT with a custom name, and check the file contents.
2. Import the same TXT. Confirm the tabs open in the expected window and that the support and privacy links are accessible.
3. Repeat the flow with the Safari build installed through TestFlight, then capture the macOS screenshots.
4. Complete your account information and declarations, check that the listing name is available, and submit for review. In App Store Connect, also provide the age rating and review contact. Chrome requires a developer account and a registration fee. Apple requires membership in the Apple Developer Program.

[Chrome developer registration](https://developer.chrome.com/docs/webstore/register) · [Apple Developer Program](https://developer.apple.com/programs/enroll/)
