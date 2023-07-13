import { SidebarActionTypeToPayloadMap } from "./actions/sidebar";

type ActionTypeToPayloadMap = SidebarActionTypeToPayloadMap 

type RootActions = {
  [Type in keyof ActionTypeToPayloadMap] : void extends ActionTypeToPayloadMap[Type] ?
  { type : Type } : 
  { type : Type, payload:  ActionTypeToPayloadMap[Type]}
}

export type RootAction = RootActions[keyof RootActions]

export type ActionOf<Type extends keyof RootActions> = RootActions[Type];

