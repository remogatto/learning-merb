
Ext.onReady(function() {

  var myStore = new Ext.data.JsonStore({
		  url: '/recipes.json',
		  fields: ['id', 'name', 'level'],
		  autoLoad: true
  });

  var sm = new Ext.grid.CheckboxSelectionModel();

  var grid = new Ext.ux.GridFormBinding({
					  restfulPaths: {
					    create: '/recipes/create',
					    update: '/recipes/update/',
					    delete: '/recipes/delete/'
					  },

					  title: 'Ricette',
					  width: 400,

					  grid: {
					    store: myStore,
					    autoHeight: true,
					    autoExpandColumn: 'nome',
					    stripeRows: true,
					    sm: new Ext.grid.CheckboxSelectionModel(),
					    columns: [
					      sm,
					      {header: 'Id', sortable: true, dataIndex: 'id'},
					      {id: 'nome', header: 'Nome', sortable: true, dataIndex: 'name'}
					    ],
					    viewConfig: {
					      emptyText: 'Your database is empty.'
					    }
					  },

					  form: {
					    title: 'Dettagli Ricetta',
					    frame: true,
					    defaultType: 'textfield',
					    items: [
					      {fieldLabel: 'Ricetta', name: 'name', allowBlank: false},

					      new Ext.form.ComboBox({
						mode: 'local',
						name: 'level',
						//editable: false,
						fieldLabel: 'Difficoltà',
						store: ['Alta', 'Media', 'Bassa']
					      }),

					      {hideLabel: true, hidden: true, name: 'id'}
					    ]
					  }

					});

  grid.render(document.body);

});

