// Auto-sync prompts from romin-agents repo on opencode startup.
// Install: cp plugins/sync-prompts.js ~/.config/opencode/plugins/
export const SyncPromptsPlugin = async ({ $ }) => {
  const DEST = `${process.env.HOME}/.config/opencode/agents/prompts`

  const candidates = [
    `${process.env.HOME}/dev/romin-agents`,
    `${process.env.HOME}/src/romin-agents`,
    `${process.env.HOME}/code/romin-agents`,
    `${process.env.HOME}/projects/romin-agents`,
    `${process.env.HOME}/romin-agents`,
  ]

  for (const repo of candidates) {
    const src = `${repo}/agents/prompts`
    try {
      const { exitCode } = await $`test -d ${src}`
      if (exitCode === 0) {
        await $`mkdir -p ${DEST}`
        await $`cp ${src}/*.txt ${DEST}/`
        const count = (await $`ls ${DEST}/*.txt 2>/dev/null | wc -l`).text().trim()
        console.log(`sync-prompts: ${count} prompts synced from ${repo}`)
        return
      }
    } catch {}
  }
}
