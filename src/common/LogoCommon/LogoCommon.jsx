import React, { useState,useEffect } from 'react'
import { connect } from 'react-redux'
import { getLinkImg } from '../../utils/function.utils'
import './LogoCommon.scss'
const LogoCommonComponent = ({src}) => {
    const [imgLink, setImgLink] = useState("")

    useEffect(() => {
        if (src) {
            setImgLink(getLinkImg(src))
        }
    }, [src])
    return (
        <div className= {`logoWarper`}>
            <img src={imgLink} alt=""/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export const LogoCommon = connect(mapStateToProps, mapDispatchToProps)(LogoCommonComponent)
