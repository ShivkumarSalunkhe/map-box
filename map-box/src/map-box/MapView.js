import React, { useEffect, useRef, useState } from "react";
import ReactMapboxGl, { Feature, Layer, Source } from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import PolygonListModal from "./PolygonListModal";
import Button from "react-bootstrap/esm/Button";
import Alert from "react-bootstrap/esm/Alert";


const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const API_URL = process.env.REACT_APP_API_URL;

const Map = ReactMapboxGl({
  accessToken: MAPBOX_TOKEN,
});

const MapView = () => {
  const [polygonsData, setPolygonsData] = useState([]);
  const [formData, setFormData] = useState({
    polygonName: "",
    polygonCoordinates: [],
  });
  const [modalShow, setModalShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false); // State for alert visibility



  // Function to fetch polygons data
  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/polygons`);
      if (!response.ok) {
        throw new Error("Failed to fetch polygons");
      }
      const data = await response.json();
      setPolygonsData(data);
    } catch (error) {
      console.error("Error fetching polygons:", error);
    }
  };

  // Function to post polygon data
  const postData = async (payload) => {
    try {
      const response = await fetch(`${API_URL}/polygons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Failed to post polygon");
      }
      // Optionally, you can fetch data again after posting
      setShowAlert(true); //
      fetchData();
    } catch (error) {
      console.error("Error posting polygon:", error);
    }
  };

  useEffect(() => {
    // Mock data for polygons
    fetchData();
  }, []);

  const onDrawCreate = ({ features }) => {
    setFormData((prevData) => ({ ...prevData, polygonCoordinates: features }));
  };

  const onDrawUpdate = ({ features }) => {
    setFormData((prevData) => ({ ...prevData, polygonCoordinates: features }));
  };

  const onDrawDelete = ({ features }) => {
    console.log(features);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    postData(formData);
    setFormData(formData)
  };

  return (
    <div>
      {/* <h2>Welcome to react-mapbox</h2> */}
      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
          Polygon added successfully!
        </Alert>
      )}
      <Map
        style="mapbox://styles/mapbox/streets-v9" // eslint-disable-line
        center={[73.85453323244155, 18.51348783194281]}
        containerStyle={{
          height: "650px",
          width: "100vw",
        }}
      >
        <DrawControl
          onDrawCreate={onDrawCreate}
          onDrawUpdate={onDrawUpdate}
          onDrawDelete={onDrawDelete}
        />
        {/* {polygonsData?.map((polygon) => (
          <Layer
            key={polygon.id}
            type="fill"
            id={`polygon-${polygon.id}`}
            paint={{ "fill-color": "#f00", "fill-opacity": 0.5 }}
          >
            <Feature coordinates={polygon.geometry.coordinates} />
          </Layer>
        ))} */}
      </Map>
      <div style={{display:'flex', justifyContent:'space-around', alignItems:'center', margin:'10px'}}>

      <form onSubmit={handleFormSubmit}>
        <input
          placeholder="Enter Polygon Name"
          name="polygonName"
          type="text"
          required
          value={formData.polygonName}
          onChange={handleInputChange}
        ></input>
        <Button style={{marginLeft:'20px'}} type="submit" variant="success"  disabled={!formData.polygonCoordinates || !formData.polygonName}>Add</Button>
      </form>
      <Button variant="dark" onClick={() => setModalShow(true)} >
        View Polygon List
      </Button>
      </div>

      <PolygonListModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        polygonsData={polygonsData}
      />
    </div>
  );
};

export default MapView;
