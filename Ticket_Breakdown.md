# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket 1 - Create FacilityAgents Table

- We will need to create a new table that maps the custom ID chosen by the facility to the agent's internal ID. This table should have three fields: facility_id (foreign key to Facility table), agent_id (foreign key to Agents table), and custom_id (a unique varchar/string).

- Ensure that the database changes all rolled out to all DB read replicas.

- This task will take about 30 minutes to complete.

### Ticket 2 - Create the business logic for getting, creating, updating, and deleting a Facility's custom agent ID

- This ticket is dependent on Ticket 1.

- Assuming we have an Express Node.js backend, we will need to create a new service with the functions that will perform the CRUD operations on the newly created FacilityAgents table. We will need to ensure that only an authenticated Facility may be able to access its own records. Facility A may not access or change Facility B's custom agent IDs.

- We will need a function for getting a list of agent custom IDs by facility ID.
- We will need a function for getting a custom ID by facility and agent ID.
- We will need a function for upserting a custom ID for a facility and agent. We will need to check the database if the custom ID has already been used or not.
- We will need a function for deleting a custom ID by facility and agent ID.
- We will need a function for batch getting custom IDs by facility and multiple agent IDs.

- This task will take about 1 hour to complete.

### Ticket 3 - Create the API endpoints for the new FacilityAgent CRUD methods

- This ticket is dependent on Ticket 2.

- Assuming we have a REST API, we will need to create the API endpoints for the client to access the business logic. These endpoints will need to require an Auth Bearer token to authorize that the user belongs to the specified facility. Each endpoint should return the retrieved or modified record. Each endpoint should return a 400 response if the facilityId or agentId do not match an existing facility/agent record. Each endpoint should return a 500 if there is an error or exception thrown.

- GET /facility/{facilityId}/customIds - Retrieves the list of custom Agent IDs for a given facility
- GET /facility/{facilityId}/agent/{agentId}/customId - Retrieves the custom ID for a given facility and agent ID
- PUT /facility/{facilityId}/agent/{agentId}/customId/{customId} - Upserts the custom ID for a given facility and agent ID
- DELETE /facility/{facilityId}/agent/{agentId}/customId - Deletes the custom ID for a given facility and agent ID
- POST /facility/{facilityId}/customIds - Batch gets the custom IDs for a specified array of agent IDs passed in as a JSON request body parameter.

- This task will take about 1 hour to complete.

### Ticket 4 - Create the UI for allowing Facilities to manage their Agent custom IDs

- This ticket is dependent on Ticket 3.

- Facilities need a way to be able to manage their agent's custom ID. There should be a new page called Custom Agent IDs. 
- We should display a table in the application with the following headers: Agent Internal ID, Agent Name, and Agent Custom ID. This table should be populated by the GET API request for listing custom Agent IDs for the facility.
- There should be a button labeled "Add Custom Agent ID" that opens a modal for the user to select an agent from a search enabled dropdown and a text field for "Custom ID". There should be a "Save" button that sends a PUT request to upsert the custom ID. Once the custom ID is created, the table should refresh and display the record.
- There should be an "Update" button on each row that allows the user to change the custom Agent ID.
- There should be a "Delete" button on each row that allows the user to delete the custom Agent ID.
- The text field for the custom ID should have a max limit of 45 characters and cannot allow duplicates.

- This task will take about 2 hours to complete.

### Ticket 5 - Update the getShiftsByFacility function to return the custom agent ID for each agent

- This ticket is dependent on Ticket 3.

- We will need to update the getShiftsByFacility function so that it includes the custom agent ID for each agent in each shift. We will need to reduce the agents of the shifts into a single map of agents and batch get their custom IDs. The agent data should include the custom ID field if it was found.

- This task will take about 30 minutes to complete.

### Ticket 6 - Update the generateReport function to display the custom ID for an agent if it exists

- This ticket is dependent on Ticket 3.

- If the Facility has specified a custom ID for an agent, we will need to display that instead of their internal ID in the report. Modify the generateReport function so that it calls the business logic for querying the FacilityAgents table to check if there is a custom ID for each agent of each shift in the report. If the custom ID exists, display it in the PDF report instead of the internal ID. 

- This task will take about 30 minutes to complete.