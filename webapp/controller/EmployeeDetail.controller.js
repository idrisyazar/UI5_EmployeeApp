sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
  "use strict";
  return Controller.extend("employee.app.controller.EmployeeDetail", {
    onInit: function () {
      const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter
        .getRoute("detail")
        .attachPatternMatched(this._onObjectMatched, this);
    },

    _onObjectMatched: function (oEvent) {
      const oModel = this.getView().getModel(); // Get the model for binding
      const selectedEmployee = oModel.getProperty("/selectedEmployee");

      // Ensure you have a valid employee object to bind
      if (selectedEmployee) {
        // Bind the current element context to the selected employee data
        const oBindingContext = new sap.ui.model.Context(
          oModel,
          "/selectedEmployee"
        );
        this.getView().setBindingContext(oBindingContext); // Set the binding context for the view
      } else {
        // If no employee data found, handle the case (optional)
        sap.m.MessageToast.show("No employee data available");
      }
    },
    // Add this function for back navigation
    onNavBack: function () {
      const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.navTo("list", {}, true); // Navigate back to employee list
    },
  });
});
