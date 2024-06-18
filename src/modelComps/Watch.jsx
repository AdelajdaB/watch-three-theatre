import { useGLTF, useAnimations } from "@react-three/drei";
import { useAtom } from "jotai";
import { currentSceneAtom } from "../GlobalState.js";
import {useEffect, useRef, useState} from "react";

const Watch = () => {

    const [currentScene] = useAtom(currentSceneAtom)
    const model = useGLTF('./steampunk_watch.glb')
    const animations = useAnimations(model.animations, model.scene)

    const [animationPlayed, setAnimationPlayed] = useState(false)
    const animationDuration = animations.actions['Object_0']?.getClip().duration || 0
    const halfDuration = useRef(animationDuration / 2)
    const mixer = animations.mixer

    useEffect(() => {
        if(currentScene >= 11) {
            const action = animations.actions['Object_0']
            action.play()

            setTimeout(() => {
                action.paused = true
                mixer.update(halfDuration.current)
                setAnimationPlayed(true)
            }, halfDuration.current * 1000)
        }
    }, [currentScene, animationPlayed, animations.actions, mixer]);

    return(
        <>
            <mesh>
                <primitive object={model.scene} />
            </mesh>
        </>
    )
}

export default Watch;