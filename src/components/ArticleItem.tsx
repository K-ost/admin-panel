import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { ArticleType } from "../assets/types"
import { RootState } from "../store/store"
import Status from "./Status"

interface IArticleItem {
  article: ArticleType
}

const ArticleItem: React.FC<IArticleItem> = ({ article }) => {
  const role = useSelector((state: RootState) => state.auth.user?.role)
  const access = (article.status === 'approved' && (role === 'author' || role === 'social'))
  const link = access ? `/article/${article.id}` : `/edit-article/${article.id}`

  return (
    <li>
      <Link to={link}>
        <div className="d-flex align-items-center">
          {article.title}
        </div>
        <Status status={article.status} />
      </Link>
    </li>
  )
}

export default ArticleItem