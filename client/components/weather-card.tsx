import React from 'react';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Chip } from '@heroui/chip';
import { RacingEvent } from '@/types';

interface WeatherCardProps {
  weather: RacingEvent['weather'];
}

export const WeatherCard = ({ weather }: WeatherCardProps) => {
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return '☀️';
      case 'cloudy':
        return '☁️';
      case 'rain':
        return '🌧️';
      case 'storm':
        return '⛈️';
      case 'fog':
        return '🌫️';
      default:
        return '🌤️';
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return 'warning';
      case 'cloudy':
        return 'default';
      case 'rain':
        return 'primary';
      case 'storm':
        return 'danger';
      case 'fog':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="font-bold flex items-center gap-2">
          {getWeatherIcon(weather.condition)} Weather Conditions
        </h3>
      </CardHeader>
      <CardBody>
        <div className="space-y-3">
          <div>
            <Chip
              color={getConditionColor(weather.condition)}
              variant="flat"
              className="mb-2"
            >
              {weather.condition.charAt(0).toUpperCase() +
                weather.condition.slice(1)}
            </Chip>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-default-500">Air Temp:</span>
              <span className="font-medium">{weather.temperature}°C</span>
            </div>
            <div className="flex justify-between">
              <span className="text-default-500">Track Temp:</span>
              <span className="font-medium">{weather.trackTemperature}°C</span>
            </div>
            <div className="flex justify-between">
              <span className="text-default-500">Humidity:</span>
              <span className="font-medium">{weather.humidity}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-default-500">Wind:</span>
              <span className="font-medium">{weather.windSpeed} km/h</span>
            </div>
          </div>

          <div className="text-center text-sm text-default-500 pt-2 border-t border-default-200">
            Wind Direction:{' '}
            <span className="font-medium">{weather.windDirection}</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
