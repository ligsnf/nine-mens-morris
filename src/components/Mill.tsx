import React from 'react'
import { Mill } from '../models/Mill'

type Props = {
    id: string
    mill: Mill
    position: string
}

const MillComponent = ({ id, mill, position }: Props) => {

    const isMillFormed = mill.isMillFormed()

    return (
        <div id={id} className={`bg-yellow-950 absolute ${position} ${isMillFormed && "shadow-[0_0px_6px_3px_rgba(56,189,248,1)]"}`}></div>
    )
}

export default MillComponent