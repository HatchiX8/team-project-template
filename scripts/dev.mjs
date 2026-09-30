import { spawn } from "node:child_process";

const npmExecutable = process.env.npm_execpath;

if (!npmExecutable) {
  throw new Error("npm_execpath is unavailable. Run this script through npm run dev.");
}

const processes = [
  ["web", "dev:web"],
  ["server", "dev:server"],
].map(([name, script]) => {
  const child = spawn(process.execPath, [npmExecutable, "run", script], {
    stdio: "inherit",
    windowsHide: true,
  });

  return { name, child };
});

let isStopping = false;

function stop(exitCode) {
  if (isStopping) {
    return;
  }

  isStopping = true;

  for (const { child } of processes) {
    if (child.exitCode === null) {
      child.kill();
    }
  }

  process.exitCode = exitCode;
}

for (const { name, child } of processes) {
  child.on("error", (error) => {
    console.error(`Failed to start ${name}:`, error);
    stop(1);
  });

  child.on("exit", (code, signal) => {
    if (!isStopping) {
      console.error(
        `${name} stopped unexpectedly (${signal ?? `exit code ${code ?? 1}`}).`,
      );
      stop(code ?? 1);
    }
  });
}

process.on("SIGINT", () => stop(0));
process.on("SIGTERM", () => stop(0));
