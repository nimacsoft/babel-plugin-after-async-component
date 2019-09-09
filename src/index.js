import {
  existingMagicCommentChunkName,
  getMagicCommentChunkName,
  getImportArgPath,
  addChunkNameToNode,
} from './helpers';

let asyncComponentImportNames = [];

const validImportSources = [
  '@jaredpalmer/after',
  'jaredpalmer/after/asyncComponent',
];

export default function({ types: t }) {
  return {
    name: 'after-async-component',
    visitor: {
      ImportDeclaration(path) {
        if (
          t.isStringLiteral(path.node.source) &&
          validImportSources.includes(path.node.source.value)
        ) {
          const { specifiers } = path.node;
          const asyncComponentImport = specifiers.filter(
            specifier =>
              t.isImportDefaultSpecifier(specifier) ||
              (t.isImportSpecifier(specifier) &&
                specifier.imported.name === 'asyncComponent')
          );
          asyncComponentImport.forEach(asyncComponentImport => {
            asyncComponentImportNames.push(asyncComponentImport.local.name);
          });
        }
      },
      CallExpression(path, { opts }) {
        if (
          (asyncComponentImportNames.length >= 1,
          // check if the function that called is named "asyncComponent" or named export { asyncComponent as foo }
          t.isIdentifier(path.node.callee) &&
            asyncComponentImportNames.includes(path.node.callee.name) &&
            // check if function is property of an object
            t.isObjectProperty(path.parentPath) &&
            // check if key of property is "component"
            t.isIdentifier(path.parentPath.node.key, { name: 'component' }))
        ) {
          path.traverse(importVisitor, {
            parentPath: path.parentPath,
            prefix: opts.prefix,
            t,
          });
        }
      },
    },
  };
}

const importVisitor = {
  Import(path) {
    const argPath = getImportArgPath(path);
    const { node } = argPath;
    const generatedChunkName = getMagicCommentChunkName(node);
    if (generatedChunkName === '[request]') {
      return;
    }

    const existingChunkName = existingMagicCommentChunkName(node);
    const chunkName =
      existingChunkName || convertChunkName(generatedChunkName, this.prefix);

    addChunkNameToNode(argPath, chunkName);

    this.parentPath.insertBefore(
      this.t.objectProperty(
        this.t.stringLiteral('chunkName'),
        this.t.stringLiteral(chunkName)
      )
    );
  },
};

function convertChunkName(chunkName, prefix = '') {
  return prefix + chunkName.replace('/', '-');
}
