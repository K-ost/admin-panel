import { Toast, ToastContainer } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { closeNotify } from "../../store/appSlice"
import { AppDispatch, RootState } from "../../store/store"

const Notify: React.FC = () => {
  const notify = useSelector((state: RootState) => state.app.notify)
  const dispatch = useDispatch<AppDispatch>()

  return (
    <ToastContainer position="bottom-end" className="p-3">
      <Toast show={!!notify} onClose={() => dispatch(closeNotify())} autohide delay={5000}>
        <Toast.Header>
          <strong className="me-auto">Bootstrap</strong>
          <small>1 sec ago</small>
        </Toast.Header>
        <Toast.Body>{notify}</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

export default Notify