export default function link(turndownService) {
  turndownService.addRule("href", {
    filter: node => node.nodeName === "A" && node.getAttribute("href"),
    replacement: (content, node) => {
      // handle only an image enclosed in `a` tag
      if (node.hasChildNodes() && node.children.length === 1 && node.firstChild.nodeName === "IMG") {
        // scrapbox does not allow query strings in image URL
        return `[${node.getAttribute("href")} ${node.firstChild.getAttribute("src").split("?")[0]}]`;
      }
      if (node.textContent !== "") {
        return `[${node.textContent} ${node.getAttribute("href")}]`;
      }
      return "";
    }
  });
}
