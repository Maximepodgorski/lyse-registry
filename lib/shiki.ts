import { createHighlighterCore } from "shiki/core"
import { createCssVariablesTheme } from "shiki/core"
import { createJavaScriptRegexEngine } from "shiki/engine/javascript"

const theme = createCssVariablesTheme({
  name: "lyse",
  variablePrefix: "--shiki-",
  variableDefaults: {},
  fontStyle: true,
})

let highlighterPromise: ReturnType<typeof createHighlighterCore> | null = null

export function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighterCore({
      themes: [theme],
      langs: [
        import("shiki/langs/tsx.mjs"),
        import("shiki/langs/css.mjs"),
        import("shiki/langs/bash.mjs"),
      ],
      engine: createJavaScriptRegexEngine(),
    })
  }
  return highlighterPromise
}
