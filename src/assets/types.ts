// Types

export type ArticleStatusType = 'approved' | 'waiting' | 'canceled'

export type TranslatesStatusType = {
  createdAt: Date
  status: ArticleStatusType
  text: string
}

export type TranslatesType = {
  spanish?: TranslatesStatusType
  german?: TranslatesStatusType
}

export type SocialsType = {
  facebook: boolean
  instagram: boolean
  linkedin: boolean
}

export type ArticleType = {
  id: string
  title: string
  createdAt: number
  description: string
  author: string
  status: ArticleStatusType
  translates?: TranslatesType | null
  socials?: SocialsType | null
}

export type UserRoleType = 'admin' | 'manager' | 'translator' | 'social' | 'author'
export type NotifyColor = 'default' | 'Danger' | 'Success' | 'Warning'

export type UserType = {
  id: string
  avatarURL?: string
  firstname: string
  lastname?: string
  email: string
  role: UserRoleType
  password?: string
}

export type LoggedType = {
  accessToken: string
  user: UserType
}

export type SocialObj = {
  id: string
  articleID: string
  name: string
}

export type ChatType = {
  id: string
  authorName: string
  authorAva: string
  message: string
  createdAt: number
}