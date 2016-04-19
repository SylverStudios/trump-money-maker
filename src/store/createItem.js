// name, price, owned
const createItem = function(asset) {
  const item = document.createElement('div');
  item.className = 'store-item panel panel-default';
  item.id = 'item-'+asset.name;

  const panelBodyNode = document.createElement('div');
  panelBodyNode.className = 'panel-body';

  const imageNode = document.createElement('img');
  imageNode.className = 'col-md-2';
  imageNode.src = 'images/SylverBar38.png';

  const contentNode = document.createElement('div');
  contentNode.className = 'item-content col-md-8';

  const titleNode = document.createElement('div');
  titleNode.className = 'item-title';
  titleNode.innerHTML = asset.name;

  const costNode = document.createElement('div');
  costNode.id = asset.name + '-price';
  costNode.className = 'item-cost';
  costNode.innerHTML = asset.price;

  const numberNode = document.createElement('div');
  numberNode.id = asset.name + '-owned';
  numberNode.className = 'item-number col-md-2';
  numberNode.innerHTML = asset.owned;


  panelBodyNode.appendChild(imageNode);

  contentNode.appendChild(titleNode);
  contentNode.appendChild(costNode);
  panelBodyNode.appendChild(contentNode);

  panelBodyNode.appendChild(numberNode);

  item.appendChild(panelBodyNode);

  return item;
};

export default createItem;