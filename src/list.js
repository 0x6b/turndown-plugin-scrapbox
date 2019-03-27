export default function list(turndownService) {
  turndownService.addRule("list", {
    filter: "li",
    replacement: (content, node) => {
      content = content
        .replace(/^\n+/, "") // remove leading newlines
        .replace(/\n+$/, "\n") // replace trailing newlines with just a single one
        .replace(/\n/gm, "\n    "); // indent
      return "  " + content + (node.nextSibling && !/\n$/.test(content) ? "\n" : "");
    }
  });
}
