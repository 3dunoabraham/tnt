export interface IItemLabel {
    id: string;
    label: string;
}
export interface IItemName {
    id: string;
    name: string;
}
export const DEFAULT_ALERT_MAPARRAY:any = [["error",""],["warn",""],["success",""],["neutral",""]]


export const USERS_DB = {
    "user":{name: "John Doe", grants:{unit:{add:true,delete:false}}},
    "admin":{name: "ADMIN", grants:{unit:{add:false,delete:true}}},
}