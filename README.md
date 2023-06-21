## Residents Management System

This project is a Residents Management System built using React for the frontend and AWS services for the backend. It allows users to perform CRUD (Create, Read, Update, Delete) operations on a list of residents stored in Amazon DynamoDB. The backend is powered by AWS API Gateway and AWS Lambda functions.

### Features

- Add new residents: Users can add new residents to the system by providing their name and surname. The system utilizes AWS API Gateway and AWS Lambda functions to handle the creation of residents in the DynamoDB database.

- Update resident information: Users can update the name and surname of existing residents. The system leverages AWS API Gateway and AWS Lambda functions to handle the updating of resident information in the DynamoDB database.

- Delete residents: Users can delete residents from the system. The deletion process is facilitated by AWS API Gateway and AWS Lambda functions, which interact with the DynamoDB database to remove the selected resident.

- View resident list: The system displays a table that shows the list of residents, including their name and surname. The frontend retrieves the resident data by making API requests to the backend AWS services.

### Technologies Used

- React: A popular JavaScript library for building user interfaces.
- Amazon DynamoDB: A fully managed NoSQL database service provided by AWS, used to store the resident data.
- AWS API Gateway: A fully managed service that makes it easy for developers to create, publish, maintain, monitor, and secure APIs.
- AWS Lambda: A serverless computing service that runs code in response to events, used to implement the backend logic for handling CRUD operations on the residents.
- AWS SDK: The AWS SDK for JavaScript is used to interact with AWS services from the frontend application.
- Material-UI: A UI component library for React that provides pre-built, customizable components following the Material Design guidelines.
- CSS: Custom CSS styles are used to enhance the visual presentation of the application.

### How to Use

1. Clone the project repository.
2. Set up an Amazon DynamoDB table to store the resident data.
3. Configure the AWS API Gateway endpoints and integrate them with the respective AWS Lambda functions.
4. Update the frontend code to use the correct API endpoints and AWS SDK configuration.
5. Install the dependencies by running `npm install` or `yarn install`.
6. Run the application using `npm start` or `yarn start`.
7. Access the application in your browser at `http://localhost:3000`.

### Credits

This project was created by Ivan Kabar. It utilizes various AWS services and open-source libraries.
