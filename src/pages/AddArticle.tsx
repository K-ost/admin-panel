import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { server } from "../assets/helpers"
import { ArticleType } from "../assets/types"
import InputField from "../components/system/InputField"
import { setNotify } from "../store/appSlice"
import { AppDispatch, RootState } from "../store/store"

const AddArticle: React.FC = () => {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const user = useSelector((state: RootState) => state.auth.user)
  const dispatch = useDispatch<AppDispatch>()
  const nav = useNavigate()


  // Admin rights
  useEffect(() => {
    if (user?.role === 'social') {
      nav('/')
    }
  }, [nav, user?.role])


  // addArticle
  const addArticle = () => {
    if (!title.length && description.length < 10) {
      setError(true)
    } else {
      const newArticle = {
        title, description,
        author: user!.id,
        createdAt: Date.now(),
        status: 'waiting',
        socials: null,
        translates: null
      } as ArticleType

      setLoading(true)
      fetch(`${server}/articles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newArticle)
      }).then(response => response.json())
        .then(data => {
          setLoading(false)
          setError(false)
          setTitle('')
          setDescription('')
          dispatch(setNotify('Your article has been added.'))
          nav('/articles')
        })
    }
  }

  return (
    <div>
      <div className="pagehead">
        <h1>Add new article</h1>
        <Link to="/articles" className="btn btn-outline-primary">Back to all articles</Link>
      </div>
      <div className="module">
        <InputField placeholder="Title" label="Title" handler={value => setTitle(value)} error={error} />

        <InputField type="area" placeholder="Description" label="Description" handler={value => setDescription(value)} error={error} />

        <button className="btn btn-primary" onClick={addArticle}>
          Add article
          {loading && <span className="spinner-border spinner-border-sm ms-2"></span>}
        </button>
      </div>
    </div>
  )
}

export default AddArticle