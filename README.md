# 🍔 Burak Restaurant Platform (Frontend)

A modern, responsive Single Page Application (SPA) built using React and Material UI (MUI Joy/Material) to simulate an online restaurant ordering system. This project demonstrates mastery of client-side routing, advanced state management, and reusable component architecture.

<img width="606" height="773" alt="image" src="https://github.com/user-attachments/assets/31912138-0af2-49eb-88e7-90ef8003ad43" />

## 🛠️ Key Technologies & Libraries

* **Frontend Framework:** React (Functional Components & Hooks)
* **Styling & UI:** Material UI (MUI v5+)
    * *Note:* Integrated both MUI Material (Layout) and MUI Joy (Custom Components).
* **Routing:** React Router DOM (v5+ for Nested Routing)
* **State Management:** Redux Toolkit (RTK) 
* **Language:** TypeScript
* **CSS:** Styled Components (for reusable, dynamic dividers/separators)
* **Carousel:** Swiper.js (for interactive galleries/events)
* **File Uploads (Backend Contract):** Multer (The application contract expects Multer to handle multipart/form-data and inject req.file/req.files).

## 🗺️ Application Screen Architecture (Sitemap)

The project consists of 6 core screen components, designed to manage the full customer journey from browsing to ordering. This structure confirms our use of **Client-Side Routing** and **Nested Views**.

Home Page - The main landing view featuring the full-width banner, event carousels, and statistics - Single primary view.
Products Page - The main product list view, featuring category filters, search bar, and pagination - Nested Detail View: ChosenProduct (/products/:id).
Orders Page - The user's order dashboard, presented in a two-column layout with a dynamic payment panel - Tabbed Interface: Shows Paused, Process, and Finished orders (using MUI TabContext).
My Page - The user's personal profile and settings area - Single primary view.
Help Page - General support and informational content - Includes sub-sections for Terms & Conditions and Contact Info.

### 💡 Highlight: Efficiency in Order Management
"For the **Orders Page**, we implemented a specialized dashboard where each status view (Paused, Process, Finished) is controlled by a single state variable. This use of the MUI **`TabContext`** allows for **efficient content switching** without re-fetching or unmounting components, resulting in a very fast user experience."


## 🚀 Getting Started

To clone and run this project locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/shox17/burak-react.git
    cd burak-react
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install
    ```
3.  **Start the development server:**
    ```bash
    npm run start
    # or yarn run start
    ```
<img width="1148" height="613" alt="image" src="https://github.com/user-attachments/assets/52798c61-c91d-4452-9a9c-36265742988c" />

<img width="1111" height="367" alt="image" src="https://github.com/user-attachments/assets/64cb6751-df77-443b-8330-0dc75f499464" />

<img width="601" height="681" alt="image" src="https://github.com/user-attachments/assets/0e88bfce-0523-4133-9144-5c5f4715cac1" />

<img width="1107" height="413" alt="image" src="https://github.com/user-attachments/assets/ebe0beec-f23b-4be6-9714-a8fc8a9d2e95" />
   
