import { Layers, Node, UITransform } from "cc";

export class NodeUtil {

    /** 创建 UI 节点 */
    static createUINode(name = '') {
        const node = new Node(name);
        node.layer = Layers.Enum.UI_2D;
        const uiTrans = node.addComponent(UITransform);
        uiTrans.setAnchorPoint(0, 1)
        return node;
    }

}


