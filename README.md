# Sensor Dash Backend

## Description

This is a backend API for a single-page application (SPA) designed to display sensor data in a dashboard.

## Table of Contents

- [Sensor Dash Backend](#sensor-dash-backend)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)
    - [Auth Routes: `/sensor-dash/v1/auth...`](#auth-routes-sensor-dashv1auth)
    - [Sensor Data Routes: `/sensor-dash/v1/sensor-data...`](#sensor-data-routes-sensor-dashv1sensor-data)
    - [Device Routes: `/sensor-dash/v1/devices...`](#device-routes-sensor-dashv1devices)
  - [Features](#features)
  - [Contributing](#contributing)
  - [License](#license)

## Installation

To install Sensor Dash, follow these steps:

1. Clone this repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd sensor-dash`
3. Install dependencies: `npm install`

## Usage

To use Sensor Dash, follow these guidelines:

1. Start the server: `npm start`
2. Access the API endpoints using a REST client or integrate them with your single-page application.

## API Endpoints

### Auth Routes: `/sensor-dash/v1/auth...`

- **<font color="#3b82f6">POST</font> `/register`**: Register a new user.
- **<font color="#3b82f6">POST</font> `/login`**: Login a user.
- **<font color="#ef4444">DELETE</font> `/logout`**: Logout a user.
- **<font color="#3b82f6">POST</font> `/forgot-password`**: Request password reset.
- **<font color="#3b82f6">POST</font> `/verify`**: Verify email address.
- **<font color="#3b82f6">POST</font> `/resend-verification`**: Resend email verification.
- **<font color="#3b82f6">POST</font> `/reset-password`**: Reset password.
- **<font color="#3b82f6">POST</font> `/change-password`**: Change password.
- **<font color="#10b981">GET</font> `/me`**: Get user details.
- **<font color="#ef4444">DELETE</font> `/:id`**: Delete user.
- **<font color="#10b981">GET</font> `/getall`**: Get all users.

### Sensor Data Routes: `/sensor-dash/v1/sensor-data...`

- **<font color="#10b981">GET</font> `/`**: Get all sensor data entries of a particular device.
- **<font color="#3b82f6">POST</font> `/add`**: Add new sensor data entry.
- **<font color="#10b981">GET</font> `/:id`**: Retrieve single sensor data entry.
- **<font color="#ef4444">DELETE</font> `/:id`**: Delete sensor data entry.

### Device Routes: `/sensor-dash/v1/devices...`

- **<font color="#10b981">GET</font> `/`**: Retrieve all devices.
- **<font color="#3b82f6">POST</font> `/add `**: Add new device.
- **<font color="#ef4444">DELETE</font> `/:id`**: Delete device.

For detailed information on each endpoint and their parameters, refer to the API documentation.

## Features

- [x] Authentication for secure access
- [ ] API endpoints for retrieving/storing sensor data collected from devices
- [ ] API endpoints for managing devices registered to users
- [ ] Real-time data streaming of sensor data using WebSockets
- [ ] Support for filtering and sorting sensor data (e.g. timezone or timestamps)
- [ ] Retrieve and set user preferences/settings for frontend UX

## Contributing

Contributions are welcome! To contribute to Sensor Dash, follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature`
3. Make your changes and commit them: `git commit -am 'Added new feature'`
4. Push to the branch: `git push origin feature`
5. Submit a pull request.

## License

Sensor Dash is licensed under the [MIT License](LICENSE).
