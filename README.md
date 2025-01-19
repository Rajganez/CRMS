# Candidate Referral Management System - Backend

This is the backend service for the **Candidate Referral Management System**, which manages candidate profiles, stores resumes in **AWS S3**, and saves the corresponding S3 links in a **MongoDB** database. The backend is built using **Node.js** and **Express.js**.

## Features

- **Candidate Management**: Add, Delete, and retrieve candidate details.
- **Resume Upload**: Upload resumes to **AWS S3** with secure and unique file naming.
- **Secure Storage**: Save the S3 URL of resumes in **MongoDB** for quick retrieval.
- **File Access**: Support for generating pre-signed URLs to securely share private resumes.
- **REST API**: Fully RESTful API built using **Express.js**.

---

## Environment Variables

The following environment variables need to be configured in a `.env` file:

```plaintext
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_REGION=your_aws_region
AWS_S3_BUCKET_NAME=your_s3_bucket_name
```

## Installation and Setup

1. Clone the repository:

```
git clone https://github.com/Rajganez/CRMS.git
```

2. Install dependencies:

```
npm install
```

3. Start the development server:

```
npm run dev
```

## API Endpoints

| **Method** | **Endpoint**             | **Description**                |
| ---------- | ------------------------ | ------------------------------ |
| `POST`     | `/candidates`            | Add a new candidate.           |
| `GET`      | `/candidates`            | Retrieve all candidates.       |
| `PUT`      | `/candidates/:id/status` | Update a candidate's status.   |
| `DELETE`   | `/candidates/:id`        | Remove a candidate.            |

## Postman Documentation

The tested API endpoints are documented and can be accessed via the following link:

[Postman API Documentation](https://documenter.getpostman.com/view/34103499/2sAYQakWHS)

---

## Live URL

Deployed Project can we viewed from below Link

[Live URL](https://workotaskbyraj.netlify.app/)

---