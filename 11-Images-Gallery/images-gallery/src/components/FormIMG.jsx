import React from 'react'
import PropTypes from 'prop-types'

const FormIMG = ({ handleSubmit }) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="input-group my-3">
                    <label className="mx-2" >Search:</label>
                    <input className="w-75 form-control" type="text" name="inputText" id="inputText" />
                    <button className="mx-1 btn btn-outline-success" type="submit">Search <i className="bi bi-search"></i></button>
                </div>
            </form>
        </>
    )
}

FormIMG.propTypes = {
    handleSubmit: PropTypes.func
}

export default FormIMG
