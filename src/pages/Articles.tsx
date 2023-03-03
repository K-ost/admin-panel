import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { server } from "../assets/helpers"
import { ArticleType } from "../assets/types"
import ArticleItem from "../components/ArticleItem"
import ArtSkelets from "../components/ArtSkelets"
import Filter from "../components/Filter"
import { RootState } from "../store/store"

const Articles: React.FC = () => {
  const [articles, setArticles] = useState<ArticleType[]>([])
  const [load, setLoad] = useState<boolean>(true)
  const role = useSelector((state: RootState) => state.auth.user?.role)
  const [sortType, setSortType] = useState<string>('')

  useEffect(() => {
    fetch(`${server}/articles?_page=1&_limit=5&_sort=createdAt&_order=desc${sortType}`)
      .then(response => response.json())
      .then(data => {
        setArticles(data)
        setLoad(false)
      })
  }, [load, sortType])

  return (
    <div>
      <div className="pagehead">
        <h1>Articles</h1>
        {role !== 'social' && 
          <Link to="/add-article" className="btn btn-outline-primary">Add new article</Link>
        }
      </div>
      
      <Filter sort={(value: string) => setSortType(value)} />
      
      <ul className="articles-list">
        {articles.map(el => <ArticleItem key={el.id} article={el} />)}
        {load && <ArtSkelets />}
      </ul>
      <div className="d-flex justify-content-center mt-3">
        <button className="btn btn-sm btn-outline-primary">
          Load more
          {load && <span className="spinner-border spinner-border-sm ms-2"></span>}
        </button>
      </div>
      
    </div>
  )
}

export default Articles