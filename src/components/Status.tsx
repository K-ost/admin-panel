interface IStatus {
  status: string
}

const Status: React.FC<IStatus> = ({ status }) => {
  const statClass = status === 'approved' ? 'badge bg-success' :
              status === 'canceled' ? 'badge bg-danger' :
              'badge bg-warning text-dark'

  return (
    <span className={statClass}>{status}</span>
  )
}

export default Status