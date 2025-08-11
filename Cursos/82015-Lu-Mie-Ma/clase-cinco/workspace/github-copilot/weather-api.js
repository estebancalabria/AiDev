/*
High Level Goal
Generar una API con Node.js y Express que devuelva información del clima
Los endpoints que manejamos son:
    - GET /weather: Obtener el clima actual (datos simulados)
    - GET /weather/:city: Obtener el clima de una ciudad específica
    - GET /weather/forecast/:city: Obtener pronóstico de 5 días para una ciudad
Debe soportar CORS y tener datos de ejemplo en memoria
*/

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Datos simulados del clima
const weatherData = {
    "madrid": {
        city: "Madrid",
        country: "Spain",
        temperature: 22,
        humidity: 65,
        windSpeed: 15,
        condition: "Soleado",
        description: "Cielo despejado con algunas nubes",
        icon: "☀️"
    },
    "barcelona": {
        city: "Barcelona",
        country: "Spain", 
        temperature: 25,
        humidity: 70,
        windSpeed: 12,
        condition: "Parcialmente nublado",
        description: "Nubes dispersas",
        icon: "⛅"
    },
    "buenos_aires": {
        city: "Buenos Aires",
        country: "Argentina",
        temperature: 18,
        humidity: 75,
        windSpeed: 10,
        condition: "Lluvioso",
        description: "Lluvia ligera",
        icon: "🌧️"
    },
    "mexico_city": {
        city: "Ciudad de México",
        country: "México",
        temperature: 20,
        humidity: 60,
        windSpeed: 8,
        condition: "Nublado",
        description: "Cielo nublado",
        icon: "☁️"
    }
};

// Datos de pronóstico simulado (5 días)
const forecastData = {
    "madrid": [
        { day: "Hoy", temperature: 22, condition: "Soleado", icon: "☀️" },
        { day: "Mañana", temperature: 24, condition: "Parcialmente nublado", icon: "⛅" },
        { day: "Miércoles", temperature: 21, condition: "Nublado", icon: "☁️" },
        { day: "Jueves", temperature: 19, condition: "Lluvioso", icon: "🌧️" },
        { day: "Viernes", temperature: 23, condition: "Soleado", icon: "☀️" }
    ],
    "barcelona": [
        { day: "Hoy", temperature: 25, condition: "Parcialmente nublado", icon: "⛅" },
        { day: "Mañana", temperature: 26, condition: "Soleado", icon: "☀️" },
        { day: "Miércoles", temperature: 24, condition: "Soleado", icon: "☀️" },
        { day: "Jueves", temperature: 23, condition: "Nublado", icon: "☁️" },
        { day: "Viernes", temperature: 27, condition: "Soleado", icon: "☀️" }
    ],
    "buenos_aires": [
        { day: "Hoy", temperature: 18, condition: "Lluvioso", icon: "🌧️" },
        { day: "Mañana", temperature: 16, condition: "Lluvioso", icon: "🌧️" },
        { day: "Miércoles", temperature: 20, condition: "Nublado", icon: "☁️" },
        { day: "Jueves", temperature: 22, condition: "Parcialmente nublado", icon: "⛅" },
        { day: "Viernes", temperature: 24, condition: "Soleado", icon: "☀️" }
    ],
    "mexico_city": [
        { day: "Hoy", temperature: 20, condition: "Nublado", icon: "☁️" },
        { day: "Mañana", temperature: 22, condition: "Parcialmente nublado", icon: "⛅" },
        { day: "Miércoles", temperature: 25, condition: "Soleado", icon: "☀️" },
        { day: "Jueves", temperature: 23, condition: "Soleado", icon: "☀️" },
        { day: "Viernes", temperature: 21, condition: "Nublado", icon: "☁️" }
    ]
};

// GET /weather - Obtener clima general (Madrid por defecto)
app.get('/weather', (req, res) => {
    res.json({
        message: "API del Clima - Datos actuales",
        defaultCity: weatherData.madrid,
        availableCities: Object.keys(weatherData)
    });
});

// GET /weather/:city - Obtener clima de una ciudad específica
app.get('/weather/:city', (req, res) => {
    const city = req.params.city.toLowerCase().replace(/\s+/g, '_');
    const cityWeather = weatherData[city];
    
    if (!cityWeather) {
        return res.status(404).json({
            error: 'Ciudad no encontrada',
            availableCities: Object.keys(weatherData),
            message: 'Por favor, usa una de las ciudades disponibles'
        });
    }
    
    // Simular variación en los datos (temperatura ±3 grados)
    const variation = Math.floor(Math.random() * 7) - 3;
    const currentWeather = {
        ...cityWeather,
        temperature: cityWeather.temperature + variation,
        timestamp: new Date().toISOString(),
        lastUpdated: new Date().toLocaleString('es-ES')
    };
    
    res.json(currentWeather);
});

// GET /weather/forecast/:city - Obtener pronóstico de 5 días
app.get('/weather/forecast/:city', (req, res) => {
    const city = req.params.city.toLowerCase().replace(/\s+/g, '_');
    const cityForecast = forecastData[city];
    
    if (!cityForecast) {
        return res.status(404).json({
            error: 'Pronóstico no disponible para esta ciudad',
            availableCities: Object.keys(forecastData),
            message: 'Por favor, usa una de las ciudades disponibles'
        });
    }
    
    res.json({
        city: weatherData[city]?.city || city,
        country: weatherData[city]?.country || 'Unknown',
        forecast: cityForecast,
        generatedAt: new Date().toISOString()
    });
});

// Endpoint adicional: POST /weather/city - Agregar nueva ciudad (simulado)
app.post('/weather/city', (req, res) => {
    const { city, country, temperature, condition, humidity, windSpeed } = req.body;
    
    if (!city || !country || temperature === undefined) {
        return res.status(400).json({
            error: 'Datos incompletos',
            required: ['city', 'country', 'temperature']
        });
    }
    
    const cityKey = city.toLowerCase().replace(/\s+/g, '_');
    const newWeatherData = {
        city,
        country,
        temperature,
        humidity: humidity || 50,
        windSpeed: windSpeed || 10,
        condition: condition || 'Desconocido',
        description: `Clima en ${city}`,
        icon: '🌤️'
    };
    
    weatherData[cityKey] = newWeatherData;
    
    res.status(201).json({
        message: 'Ciudad agregada exitosamente',
        data: newWeatherData
    });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`🌤️ API del Clima corriendo en http://localhost:${PORT}`);
    console.log('\nEndpoints disponibles:');
    console.log('  GET  /weather                    - Información general');
    console.log('  GET  /weather/:city             - Clima actual de una ciudad');
    console.log('  GET  /weather/forecast/:city    - Pronóstico 5 días');
    console.log('  POST /weather/city              - Agregar nueva ciudad');
    console.log('\nCiudades disponibles:', Object.keys(weatherData).join(', '));
});

module.exports = app;