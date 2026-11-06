"""Build distribution ZIPs using the Python standard library."""

from hashlib import sha256
from json import dumps, loads
from pathlib import Path
from tempfile import NamedTemporaryFile
from zipfile import ZIP_DEFLATED, ZipFile, ZipInfo


def write_package(destination, manifest, resources):
    with NamedTemporaryFile(dir=destination.parent, suffix=".tmp", delete=False) as file:
        temporary = Path(file.name)

    try:
        with ZipFile(temporary, "w") as archive:
            contents = {"manifest.json": (dumps(manifest, ensure_ascii=False, indent=2) + "\n").encode("utf-8")}
            contents.update(resources)
            for name, data in contents.items():
                archive.writestr(ZipInfo(name), data, compress_type=ZIP_DEFLATED)
        temporary.replace(destination)
    finally:
        temporary.unlink(missing_ok=True)


def main():
    root = Path(__file__).resolve().parent.parent
    manifest = loads((root / "manifest.json").read_text(encoding="utf-8"))
    names = [
        "popup.html", "popup.css", "popup.js", "import.html", "import.js",
        "privacy.html", "support.html", *manifest["icons"].values(),
    ]
    resources = {name: (root / name).read_bytes() for name in names}
    safari = dict(manifest, host_permissions=["https://*/*", "http://*/*"])

    output = root / "packages"
    output.mkdir(exist_ok=True)
    packages = {
        "Tabs-to-txt-Chrome.zip": manifest,
        "Tabs-to-txt-Safari.zip": safari,
    }
    hashes = []
    for name, package_manifest in packages.items():
        destination = output / name
        write_package(destination, package_manifest, resources)
        hashes.append(f"{sha256(destination.read_bytes()).hexdigest()}  {name}")
        print(destination)

    (output / "SHA256SUMS.txt").write_text("\n".join(hashes) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
