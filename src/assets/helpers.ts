import { UserType } from "./types"

export const server: string = 'http://localhost:5000'
export const socketUrl = 'ws://localhost:8080'

// Date function
export const formatDate = (value: number, time?: boolean): string => {
  const months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  
  const date = new Date(value)
  const day = date.getDay()
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  const hours = date.getHours()
  const mins = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes()

  let output: string = `${month} ${day}, ${year}`
  if (time) {
    output += `, ${hours}:${mins}`
  }

  return output
}

// getAuthor
export const getAuthor = async (link: string) => {
  const response = await fetch(link)
  const data = await response.json()
  const returnData = await data[0] as UserType
  if (returnData) {
    return returnData.firstname + ' ' + returnData.lastname
  }
}

// getView
export const getView = async (link: string): Promise<any> => {
  const response = await fetch(link)
  const data = await response.json()
  const exists = await data.length
  return exists ? true : false
}
