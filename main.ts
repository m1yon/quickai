import { Command } from "commander";
import { Spinner } from "@std/cli/unstable-spinner";

const program = new Command();

program
  .name("quickai")
  .description("CLI for common AI tools")
  .version("0.0.1");

program.command("lint")
  .description("Lint the project using OpenCode")
  .action(async () => {
    const spinner = new Spinner({ message: "Linting project..." });
    spinner.start();
    const command = new Deno.Command("opencode", {
      args: [
        "run",
        `You are a software developer. Fix all lint errors and warnings.`,
        "--model",
        "anthropic/claude-sonnet-4-20250514",
      ],
    });

    const { code, stdout } = await command.output();
    console.assert(code === 0);
    console.log("\n", new TextDecoder().decode(stdout));
    spinner.stop();
  });

if (import.meta.main) {
  program.parse();
}
