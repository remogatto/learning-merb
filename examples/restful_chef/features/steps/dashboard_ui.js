var map = new UIMap();

map.addPageset({
  name: 'aPageset',
  description: 'contains elements common to all pages',
  paths: ['grid/']
});

map.addElement('aPageset', {
  name: 'save_button',
  description: 'save button',
  locator: 'save'
});
