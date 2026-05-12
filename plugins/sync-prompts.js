// Auto-sync prompts from the romin-agents GitHub repo on startup.
// Uses gh so private repos work with the user's existing GitHub CLI auth.
export const SyncPromptsPlugin = async ({ $ }) => {
  const DEST = `${process.env.HOME}/.config/opencode/agents/prompts`
  const GITHUB_REPO = process.env.OPENCODE_PROMPTS_REPO || "RomuloOliveira94/romin-agents"
  const PROMPTS_PATH = process.env.OPENCODE_PROMPTS_PATH || "agents/prompts"

  try {
    await $`mkdir -p ${DEST}`

    const names = (await $`gh api repos/${GITHUB_REPO}/contents/${PROMPTS_PATH} --jq '.[] | select(.type == "file" and (.name | endswith(".txt"))) | .name'`.text()).trim()
    if (!names) {
      console.warn(`sync-prompts: no .txt prompts found in ${GITHUB_REPO}/${PROMPTS_PATH}`)
      return {}
    }

    let count = 0
    for (const name of names.split("\n")) {
      await $`gh api -H 'Accept: application/vnd.github.raw' repos/${GITHUB_REPO}/contents/${PROMPTS_PATH}/${name} > ${DEST}/${name}`.quiet()
      count += 1
    }

    console.log(`sync-prompts: ${count} prompts synced from ${GITHUB_REPO}/${PROMPTS_PATH}`)
  } catch (error) {
    console.warn(`sync-prompts: failed to sync from ${GITHUB_REPO}/${PROMPTS_PATH}: ${error}`)
  }

  return {}
}
