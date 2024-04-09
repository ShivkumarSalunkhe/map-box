import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

const PolygonListModal = (props) => {
  console.log(props?.polygonsData?.data);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Polygon List
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <>
            <thead>
              <tr>
                <th>No</th>
                <th>Polygon Name</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {props?.polygonsData?.data?.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item?.polygonName}</td>
                  <td>{item?.polygonCoordinates[0]?.geometry?.type || ""}</td>
                </tr>
              ))}
            </tbody>
          </>
          ;
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PolygonListModal;
