import { codeToHtml, type BundledLanguage } from "shiki";

export async function highlight(
  code: string,
  lang: BundledLanguage = "typescript",
): Promise<string> {
  return await codeToHtml(code, {
    lang,
    theme: "github-dark-default",
  });
}
