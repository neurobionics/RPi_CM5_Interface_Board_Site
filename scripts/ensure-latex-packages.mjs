import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const mainTexPath = path.join(rootDir, "latex", "main.tex");

const commandCandidates = (command) => [
  command,
  path.join("/Library/TeX/texbin", command),
];

const findCommand = (command) => {
  for (const candidate of commandCandidates(command)) {
    if (candidate.includes("/")) {
      if (existsSync(candidate)) return candidate;
      continue;
    }

    const result = spawnSync("sh", ["-lc", `command -v ${command}`], { encoding: "utf8" });
    if (result.status === 0 && result.stdout.trim().length > 0) return result.stdout.trim();
  }
  return undefined;
};

const packageMap = {
  inputenc: "latex-base",
  fontenc: "latex-base",
  graphicx: "graphics",
  tabularx: "tools",
};

const packageFiles = {
  "latex-base": ["inputenc.sty", "fontenc.sty"],
  graphics: ["graphicx.sty"],
  tools: ["tabularx.sty"],
};

const packageNamesFromMain = (contents) => {
  const packages = new Set();
  const pattern = /\\usepackage(?:\[[^\]]*\])?\{([^}]+)\}/g;
  for (const match of contents.matchAll(pattern)) {
    for (const packageName of match[1].split(",")) {
      const normalizedName = packageName.trim();
      if (normalizedName) packages.add(packageMap[normalizedName] || normalizedName);
    }
  }
  return [...packages].sort();
};

const filesForPackage = (packageName) => packageFiles[packageName] || [`${packageName}.sty`];

const missingPackageNames = (packageNames, kpsewhich) => packageNames.filter((packageName) => (
  filesForPackage(packageName).some((fileName) => {
    const result = spawnSync(kpsewhich, [fileName], { encoding: "utf8" });
    return result.status !== 0 || result.stdout.trim().length === 0;
  })
));

const main = async () => {
  const tlmgr = findCommand("tlmgr");
  const pdflatex = findCommand("pdflatex");
  const kpsewhich = findCommand("kpsewhich");
  if (!tlmgr || !pdflatex || !kpsewhich) {
    throw new Error(
      "BasicTeX was not found. Install BasicTeX and ensure /Library/TeX/texbin is on PATH."
    );
  }

  const packageNames = packageNamesFromMain(await readFile(mainTexPath, "utf8"));
  const missingPackages = missingPackageNames(packageNames, kpsewhich);
  if (missingPackages.length === 0) {
    console.log("All LaTeX packages required by main.tex are already installed.");
    return;
  }

  console.log(`Installing missing LaTeX packages: ${missingPackages.join(", ")}`);

  const installArgs = ["install", ...missingPackages];
  let result = spawnSync(tlmgr, installArgs, {
    cwd: rootDir,
    stdio: "inherit",
  });

  if (result.error) throw result.error;
  if (result.status !== 0) {
    console.log("Retrying package installation with administrator privileges...");
    result = spawnSync("sudo", [tlmgr, ...installArgs], {
      cwd: rootDir,
      stdio: "inherit",
    });
  }

  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error("tlmgr could not install the required packages.");
  }

  const stillMissing = missingPackageNames(missingPackages, kpsewhich);
  if (stillMissing.length > 0) {
    throw new Error(`LaTeX packages are still missing after installation: ${stillMissing.join(", ")}`);
  }

  console.log("LaTeX package check complete.");
};

main().catch((error) => {
  console.error(`LaTeX setup failed: ${error.message}`);
  process.exitCode = 1;
});
