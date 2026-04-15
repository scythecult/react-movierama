export const createRootContainer = () => {
  const rootNode = document.createElement('div');
  rootNode.setAttribute('id', 'root');

  document.body.append(rootNode);

  return rootNode;
};
