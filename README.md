
<p align="center">
  <a href="" rel="noopener">
    <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="Project logo">
  </a>
</p>

<h3 align="center">Interview Scheduler</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/AmanJain18/interview-scheduler.svg)](https://github.com/AmanJain18/interview-scheduler/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/AmanJain18/interview-scheduler.svg)](https://github.com/AmanJain18/interview-scheduler/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> A web-based application for managing interview schedules, allowing interviewers and candidates to view, schedule, edit, and reschedule interviews with ease.
    <br> 
</p>

[![Dashboard](/screenshots/home.png)](/screenshots/home.png)
<p align="center">Dashboard</p>

[![Schedule](/screenshots/schedule.png)](/screenshots/schedule.png)
<p align="center">Schedule Interview</p>

[![Calendar View](/screenshots/calendar.png)](/screenshots/calendar.png) 
<p align="center">Calender View</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [Design Decisions](#design_decisions)
- [Assumptions](#assumptions)
- [Challenges Faced](#challenges)
- [Future Improvements](#future)
- [Authors](#authors)

## 🧐 About <a name = "about"></a>

This project is an **Interview Scheduler** designed to help manage and schedule interviews efficiently. It provides a visual calendar interface for interview scheduling, supporting features like drag-and-drop scheduling, conflict validation, and interview rescheduling. The app also includes a form-based system for interview details input, supporting customizable working hours, and duration.

Develop a functional React application that allows HR/Recruiters to schedule, manage, and view interviews efficiently.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will help you set up and run the project locally for development and testing.

### Prerequisites

To run this project, you'll need to have the following software installed:

- **Node.js** (LTS version recommended) - You can download it from [here](https://nodejs.org/).
- **npm** (comes with Node.js) or **Yarn** for managing dependencies.

### Installing

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/AmanJain18/interview-scheduler.git
    ```

2. Navigate to the project directory:

    ```bash
    cd interview-scheduler
    ```

3. Install the dependencies:

    Using npm:
    ```bash
    npm install
    ```

    Or using yarn:
    ```bash
    yarn install
    ```

4. Run the development server:

    Using npm:
    ```bash
    npm run dev
    ```

    Or using yarn:
    ```bash
    yarn dev
    ```

5. Open your browser and visit `http://localhost:5173/` to view the app in action.

### Add coding style

This project follows a coding style that ensures consistency across the codebase. You can run the following command to ensure your code adheres to the style guide:

```bash
#eslint
npm run lint
```

```bash
# prettier
npm run format:fix
```

## 🚀 Deployment <a name = "deployment"></a>

To deploy this project on a live system:

1. Build the production version of the app:

    ```bash
    npm run build
    ```

2. Deploy the contents of the `build` directory to your preferred hosting provider (e.g., Netlify, Vercel, or AWS).

## 🎈 Usage <a name="usage"></a>

Once the application is running, you can perform the following actions:

- **Schedule a new interview**: Select a candidate, interviewer, date, and time to schedule an interview.
- **View the interview schedule**: See a calendar view of interviews for different days.
- **Reschedule an interview**: Drag and drop an existing interview to reschedule.
- **Edit an interview**: Click on an existing interview to update details such as time, date, or participant.
- **Validate conflicts**: The app will automatically check for conflicts in the schedule and prevent overlapping interviews.

## ⛏️ Built Using <a name = "built_using"></a>

- [React](https://reactjs.org/) - Frontend framework for building user interfaces
- [Vite](https://vitejs.dev/) - Build tool for fast development and production
- [Zustand](https://github.com/pmndrs/zustand) - State management library for managing interview data
- [React Big Calendar](https://github.com/jquense/react-big-calendar) - Calendar library for managing interview schedules
- [React Hook Form](https://react-hook-form.com/) - Form management library for easy validation and handling
- [Shadcn UI](https://ui.shadcn.com/) - Accessible and customizable UI components
- [React Router DOM](https://reactrouter.com/) - Routing library for navigation between pages
- [Zod](https://github.com/colinhacks/zod) - Schema validation library for validating form data
- [date-fns](https://date-fns.org/) - Date and time library for managing date and time-related operations

## 🖌️ Design Decisions <a name = "design_decisions"></a>

### State Management:
- **Zustand** is used for state management, providing a centralized store for interviews and interviewers.
- **zustand/middleware** is used for persisting the interview data to localStorage.

### UI Library:
- The project uses **Shadcn UI** for accessible and customizable UI components.

### Calendar Library:
- **React Big Calendar** is used to provide a visual calendar interface for viewing and managing interviews.

### Form Library:
- **React Hook Form** is used for efficient form management and validation.

### Validation:
- **Zod** is used for schema validation, ensuring data integrity.

### Routing:
- **React Router DOM** is used for navigating between different views (`Dashboard`, `Schedule`, `Edit`).

### Styling:
- The project uses **TailwindCSS - A utility-first CSS framework** for styling.

### Notifications:
- **Shadcn toast component** is used for providing user feedback through toast notifications.

## 🤔 Assumptions <a name = "assumptions"></a>

- **Interview Duration**: The application assumes a default interview duration of 1 hour. This can be customized in the InterviewForm component and the DateTimePicker component.
- **Single-Day Interviews**: Currently, interviews are scheduled for a single date and time slot. Multi-day or recurring interviews are not supported.
- **Working Hours**: The application uses pre-defined working hours (9:00 AM to 6:00 PM) for scheduling only available in weekdays. This can be adjusted in the DateTimePicker and relevant constant files.

## 🧠 Challenges Faced <a name = "challenges"></a>

- **Implementing Drag and Drop**: Integrating drag-and-drop functionality with React Big Calendar and updating the Zustand store required careful handling of event data and state updates.
- **Time Slot Management**: Dynamically calculating and displaying available time slots based on interviewer availability, selected date, and interview duration required implementing custom logic in the DateTimePicker component.
- **Conflict Validation**: Ensuring that interviews don't overlap for the same interviewer involves checking time slot boundaries and potential conflicts.

## 🔮 Future Improvements <a name = "future"></a>

- **Multi-Day Interviews**: Support scheduling interviews that span multiple days.

- **Interviewer Calendars**:  Integrate with external calendars (e.g., Google Calendar) to check for real-time interviewer availability.

- **Email Notifications**: Send notifications to candidates and interviewers about scheduled, rescheduled, or cancelled interviews.

## ✍️ Authors <a name = "authors"></a>

- [@AmanJain18](https://github.com/AmanJain18)

---
