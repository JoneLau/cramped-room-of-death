import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StartManager')
export class StartManager extends Component {
    start() {
        this.node.once(Node.EventType.TOUCH_END, this.startEnd, this);
    }

    startEnd() {
        director.loadScene("battle");
    }
}


