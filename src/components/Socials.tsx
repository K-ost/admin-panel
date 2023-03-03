import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { server } from "../assets/helpers"
import { SocialObj } from "../assets/types"
import { setNotify } from "../store/appSlice"
import { AppDispatch } from "../store/store"

interface ISocials {
  id: string
}

const socialsArray = ['facebook', 'instagram', 'linkedin']

const Socials: React.FC<ISocials> = ({ id }) => {
  const dispatch = useDispatch<AppDispatch>()
  const [load, setLoad] = useState<boolean>(false)
  const [classes, setClasses] = useState<string[]>([])


  useEffect(() => {
    fetch(`${server}/socials?articleID=${id}`)
      .then(response => response.json())
      .then(data => {
        const newClasses = data.map((el: SocialObj) => el.name)
        setClasses(newClasses)
      })
  }, [id, load])

  
  // addToSocial
  const addToSocial = async (value: string): Promise<any> => {
    setLoad(true)
    const newSocial: SocialObj = {
      id: `${value}-${id}`,
      articleID: id,
      name: value
    }
    const response = await fetch(`${server}/socials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSocial)
    })
    if (response.ok === true) {
      dispatch(setNotify(`The article has been published to social ${value}`))
      setLoad(false)
    }
  }


  // removeFromSocial
  const removeFromSocial = async (value: string) => {
    setLoad(true)
    const response = await fetch(`${server}/socials/${value}-${id}`, {
      method: 'DELETE'
    })
    if (response.ok === true) {
      dispatch(setNotify(`The article has been deleted from social ${value}`))
      setLoad(false)
    }
  }


  return (
    <div className="article-options">
      <div className="article-title">Socials:</div>

      {socialsArray.map((btn, index) => {
        return <button
          key={index}
          className={`btn btn-social btn-sm btn-${btn}`}
          onClick={classes.includes(btn) ? () => removeFromSocial(btn) : () => addToSocial(btn)}
        >
          {classes.includes(btn) && <><b>&#10003;</b> &nbsp;</>}
          {btn}
        </button>
      })}
      
      {load && <span className="spinner-border spinner-border-sm ms-2"></span>}
    </div>
  )
}

export default Socials