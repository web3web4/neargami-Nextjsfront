export interface MenuDataMobile{
    id: string,
    title: string,
    url?: string,
    action?: boolean,
    subMenus?: MenuDataMobile[]
  }