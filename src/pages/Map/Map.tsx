import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useQuery } from "@tanstack/react-query";

type CountryData = {
  country: string;
  active: number;
  recovered: number;
  deaths: number;
  countryInfo: {
    lat: number;
    long: number;
  };
};

const Map = () => {
  const { isLoading, error, data }: any = useQuery<CountryData[]>(
    ["countries"],
    () =>
      fetch("https://disease.sh/v3/covid-19/countries").then((res) =>
        res.json()
      )
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error?.message}</div>;
  }
  return (
    <div
      style={{
        height: "90vh",
      }}
      id="map"
    >
      <MapContainer
        className="markercluster-map"
        center={[51.0, 19.0]}
        zoom={4}
        maxZoom={18}
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {data.map((country: CountryData, index: number) => (
          <Marker
            position={[country.countryInfo.lat, country.countryInfo.long]}
            key={index}
          >
            <Popup>
              <div>
                <h3>{country.country}</h3>
                <p>Active: {country.active}</p>
                <p>Recovered: {country.recovered}</p>
                <p>Deaths: {country.deaths}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      {/* <MapContainer
        center={[33, 65]}
        zoom={3}
        style={{ height: "100vh", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {data?.map((country: CountryData) => (
          <Marker
            position={[country.countryInfo.lat, country.countryInfo.long]}
          >
            <Popup>
              <div>
                <h3>{country.country}</h3>
                <p>Active: {country.active}</p>
                <p>Recovered: {country.recovered}</p>
                <p>Deaths: {country.deaths}</p>
              </div>
            </Popup>
          </Marker>
        ))}

      </MapContainer> */}
    </div>
    // <MapContainer center={position}style={{ height: "100vh", width: "100%" }}>
    //   <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    //   {data?.map((country: CountryData) => (
    //     <Marker key={country.country} position={[0, 0]}>
    //       <Popup>
    //         <div>
    //           <h3>{country.country}</h3>
    //           <p>Active: {country.active}</p>
    //           <p>Recovered: {country.recovered}</p>
    //           <p>Deaths: {country.deaths}</p>
    //         </div>
    //       </Popup>
    //     </Marker>
    //   ))}
    // </MapContainer>
  );
};
export default Map;
