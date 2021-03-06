import {
  INode,
  IContext,
  INodeType,
  NodeTypePrimary,
  NodeInputSourceType
} from "../../../models"
import { AbstractNodeHandler } from "../../abstract-handler"
import { writeCommonSetup } from "../../../utils/handler"
import {
  getNodeVarName,
  findOutputPort,
  findInputPort,
  findRefNode
} from "../../../utils/node"

const TYPE: INodeType = {
  primary: NodeTypePrimary.Virtual,
  secondary: "math",
  tertiary: "math_abs"
}

export class MathAbsHandler extends AbstractNodeHandler {
  getSupportedType() {
    return TYPE
  }

  handle(node: INode, ctx: IContext) {
    const { setupWriter, loopWriter } = ctx
    const varName = getNodeVarName(node)

    // DEF
    // no extra diff

    // SETUP
    writeCommonSetup(setupWriter, node)

    // LOOP

    const ip0 = findInputPort(node, 0)
    const ip0Target = findRefNode(ip0.refId, ctx.data)
    const ip0TargetName = getNodeVarName(ip0Target)
    loopWriter.writeLine(`${varName}_1 = ${ip0TargetName}.data[1];`)

    loopWriter.writeLine(`if (${varName}_1 < 0) {`)
    loopWriter.writeLine(`  ${varName}.data[1] = -${varName}_1;`)
    loopWriter.writeLine(`} else {`)
    loopWriter.writeLine(`  ${varName}.data[1] = ${varName}_1;`)
    loopWriter.writeLine(`}`)
  }
}
