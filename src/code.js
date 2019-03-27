const rules = {
  code: {
    filter: node => {
      const hasSiblings = node.previousSibling || node.nextSibling;
      const isCodeBlock = node.parentNode.nodeName === "PRE" && !hasSiblings;

      return node.nodeName === "CODE" && !isCodeBlock;
    },
    replacement: (content, node) => {
      if (!content.trim()) {
        return "";
      }

      let delimiter = "`";
      let leadingSpace = "";
      let trailingSpace = "";
      let target = content;

      if (!(node.hasChildNodes() && node.firstChild.nodeName === "#text")) {
        return content;
      }

      const matches = target.match(/`+/gm);
      if (matches) {
        if (/^`/.test(target)) leadingSpace = " ";
        if (/`$/.test(target)) trailingSpace = " ";
        while (matches.indexOf(delimiter) !== -1) delimiter = delimiter + "`";
      }

      return delimiter + leadingSpace + target + trailingSpace + delimiter;
    }
  },
  codeBlock: {
    filter: node => node.nodeName === "PRE" && node.firstChild && node.firstChild.nodeName === "CODE",
    replacement: (content, node) => {
      const className = node.firstChild.className || "";
      const language = (className.match(/language-(\S+)/) || [null, "txt"])[1]; // fallback to text

      return `

code:${language}
${node.firstChild.textContent.replace(/^/gm, "\t")}
`;
    }
  }
};

export default function char(turndownService) {
  Object.keys(rules).forEach(key => {
    turndownService.addRule(key, rules[key]);
  });
}
