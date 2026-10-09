// Pandoc-style superscript/subscript: x^2^ -> x<sup>2</sup>, H~2~O -> H<sub>2</sub>O.
// The marked text can't contain spaces (same rule as Pandoc), so stray carets
// and tildes in prose are left alone. Code spans/blocks aren't text nodes, so
// they're untouched.
const PATTERN = /\^([^\s^]+)\^|~([^\s~]+)~/g;

function splitText(value) {
    const nodes = [];
    let last = 0;
    for (const match of value.matchAll(PATTERN)) {
        if (match.index > last) {
            nodes.push({ type: 'text', value: value.slice(last, match.index) });
        }
        const isSup = match[1] !== undefined;
        nodes.push({
            type: isSup ? 'superscript' : 'subscript',
            data: { hName: isSup ? 'sup' : 'sub' },
            children: [{ type: 'text', value: isSup ? match[1] : match[2] }],
        });
        last = match.index + match[0].length;
    }
    if (last === 0) return null;
    if (last < value.length) {
        nodes.push({ type: 'text', value: value.slice(last) });
    }
    return nodes;
}

function walk(node) {
    if (!node.children) return;
    const children = [];
    for (const child of node.children) {
        const replaced = child.type === 'text' ? splitText(child.value) : null;
        if (replaced) {
            children.push(...replaced);
        } else {
            walk(child);
            children.push(child);
        }
    }
    node.children = children;
}

export default function remarkSupSub() {
    return (tree) => walk(tree);
}
