import { Modal } from "react-bootstrap"

interface IPopup {
  title: string
  text: string
  show: boolean
  hide: () => void
  handler: () => void
}

const Popup: React.FC<IPopup> = ({ handler, hide, show, text, title }) => {

  return (
    <Modal centered show={show} onHide={hide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{text}</p>
        <div className="d-flex justify-content-between">
          <button className="btn btn-outline-secondary me-2" onClick={hide}>Cancel</button>
          <button className="btn btn-danger" onClick={handler}>Delete</button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default Popup