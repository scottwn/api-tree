const request = require('request-promise');

const nodes = [];
const url = 'http://my-json-server.typicode.com/scottwn/api-tree/posts/';

async function findActive(id) {
  let node = await request.get(url + id, {json: true});
  let childNode = node;
  nodes.push(node);
  while (nodes) {
    node = nodes.shift();
    if (node.active) {
      return node.id;
    } else {
      for (let i = 0; i < node.children.length; i++) {
        childNode = await request.get(url + node.children[i], {json: true});
        nodes.push(childNode);
      }
    }
  }
}

async function printOutput() {
  const output = await findActive(1);
  console.log(output);
}

exports.printOutput = printOutput;
