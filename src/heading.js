export default function heading(turndownService) {
  turndownService.addRule("heading", {
    filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
    replacement: (content, node) => {
      let level = 5 - Number(node.nodeName.charAt(1));
      if (level < 1) {
        level = 1;
      }
      return `

[${"*".repeat(level)} ${content}]

`;
    }
  });
}
