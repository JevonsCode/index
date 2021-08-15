import * as Process from "child_process";

export async function exec(command: string) {
  await new Promise((resolve) => {
    Process.exec(command, (error, stdout, stderr) => {
      resolve({ error, stdout, stderr });
    });
  });
}
