const rules = {
  italic: {
    filter: ["em", "i"],
    replacement: (content, node) => sbnize(content, node, "/")
  },
  bold: {
    filter: ["strong", "b"],
    replacement: (content, node) => sbnize(content, node, "*")
  },
  strikethrough: {
    filter: ["del", "s", "strike"],
    replacement: (content, node) => sbnize(content, node, "-")
  }
};

function sbnize(content, node, prefix) {
  if (!content.trim()) {
    return "";
  }
  return `[${prefix} ${node.textContent}]`; // scrapbox does not allow inline style
}

export default function char(turndownService) {
  Object.keys(rules).forEach(key => {
    turndownService.addRule(key, rules[key]);
  });
}
