const UserSkelet = () => {
  return (
    <div className="cardbox">
      <div className="cardbox-img placeholder-glow">
        <span className="placeholder" style={{height: '100px'}}></span>
      </div>
      <div className="cardbox-body placeholder-glow">
        <div className="cardbox-name">
          <span className="placeholder col-12"></span>
        </div>
        <span className="placeholder w-25"></span>
        <div className="cardbox-email">
          <span className="placeholder col-6"></span>
        </div>
      </div>
    </div>
  )
}

export default UserSkelet