Ext.ux.GridFormBinding = Ext.extend(Ext.Panel, {

  // Prototype default configuration.
  title: 'GridFormBinding container',

  initComponent: function() {

    // Apply configuration.
    Ext.apply(this, {
		frame: true,
		tbar: [{text: 'New'}, {text: 'Delete'}]

    });

    // Call superclass constructor.
    Ext.ux.GridFormBinding.superclass.initComponent.call(this, arguments);

    initForm.call(this);
    initGrid.call(this);

    // private methods

    // Add the grid component into the panel and configure it.
    function initGrid() {
      this.add(Ext.apply({
			   xtype: 'grid',
			   id: 'grid',
			   ds: this.ds,
			   sm: rsModel.call(this),
			   style: {
			     margin: '20px'
			   }
			 },
			 this.grid));
    }

    // Instantiate a RowSelectionModel object and attach to it a rowselect event.
    function rsModel() {

      // The currently selected id.
      var currId;

      // Create a RowSelectionModel object.
      var rsModel = new Ext.grid.RowSelectionModel({singleSelect: true});

      // Load record data in the form's fields when a 'rowselect' event occurs.
      rsModel.addListener('rowselect',
			  function(sm, row, rec) {
			    Ext.getCmp("form").getForm().loadRecord(rec);
	    		    this.currId = rec.data.id;
			  },
			  this);
      return rsModel;
    }

    // Add the form component into the panel and configure it.
    function initForm() {

      this.form = this.add(Ext.apply({
				       xtype: 'form',
				       id: 'form',
				       style: {
					 margin: '20px'
				       }
				     },
				     this.form));

      addButtons.call(this);
      attachReload.call(this);
    }

    // Add buttons to the form.
    function addButtons() {

      this.form.addButton({text: 'Create'},
			  function() {
			    this.form.getForm().submit({url:'/recipes/create.json', waitMsg:'Creating new item ...'});
    			  },
			  this);

      this.form.addButton({text: 'Update'},
			  function() {
			    this.form.getForm().submit({url:'/recipes/update/' + this.currId + '.json', waitMsg:'Updating item ...'});
			  },
			  this);

      this.form.addButton({text: 'Delete'},
			  function() {
			    this.form.getForm().submit({url:'/recipes/delete/' + this.currId + '.json', waitMsg:'Deleting item ...'});
			  },
			  this);
    }

    // Reload datastore when an actioncomplete event is triggered.
    function attachReload() {

      // Code block used to reloading datastore.
      // The block is called in the scope of this.
      var dsReload = function() {
	this.reload();
      };

      // Attach dsReload to actioncomplete event.

      this.form.on('actioncomplete', dsReload.createDelegate(this.ds));

      // Handle actionfailed event.
      this.form.on('actionfailed', function() {  });
    }

  },

  // Definition of a public method for the component.
  // But how to get access to component properties?

  aMethod: function() {
    alert('Public method.');
  }

});

Ext.reg('gridformbinding', Ext.ux.GridFormBinding);
