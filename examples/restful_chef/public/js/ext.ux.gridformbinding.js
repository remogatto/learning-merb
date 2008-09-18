Ext.ux.GridFormBinding = Ext.extend(Ext.grid.GridPanel, {

  initComponent: function() {

    // Apply configuration.
    Ext.apply(this, {
		tbar: [{text: 'New', handler: newAction.createDelegate(this)},
		       {text: 'Update', handler: updateAction.createDelegate(this)},
		       {text: 'Delete', handler: deleteAction.createDelegate(this)}
		      ],
		id: 'grid'
	      });

    // Call superclass constructor.
    Ext.ux.GridFormBinding.superclass.initComponent.call(this, arguments);

    this.getView().emptyText = 'The database is empty.';

    initForm.call(this);
    addSelectionEvents.call(this);

    // private methods

    // Load selected record in the form field when a rowselect
    // event is triggered.
    function addSelectionEvents() {
      this.selModel.addListener('rowselect',
    				function(sm, row, rec) {
    				  Ext.getCmp("form").getForm().loadRecord(rec);
    	    			  this.currId = rec.data.id;
    				},
    				this);

    }

    // Add the form component into the panel and configure it.
    function initForm() {

      this.form = this.add(Ext.apply({
				       xtype: 'form',
				       id: 'form',
				       bodyStyle: {
					 border: 0,
					 padding: '10px 0 10px 0'
				       },
				       collapsible: true,
				       titleCollapse: true,
				       collapsed: true
				     },
				     this.form));

      addButtons.call(this);
      attachReload.call(this);
    }

    // Add buttons to the form.
    function addButtons() {

      this.form.addButton({text: 'Save'},
			  function() {
			    if(this.currId)
			      this.form.getForm().submit({url: this.restfulPaths.update + this.currId + '.json', waitMsg:'Updating item ...'});
			    else
			      this.form.getForm().submit({url: this.restfulPaths.create + '.json', waitMsg:'Creating new item ...'});
    			  },
			  this);

      this.form.addButton({text: 'Cancel'},
			  function() {
			    this.form.getForm().reset();
			  },
			  this);
    }

    function updateAction() {
      this.form.expand();
    }

    function newAction() {
      this.currId = null;
      this.form.getForm().reset();
      this.form.expand();
    }

    function deleteAction() {
      this.getSelectionModel().each(function(s){
	this.form.getForm().submit({url: this.restfulPaths.delete + s.data.id + '.json', waitMsg:'Deleting item ...'});
      },
      this);
    }

    // Reload datastore when an actioncomplete event is triggered.
    function attachReload() {

      // Code block used to reloading datastore.
      // The block is called in the scope of this.store
      var dsReload = function() {
	this.reload();
      };

      // Attach dsReload to actioncomplete event.

      this.form.on('actioncomplete', dsReload.createDelegate(this.store));

      // Handle actionfailed event.
      this.form.on('actionfailed', function() {  });
    }

  }

});

Ext.reg('gridformbinding', Ext.ux.GridFormBinding);
