# Data Kapellmeister

## Overview

**Data Kapellmeister** is a data analyzing tool designed to offer an integrated solution for importing, wrangling, exploring, and visualizing data, with the added capability of exporting cleaned datasets and visualization results. By streamlining these processes, it aims to reduce the time and complexity involved in preparing data for analysis and visualization, making it an invaluable resource for data analysts, scientists, and anyone involved in data-driven decision-making.

### Problem

Data analysis often involves a cumbersome process of handling various data formats, cleaning data, performing exploratory analysis, and visualizing findings. These tasks typically require switching between multiple tools and programming libraries, leading to inefficiencies and a steep learning curve for new users. Data Kapellmeister addresses these pain points by providing a unified platform that simplifies the data analysis workflow, making it more accessible and efficient.

### User Profile

The primary users of Data Kapellmeister will be data analysts, scientists, researchers, and students engaged in data-intensive projects. These users require a tool that can handle diverse datasets, offer insights with minimal effort, and visualize data in a meaningful way. Special considerations for the app include ease of use, support for common data formats like CSV, and the ability to perform complex data transformations and visualizations without extensive programming knowledge.

### Features

* **Importing Data**: Load CSV files, read and display data with options to customize the number of rows shown, and add headers if missing.
* **Basic Insights**: Check data types for compatibility, and provide statistical summaries to identify potential issues.
* **Data Wrangling**: Identify and handle missing values, format data correctly, and clean data for analysis.
* **Exploratory Data Analysis**: Perform correlation analysis to explore relationships between variables.
* **Data Visualization**: Creating charts and dashboards with user-friendly options.
* **Exporting Results**: Export cleaned data, charts, and dashboards for further use or presentation.

## Implementation

### Tech Stack

* **Frontend**:
  * **React**: Used for building the interactive user interface.
  * **Axios**: Handles HTTP requests to the backend.
  * **Sass**: Enhances CSS styling capabilities.
  * **html2canvas**: Enables capturing screenshots of web content as images.
  * **jsPDF**: Allows for generating PDF documents from web content.
* **Backend**:
  * **Node.js** and **Express**: Form the core of the server-side logic.
  * **Multer**: Manages file uploads, specifically for handling CSV file input.
  * **csv-parser**: Parses CSV files, enabling easy manipulation and analysis of tabular data.
  * **uuid**: Generates unique identifiers for each dataset, ensuring data integrity and easy retrieval.
* **Visualization**:
  * **Chart.js**: Creates dynamic and responsive data visualizations, offering a wide range of chart types for comprehensive data analysis.

### APIs

Data Kapellmeister currently facilitates data import through a straightforward file upload form, supporting CSV files. This feature enables users to easily upload datasets from their local system for analysis. While direct API integration with external data sources is not available in the initial release, the application's file upload capability ensures a seamless data input process, catering to a broad user base. Future updates may expand this functionality to include additional data import options and integrations with external data platforms.

### Sitemap

* **Upload** Component: Where users can upload CSV files.
* **Quality** Component: Displays quality metrics of uploaded data.
* **Statistics** Component: Shows basic statistical analysis of the data.
* **Chart** Component: Allows users to configure visualization type, create and view a single chart.
* **Dashboard** Component: Allows users to configure visualization type, create and view dashboards.
* **Export** Component: Enables users to select specific results, such as a dataframe, data visualizations, to save and export for external use.

### Mockups

Here is the mockup showcasing the core functionality.
![How-to](/client/src/assets/images/about.gif)

### Data

The app will handle datasets uploaded by users, focusing on the relationships between different data columns for analysis and visualization.

### Endpoints

- /upload: Upload CSV files.
- /quality: Calculate data quality metrics.
- /statistics: Generate basic statistical summaries.
- /visualization: Configure and display visualizations.
- /export: Export dataframes, visualizations, or dashboards.

## Roadmap

- Day 1: Setup project structure, implement file upload and basic data display functionality.
- Day 2: Develop data quality and statistics calculation features.
- Day 3: Implement data wrangling features and exploratory data analysis tools.
- Day 4: Create data visualization functionality.
- Day 5: Testing, debugging, and refining user experience.
- Day 6: Final touches, documentation, and deployment.

## Nice-to-haves

1. Support for Multiple File Formats: Expanding the app's capability to import data from various file formats beyond CSV, including Excel (.xlsx), JSON, and text files (.txt). This would make the tool more versatile and user-friendly, accommodating a wider range of data sources and types.

2. Integration of Predictive Analysis Models: Implementing a suite of basic machine learning models for predictive analysis directly within the application. Users could select a model, configure it with their data, and run predictions without needing a separate tool or extensive programming knowledge. This feature would transform Data Kapellmeister from a data visualization and exploration tool into a more comprehensive data science platform.

