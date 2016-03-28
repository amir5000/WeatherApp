import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import _ from 'lodash';
import GoogleMaps from '../components/google_map';

class WeatherList extends Component {
  renderWeather(cityData, i) {
    const cityName = cityData.city.name;
    const temps = _.map(cityData.list.map(weather => weather.main.temp), (temp) => (temp - 273.15) * 1.8000 + 32 );
    const pressures = cityData.list.map(weather => weather.main.pressure);
    const humidities = cityData.list.map(weather => weather.main.humidity);
    const {lon, lat} = cityData.city.coord;

    return (
      <tr key={cityName}>
        <td><GoogleMaps lon={lon} lat={lat} /><h6 className="text-center">{cityName}</h6></td>
        <td><Chart data={temps} color="orange" units="F" /></td>
        <td><Chart data={pressures} color="green" units="hPa"  /></td>
        <td><Chart data={humidities} color="purple" units="%"  /></td>
      </tr>
    );
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature (F)</th>
            <th>Pressure (hPa)</th>
            <th>Humidity (%)</th>
          </tr>
        </thead>
        <tbody>
          {this.props.weather.map(this.renderWeather)}
        </tbody>
      </table>
    );
  }
}

function mapStateToProps({ weather }) {
  return {weather};
}

export default connect(mapStateToProps)(WeatherList);
