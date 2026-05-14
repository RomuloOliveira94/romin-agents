// Auto-sync prompts from the romin-agents local clone.
// Uses git pull (SSH) to fetch updates, then copies .txt files.
export const SyncPromptsPlugin = async ({ $ }) => {
  const DEST = `${process.env.HOME}/.config/opencode/prompts`
  const REPO_DIR = `${process.env.HOME}/work/romin-agents`
  const REPO_URL = "git@github.com:RomuloOliveira94/romin-agents.git"

  try {
    if (await $`test -d ${REPO_DIR}`.then(() => true).catch(() => false)) {
      await $`git -C ${REPO_DIR} pull --ff-only`.quiet()
    } else {
      await $`git clone ${REPO_URL} ${REPO_DIR}`.quiet()
    }

    await $`mkdir -p ${DEST}`
    const files = await $`ls ${REPO_DIR}/prompts/*.txt`.text().then(s => s.trim().split("\n")).catch(() => [])
    if (!files.length) {
      console.warn(`sync-prompts: no .txt prompts found in ${REPO_DIR}/prompts/`)
      return {}
    }

    await $`cp ${REPO_DIR}/prompts/*.txt ${DEST}/`.quiet()
    console.log(`sync-prompts: ${files.length} prompts synced from ${REPO_DIR}`)
  } catch (error) {
    console.warn(`sync-prompts: failed: ${error}`)
  }

  return {}
}
