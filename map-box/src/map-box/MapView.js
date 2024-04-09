import React, { useEffect, useRef, useState } from "react";
import ReactMapboxGl, { Feature, Layer, Source } from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const Map = ReactMapboxGl({
  accessToken: MAPBOX_TOKEN,
});

const MapView = () => {
  const [polygons, setPolygons] = useState([]);

  useEffect(() => {
    // Mock data for polygons
    const data = [
      {
        id: "bea6cfd7d9b106c5ec0d6a84db146fae",
        type: "Feature",
        properties: {},
        geometry: {
          coordinates: [
            [
              [73.7979084568687, 18.551435230602564],
              [73.93317762190759, 18.54134495445247],
              [73.87549939925199, 18.416632135207763],
              [73.77318921858807, 18.40848846119016],
              [73.77490583235758, 18.412397472807825],
              [73.78486219222026, 18.4244496996794],
              [73.7979084568687, 18.551435230602564],
            ],
          ],
          type: "Polygon",
        },
      },
    ];
    setPolygons(data);
  }, []);

  const [payload, setPayload] = useState({ name: "" });
  const onDrawCreate = ({ features }) => {
    console.log(features);
  };

  const onDrawUpdate = ({ features }) => {
    console.log(features);
  };

  const onDrawDelete = ({ features }) => {
    console.log(features);
  };

  const handleChange = (e) => {
    setPayload({ ...payload, name: e });
    console.log(e);
  };
  const handleClick = (e) => {
    e.preventDefault();
    // console.log('clicked');
  };

  console.log(polygons);

  return (
    <div>
      <h2>Welcome to react-mapbox-gl-draw</h2>
      <Map
        style="mapbox://styles/mapbox/streets-v9" // eslint-disable-line
        center={[73.85453323244155, 18.51348783194281]}
        containerStyle={{
          height: "600px",
          width: "100vw",
        }}
      >
        <DrawControl
          onDrawCreate={onDrawCreate}
          onDrawUpdate={onDrawUpdate}
          onDrawDelete={onDrawDelete}
        />
        {polygons?.map((polygon) => (
          <Layer
            key={polygon.id}
            type="fill"
            id={`polygon-${polygon.id}`}
            paint={{ "fill-color": "#f00", "fill-opacity": 0.5 }}
          >
            <Feature coordinates={polygon.geometry.coordinates} />
          </Layer>
        ))}
      </Map>
      <input
        placeholder="Enter Polygon Name"
        type="text"
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      ></input>
      <button onClick={handleClick}>Click</button>
    </div>
  );
};

export default MapView;
