
const express = require('express');
const app = express();

// Middleware to add CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Your API routes and logic go here

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log('Server is running on port ${port}');
});
function authenticate() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Make a fetch request to the authentication API
  fetch('https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          login_id: username,
          password: password,
      }),
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`Authentication failed: ${response.status}`);
      }
      return response.json();
  })
  .then(data => {
      const token = data.token;
      // Save the token or use it for subsequent API calls
      // You can also update the UI or perform other actions after successful authentication
      console.log('Authentication successful. Bearer token:', token);

      // Fetch customer list after successful authentication
      fetchCustomerList();
  })
  .catch(error => {
      console.error('Authentication error:', error.message);
  });
}

function fetchCustomerList() {
  const token = 'dGVzdEBzdW5iYXNlZGF0YS5jb206VGVzdEAxMjM='; // Replace with the actual token obtained during authentication

  // Make a fetch request to get the customer list
  fetch('https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list', {
      method: 'GET',
      headers: {
          'Authorization': 'Bearer ${token}',
      },
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`Failed to fetch customer list: ${response.status}`);
      }
      return response.json();
  })
  .then(data => {
      // Assuming the response is an array of customer objects
      const customerList = data;
      // Update the UI or perform other actions with the customer list
      console.log('Customer list:', customerList);
  })
  .catch(error => {
      console.error('Fetch customer list error:', error.message);
  });
}

function createCustomer() {
  const token = 'dGVzdEBzdW5iYXNlZGF0YS5jb206VGVzdEAxMjM='; // Replace with the actual token obtained during authentication
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;

  // Make a fetch request to create a new customer
  fetch('https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=create', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          // Include other customer data
      }),
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`Failed to create customer: ${response.status}`);
      }
      return response.json();
  })
  .then(data => {
      console.log('Customer created successfully:', data);
      // Optionally update the UI or perform other actions after successful creation
      // Fetch customer list again after creating a new customer
      fetchCustomerList();
  })
  .catch(error => {
      console.error('Create customer error:', error.message);
  });
}

function updateCustomer() {
  const token = 'dGVzdEBzdW5iYXNlZGF0YS5jb206VGVzdEAxMjM='; // Replace with the actual token obtained during authentication
  const updateUuid = document.getElementById('updateUuid').value;
  const updateFirstName = document.getElementById('updateFirstName').value;
  const updateLastName = document.getElementById('updateLastName').value;

  // Make a fetch request to update an existing customer
  fetch('https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=update&uuid=${updateUuid}', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
          first_name: updateFirstName,
          last_name: updateLastName,
          // Include other updated customer data
      }),
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`Failed to update customer: ${response.status}`);
      }
      return response.json();
  })
  .then(data => {
      console.log('Customer updated successfully:', data);
      // Optionally update the UI or perform other actions after successful update
      // Fetch customer list again after updating a customer
      fetchCustomerList();
  })
  .catch(error => {
      console.error('Update customer error:', error.message);
  });
}

function deleteCustomer() {
  const token = 'dGVzdEBzdW5iYXNlZGF0YS5jb206VGVzdEAxMjM='; // Replace with the actual token obtained during authentication
  const deleteUuid = document.getElementById('deleteUuid').value;

  // Make a fetch request to delete an existing customer
  fetch(`https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=delete&uuid=${deleteUuid}`, {
      method: 'POST',
      headers: {
          'Authorization': `Bearer ${token}`,
      },
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`Failed to delete customer: ${response.status}`);
      }
      return response.json();
  })
  .then(data => {
      console.log('Customer deleted successfully:', data);
      // Optionally update the UI or perform other actions after successful deletion
      // Fetch customer list again after deleting a customer
      fetchCustomerList();
  })
  .catch(error => {
      console.error('Delete customer error:', error.message);
  });
}
