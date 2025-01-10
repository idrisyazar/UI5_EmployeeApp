sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageBox"],
  function (Controller) {
    "use strict";

    return Controller.extend("employee.app.controller.EmployeeList", {
      onInit: function () {
        const oModel = this.getOwnerComponent().getModel(); // Ensure the global model is correctly loaded
        if (!oModel) {
          console.log("Model is not available.");
        } else {
          console.log("Model loaded successfully:", oModel.getData());
        }
        this.getView().setModel(oModel);
      },

      onAvatarPressed: function () {
        sap.m.MessageToast.show("Avatar pressed!");
      },

      onLogoPressed: function () {
        sap.m.MessageToast.show("Logo pressed!");
      },

      calculateAge: function (birthdate) {
        const today = new Date();
        const bdate = new Date(birthdate);
        let age = today.getFullYear() - bdate.getFullYear();
        const month = today.getMonth() - bdate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < bdate.getDate())) {
          age--;
        }
        return age;
      },

      onAddEmployee: function () {
        const oView = this.getView();
        const oModel = oView.getModel();

        // Get values from the form inputs
        const name = oView.byId("nameInput").getValue();
        const age = oView.byId("ageInput").getValue();
        const dob = oView.byId("dobInput").getValue();
        const address = oView.byId("addressInput").getValue();
        const city = oView.byId("cityInput").getValue();
        const country = oView.byId("countryInput").getValue();
        const temperature = oView.byId("temperatureInput").getValue();

        // Validate and process the inputs
        if (!name || !age || !dob || !address || !city || !temperature) {
          //sap.m.MessageToast.show("Please fill all required fields");
          sap.m.MessageBox.warning("Please fill all required fields");
          return; // Return early if any required field is missing
        }

        // Get the existing employees array
        const employees = oModel.getProperty("/employees");
        // Get the maximum employee number from existing data or set it to 0 if the array is empty
        const maxEmployeeNumber = employees.reduce(
          (max, employee) => Math.max(max, employee.empId),
          0
        );

        // Create a new employee object
        const newEmployee = {
          empId: maxEmployeeNumber + 1, // Auto-increment the number
          name: name,
          age: age,
          dob: dob,
          address: address,
          city: city,
          country: country,
          temperature: temperature,
        };

        // Add the new employee to the array
        employees.push(newEmployee);

        //Message after successfully adding
        //sap.m.MessageToast.show("Employee added successfully!");
        sap.m.MessageBox.success("Employee added successfully!");

        // Update the model with the new employee list
        oModel.setProperty("/employees", employees);

        // Refresh the model to notify the table of the changes
        this.getView().byId("employeeTable").getBinding("items").refresh(); // This will notify the table that the data has been updated

        // Clear the form after adding the new employee
        oView.byId("nameInput").setValue("");
        oView.byId("ageInput").setValue("");
        oView.byId("dobInput").setValue("");
        oView.byId("addressInput").setValue("");
        oView.byId("cityInput").setValue("");
        oView.byId("countryInput").setValue("");
        oView.byId("temperatureInput").setValue("");

        // Optionally, you can focus the first input field after clearing the form
        oView.byId("nameInput").focus();
      },

      onSelectEmployee: function (oEvent) {
        // Get the selected row (ColumnListItem)
        const oSelectedItem = oEvent.getSource();
        const oContext = oSelectedItem.getBindingContext(); // Get the binding context of the clicked row
        const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        const oSelectedEmployee = oContext.getObject(); // Fetch the data object for the selected row

        // Log for debugging
        console.log("Selected Employee on Row Click:", oSelectedEmployee);

        // Store the selected employee in the model for detail view
        const oModel = this.getView().getModel();
        oModel.setProperty("/selectedEmployee", oSelectedEmployee);

        // Navigate to the detail view
        oRouter.navTo("detail");
      },
    });
  }
);
