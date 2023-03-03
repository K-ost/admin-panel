import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getAuthor, server } from "../assets/helpers"
import { ArticleType } from "../assets/types"
import ArtSkelets from "../components/ArtSkelets"
import Socials from "../components/Socials"
import { setNotify } from "../store/appSlice"
import { AppDispatch, RootState } from "../store/store"

const EditArticle: React.FC = () => {
  const { id } = useParams()
  const [author, setAuthor] = useState<string>('')
  const [article, setArticle] = useState<ArticleType>()
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [load, setLoad] = useState<boolean>(true)
  const [loadE, setLoadE] = useState<boolean>(false)
  const [loadD, setLoadD] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()
  const nav = useNavigate()
  const role = useSelector((state: RootState) => state.auth.user?.role)

  
  // Admin rights
  useEffect(() => {
    if (role === 'social' || (role === 'author' && status === 'approved')) {
      nav('/')
    }
  }, [nav, role, status])
  

  useEffect(() => {
    if (load || loadD || loadE) {
      setLoadD(true)
      fetch(`${server}/articles?id=${id}`)
        .then(response => response.json())
        .then(data => {
          const dataObg = data[0] as ArticleType
          setArticle(dataObg)
          setTitle(dataObg.title)
          setDescription(dataObg.description)
          setStatus(dataObg.status)
          setLoad(false)
          setLoadD(false)
          setLoadE(false)
        })
    }
  }, [id, load, loadD, loadE])


  useEffect(() => {
    const fetchAuthor = async () => {
      const authorData = await getAuthor(`${server}/users?id=${article?.author}`)
      setAuthor(authorData!)
    }
    fetchAuthor()
  }, [article?.author])


  // Edit article
  const editArticle = () => {
    const updatedArticle = { ...article, title, description, status }
    setLoadE(true)
    fetch(`${server}/articles/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedArticle)
    }).then(response => {
      if (response.status === 200) {
        setLoadE(false)
        dispatch(setNotify('Article has been successfully updated'))
      }
    })
  }


  // deleteArticle
  const deleteArticle = () => {
    setLoadD(true)
    fetch(`${server}/articles/${id}`, { method: 'DELETE' })
      .then(response => {
        if (response.status === 200) {
          setLoadD(false)
          dispatch(setNotify('Article has been removed'))
          nav('/articles')
        }
      })
  }

  if (load) {
    return <ArtSkelets />
  }

  return (
    <div className="module bordered article">
      <Link to="/articles" className="btn btn-sm mb-3 btn-outline-primary">&larr; Back to articles</Link>
      <Link to={`/article/${id}`} className="btn btn-sm mb-3 btn-outline-primary">View article</Link>
      <h1>Edit article "{article?.title}"</h1>

      <div className="mb-3">
        <input type="text" className="form-control" defaultValue={article?.title} onChange={e => setTitle(e.target.value)} />
      </div>

      <div className="mb-3">
        <textarea className="form-control" defaultValue={article?.description} onChange={e => setDescription(e.target.value)}></textarea>
      </div>

      <div className="article-options">
        <div className="article-title">Author:</div>
        {author ? author : 'Loading...'}
      </div>

      {(role === 'admin' || role === 'manager') &&
        <div className="article-options">
          <div className="article-title">Status:</div>
          <select className="form-select" onChange={e => setStatus(e.target.value)} value={status}>
            <option value="waiting">Waiting</option>
            <option value="approved">Approved</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
      }

      {(role === 'admin' || role === 'manager' || role === 'social') &&
        <Socials id={id!} />
      }

      <div className="article-options">
        <div className="article-title">Translates:</div>
        <button className="btn btn-sm btn-outline-secondary">German</button>
        <button className="btn btn-sm btn-outline-secondary">Spanish</button>
      </div>

      <div className="article-options">
        <div className="article-title">Settings:</div>
        <button className="btn btn-sm btn-warning" onClick={editArticle}>
          Save edited
          {loadE && <span className="spinner-border spinner-border-sm ms-2"></span>}
        </button>

        {(role === 'admin' || role === 'manager') &&
          <button className="btn btn-sm btn-danger" onClick={deleteArticle}>
            Delete article
            {loadD && <span className="spinner-border spinner-border-sm ms-2"></span>}
          </button>
        }
      </div>
    </div>
  )
}

export default EditArticle