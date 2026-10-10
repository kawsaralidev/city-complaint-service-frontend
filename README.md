# City Complaint & Service Platform

A modern, role-based web application designed to simplify civic complaint management and city service requests. The platform connects citizens with city service officers and administrators through a centralized interface for reporting issues, tracking complaints, and managing public services.

## Overview

The City Complaint & Service Platform provides a digital solution for handling everyday civic issues. Citizens can submit complaints and request city services, while officers and administrators can access role-specific dashboards to manage operational activities.

The frontend focuses on a responsive user experience, structured navigation, reusable components, form validation, and API-driven data management.

## Key Features

### Authentication & Authorization

- User authentication and account management
- Google authentication integration
- Role-based access for Citizens, Officers, and Administrators
- Dedicated dashboards for each user role
- Protected application routes

### Citizen Dashboard

- Create and manage civic complaints
- View and track submitted complaints
- Browse available city services
- Submit and manage service requests
- Access citizen-specific dashboard features

### Officer Dashboard

- Access officer-specific dashboard features
- Manage assigned complaints and related workflows
- Review complaint information and status updates

### Admin Dashboard

- Manage users and user roles
- Manage complaint categories and city services
- Access administrative dashboards and management interfaces
- View reports and relevant operational information

### User Experience

- Responsive layouts for different screen sizes
- Reusable UI components and form elements
- Form validation and user-friendly feedback
- Loading, error, and empty states where implemented
- Toast notifications for user actions

## Technology Stack

| Technology         | Purpose                                   |
| ------------------ | ----------------------------------------- |
| Next.js App Router | Application routing and page architecture |
| React              | Component-based user interface            |
| TypeScript         | Type safety and maintainable code         |
| Tailwind CSS       | Responsive styling and UI development     |
| TanStack Query     | Server-state management and data fetching |
| React Hook Form    | Form state management                     |
| Zod                | Schema-based validation                   |
| ofetch             | HTTP requests to the backend API          |
| Sonner             | Toast notifications                       |

## Application Architecture

The application follows a modular, component-based structure using the Next.js App Router. Shared components, feature-specific UI, custom hooks, validation schemas, and API utilities are organized separately to improve maintainability and code reuse.

```text
src/
├── app/          # Routes, layouts, pages, and dashboards
├── components/   # Shared UI, forms, and feature components
├── hooks/        # Custom hooks and data-fetching logic
├── lib/          # API client, utilities, and validation schemas
├── providers/    # Application-level providers
└── types/        # Shared TypeScript types
```

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm
- A running instance of the City Complaint & Service Platform backend

### Installation

Clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd <project-directory>
npm install
```

### Environment Configuration

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

Update the API URL to match your backend configuration. The example assumes the backend is running locally on port `5000`.

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

## Backend Integration

The frontend communicates with the backend API for authentication, complaint management, service requests, and other platform operations. Features that depend on server data require a properly configured and accessible backend.

Authentication providers, API endpoints, and environment variables must be configured consistently between the frontend and backend.

## Project Goals

- Digitize civic complaint submission and tracking
- Improve access to city services
- Provide role-specific interfaces for citizens, officers, and administrators
- Maintain a responsive, organized, and maintainable frontend architecture

## Future Improvements

Potential improvements include enhanced accessibility, expanded reporting interfaces, additional automated tests, and further performance optimization.
