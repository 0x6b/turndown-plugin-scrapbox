export default function image(turndownService) {
  turndownService.addRule("image", {
    filter: "img",
    replacement: (content, node) => `[${node.getAttribute("src") || ""}]`
  });
}
