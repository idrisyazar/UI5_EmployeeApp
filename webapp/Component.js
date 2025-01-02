sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/ui/model/json/JSONModel",
  "sap/ui/core/Fragment",
  "sap/ui/model/odata/v2/ODataModel",
  "sap/ui/core/routing/History"
], function (UIComponent, JSONModel, Fragment, ODataModel, History) {
  "use strict";

  return UIComponent.extend("employee.app.Component", {
      metadata: {
          manifest: "json"  // Ensures the app uses the manifest configuration for routing and models
      },

      init: function () {
          // Initialize the parent component (loads all manifest configurations)
          UIComponent.prototype.init.apply(this, arguments);

          // Initialize the router
          this.getRouter().initialize();  // Start the router
      },

      // This is necessary to handle back navigation from the detail view to the list view
      exit: function () {
          // Destroy any fragments or other resources when the app is destroyed
          UIComponent.prototype.exit.apply(this, arguments);
      }
  });
});
