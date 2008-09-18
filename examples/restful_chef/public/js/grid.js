
Ext.onReady(function() {

  var myStore = new Ext.data.JsonStore({
		  url: '/recipes.json',
		  fields: ['id', 'name'],
		  autoLoad: true
  });

  var sm = new Ext.grid.CheckboxSelectionModel();

  var grid = new Ext.ux.GridFormBinding({
					  store: myStore,
					  restfulPaths: {
					    create: '/recipes/create',
					    update: '/recipes/update/',
					    delete: '/recipes/delete/'
					  },
					  title: 'Ricette',
					  width: 400,
					  autoHeight: true,
					  autoExpandColumn: 'nome',
					  stripeRows: true,
					  sm: sm,
					  columns: [
					    sm,
					    {header: 'Id', sortable: true, dataIndex: 'id'},
					    {id: 'nome', header: 'Nome', sortable: true, dataIndex: 'name'}
					  ],
					  form: {
					    title: 'Dettagli Ricetta',
					    frame: true,
					    defaultType: 'textfield',
					    items: [{fieldLabel: 'Ricetta', name: 'name', allowBlank: false}, {hideLabel: true, hidden: true, name: 'id'}]
					  }
					});

  grid.render(document.body);

});

