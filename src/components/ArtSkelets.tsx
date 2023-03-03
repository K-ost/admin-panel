interface IArtSkelets {
  count?: number
}

const ArtSkelets: React.FC<IArtSkelets> = ({ count = 3 }) => {
  const array = []
  for (let i = 0; i < count; i++) {
    array.push(i)
  }

  return (
    <div>
      {array.map(el => (
        <div key={el} className="placeholder-glow article module bordered">
          <span className="placeholder col-12"></span>
          <span className="placeholder col-8"></span>
          <span className="placeholder col-6"></span>
        </div>
      ))}
    </div>
  )
}

export default ArtSkelets