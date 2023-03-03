interface IFilter {
  title?: string
  sort: (value: string) => void
}

const Filter: React.FC<IFilter> = ({ title = 'Filter', sort }) => {

  // handlerType
  const handlerType = (e: any) => {
    const { value } = e.target
    if ( value === 'all' ) {
      sort('')
    } else {
      sort(`&status=${value}`)
    }
  }

  return (
    <div className="mb-4">
      <h5>{title}</h5>

      <div className="row">
        <div className="col-12 col-md-3 mb-2">
          <label className="form-label">Type</label>
          <select className="form-select" onChange={handlerType}>
            <option value="all">all</option>
            <option value="approved">approved</option>
            <option value="waiting">waiting</option>
            <option value="canceled">canceled</option>
          </select>
        </div>

        <div className="col-12 col-md-3 mb-2">
          <label className="form-label">Sort by</label>
          <select className="form-select">
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default Filter