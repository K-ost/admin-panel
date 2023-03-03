import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { formatDate, getAuthor, server } from "../assets/helpers"
import { ArticleType } from "../assets/types"
import ArtSkelets from "../components/ArtSkelets"
import Socials from "../components/Socials"
import Status from "../components/Status"
import { RootState } from "../store/store"

const ShowArticle: React.FC = () => {
  const { id } = useParams()
  const [load, setLoad] = useState<boolean>(true)
  const [author, setAuthor] = useState<string>('')
  const [article, setArticle] = useState<ArticleType>()
  const role = useSelector((state: RootState) => state.auth.user?.role)
  
  useEffect(() => {
    fetch(`${server}/articles?id=${id}`)
      .then(response => response.json())
      .then(data => {
        const dataObg = data[0] as ArticleType
        setArticle(dataObg)
        setLoad(false)
      })
  }, [id, load])

  useEffect(() => {
    const fetchAuthor = async () => {
      const authorData = await getAuthor(`${server}/users?id=${article?.author}`)
      setAuthor(authorData!)
    }
    fetchAuthor()
  }, [article?.author])

  if (load) {
    return <ArtSkelets />
  }

  // Date
  const date = formatDate(article!.createdAt)

  return (
    <div className="article">
      <Link to="/articles" className="btn btn-sm mb-3 btn-outline-primary">&larr; Back to articles</Link>
      <h1>{article?.title}</h1>

      <div className="article-meta">
        <div><small>Created:</small> {date}</div>
        <div><small>Author:</small> {author ? author : 'Loading...'}</div>
        <div><small>Status:</small> <Status status={article!.status} /></div>
      </div>

      <div className="mb-3" dangerouslySetInnerHTML={{__html: article!.description}}></div>

      {role === 'social' && article?.status === 'approved' && <Socials id={id!} />}
    </div>
  )
}

export default ShowArticle