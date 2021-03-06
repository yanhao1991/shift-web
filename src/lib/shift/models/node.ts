export enum NodeTypePrimary {
  Device = "device",
  Virtual = "virtual"
}

export enum NodeValueType {
  Bool = "bool",
  Int = "int"
}

export enum NodeInputSourceType {
  Reference = "ref",
  Constant = "const"
}

export interface INodeType {
  primary: NodeTypePrimary
  secondary: string
  tertiary: string
}

export interface INodeInput {
  port: number // 0 ~ n
  value: any
  valueType: NodeValueType
  type: NodeInputSourceType
  refId: string
  refOutputPort: number
}

export interface INodeOutput {
  port: number
  value: any
  valueType: NodeValueType
}

export interface INode {
  id: string
  address: string
  type: INodeType
  inputs: INodeInput[]
  outputs: INodeOutput[]

  extra?: any
}
