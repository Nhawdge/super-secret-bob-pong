import BallAI from "./Components/BallAI.js";
import Render from "./Components/Render.js";
import Sprite from "./Components/Sprite.js";

export function IsBall(entity) {
    return entity.GetComponentOfType(BallAI) 
        && entity.GetComponentOfType(Sprite);        
}
    

export function ()