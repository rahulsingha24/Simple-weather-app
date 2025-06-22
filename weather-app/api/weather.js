export default async function (request, response) {
  const apiKey = process.env.WEATHER_API_KEY;
  const location = request.query.location;

  if (!location) {
    return response.status(400).json({ error: 'Location is required' });
  }

  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}&aqi=no`;

  try {
    const apiResponse = await fetch(apiUrl);
    if (!apiResponse.ok) {
      const errData = await apiResponse.json();
      return response.status(500).json({ error: errData.error?.message || 'Weather API error' });
    }
    const data = await apiResponse.json();
    response.status(200).json(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    response.status(500).json({ error: 'Could not retrieve weather data' });
  }
}
