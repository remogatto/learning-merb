Ext.ux.GridFormBinding = Ext.extend(Ext.Panel, {

  initComponent: function() {

    var form_config = Ext.apply(this.form,
				{
				  xtype: 'form',
				  id: 'form',
				  bodyStyle: {
				    border: 0,
				    padding: '10px 0 10px 0'
				  },
				  collapsible: true,
				  titleCollapse: true,
				  collapsed: true,
				  listeners: {
				    actioncomplete: function() {
				      _grid.store.reload();
				    },
				    actionfailed: function() {
				      alert('Reload failed!');
				    }
				  },
				  buttons: [
				    {text: 'Save', handler: save.createDelegate(this)},
				    {text: 'Cancel', handler: cancel.createDelegate(this)}
				  ]
				});

    var grid_config = Ext.apply(this.grid,
				{
				  xtype: 'grid',
				  id: 'grid'
				});

    var _form = new Ext.form.FormPanel(form_config);
    var _grid = new Ext.grid.GridPanel(grid_config);

    _grid.selModel.addListener('rowselect',
    				function(sm, row, rec) {
    				  _form.getForm().loadRecord(rec);
    	    			  this.currId = rec.data.id;
    				}, this);

    // Apply configuration.
    Ext.apply(this, {
		tbar: [{text: 'New', handler: newAction.createDelegate(this) },
		       {text: 'Update', handler: updateAction.createDelegate(this) },
		       {text: 'Delete', handler: deleteAction.createDelegate(this)}
		      ],
		items: [_form, _grid]
	      });

    // Call superclass constructor.
    Ext.ux.GridFormBinding.superclass.initComponent.call(this, arguments);

    // private

    function save() {
      if(this.currId)
    	_form.getForm().submit({url: this.restfulPaths.update + this.currId + '.json', waitMsg:'Updating item ...'});
      else
    	_form.getForm().submit({url: this.restfulPaths.create + '.json', waitMsg:'Creating new item ...'});
    }

    function cancel() {
      _form.getForm().reset();
    }

    function updateAction() {
      _form.expand();
    }

    function newAction() {
      this.currId = null;
      _form.getForm().reset();
      _form.expand();
    }

    function deleteAction() {
      _grid.getSelectionModel().each(function(s){
    	_form.getForm().submit({url: this.restfulPaths.delete + s.data.id + '.json', waitMsg:'Deleting item ...'});
      },
      this);
    }

  }

});

Ext.reg('gridformbinding', Ext.ux.GridFormBinding);
