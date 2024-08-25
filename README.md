# Weather App

## Description

This Weather App is a Next.js-based web application that provides real-time weather information for various localities. It uses data from the Zomato API to fetch and display weather conditions, including temperature, humidity, wind speed, and more.

## Features

- Search for weather information by locality
- Real-time weather data display
- Dynamic weather backgrounds based on current conditions
- Responsive design for various screen sizes

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Zomato API for weather data

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/weather-app.git
   ```

2. Navigate to the project directory:
   ```
   cd weather-app
   ```

3. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

4. Create a `.env.local` file in the root directory and add your Zomato API key:
   ```
   NEXT_PUBLIC_ZOMATO_KEY=your_api_key_here
   ```

### Running the Application

To start the development server:
```
   npm run dev
   ```
   or
   ```
   yarn dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Project Structure

- `src/app`: Contains the main application pages and layouts
- `src/component`: React components used throughout the application
- `src/data`: Static data files (e.g., locality data)
- `public`: Static assets

## Key Components

- `SearchBox`: Handles user input and locality search functionality
- `WeatherBackground`: Displays weather information and dynamic backgrounds
- `localityData.js`: Contains the list of available localities and their coordinates

## Deployment

This project can be easily deployed on Vercel. For more information on deploying Next.js apps, refer to the [Next.js deployment documentation](https://nextjs.org/docs/deployment).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgements

- Weather data provided by Zomato API
- Created by Navneet Gupta (anavneetgupta@jklu.edu.in)