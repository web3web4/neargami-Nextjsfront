 export interface MenuItem {
    id: string;
    title: string;
    url: string;
    action?: boolean;
    isNeedAuth?: boolean;
    subMenus?: MenuItem[];
    subMenuChilds?:string[];
  }