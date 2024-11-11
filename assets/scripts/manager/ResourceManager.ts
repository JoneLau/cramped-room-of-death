import { resources, SpriteFrame } from "cc";
import { Singleton } from "../base/Singleton";
import { MOVE_DIRECTION } from "../enum/GameEnum";

/** 资源管理器 */
export class ResourceManager extends Singleton {

    static get instance() {
        return this.getInstance<ResourceManager>();
    }

    /** 加载单个资源 */
    loadRes(path: string) {
        return new Promise<SpriteFrame>((resolve, reject) => {
            resources.load<SpriteFrame>(path, SpriteFrame, (err: Error, data: SpriteFrame) => {
                if (err) {
                    return reject(err);
                }

                resolve(data);
            })
        })
    }

    /** 加载文件夹资源 */
    loadDir(path: string) {
        return new Promise<SpriteFrame[]>((resolve, reject) => {
            resources.loadDir<SpriteFrame>(path, SpriteFrame, (err: Error, data: SpriteFrame[]) => {
                if (err) {
                    return reject(err);
                }

                resolve(data);
            })
        })
    }

    /** 加载动画资源 */
    loadPlayerAnim(name: string, targetName: string, direction: MOVE_DIRECTION) {
        let dir = direction;
        let path = `texture/${targetName}/${name}${direction !== MOVE_DIRECTION.NONE ? "/" + dir : ""}`;
        return this.loadDir(path);
    }
}


