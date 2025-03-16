 export interface MenuItem {
    id: string;
    title: string;
    url: string;
    action?: boolean;
    onClick?: () => void;
    isNeedAuth?: boolean;
    subMenus?: MenuItem[];
    subMenuChilds?:string[];
  }