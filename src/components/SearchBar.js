import React from 'react'

export default function SearchBar(props) {
    return (
        <div className="row">
            <div className="col-lg-2">
                <label htmlFor="sortBy">Sort by</label>
                <select className="custom-select" id="sortBy" value={props.state.sortBy} onChange={props.handleInputChange} name="sortBy">
                    <option value="name">Name</option>
                    <option value="state">State</option>
                    <option value="city">City</option>
                    <option value="age">Age</option>
                </select>
            </div>
            <div className="col-lg-3">
                <label htmlFor="searchBy">Search by</label>
                <select className="custom-select" id="searchBy" value={props.state.searchBy} onChange={props.handleInputChange} name="searchBy">
                    <option value="name">Name</option>
                    <option value="state">State</option>
                    <option value="city">City</option>
                </select>
            </div>
            <div className="col-lg-5">
                <form onSubmit={props.handleSearch}>
                    <div className="form-group">

                        <label htmlFor="search">Search</label>
                        <input type="text" className="form-control" id="search" value={props.state.search} aria-describedby="search" name="search" onChange={props.handleInputChange} />
                        <small id="emailHelp" className="form-text text-muted">Please ensure you have chosen the correct search parameter.</small>
                    </div>
                </form>
            </div>
            <div className="col-lg-1 my-auto mx-auto">
                <button type="button" className="btn btn-success" onClick={props.handleSearch}>Submit</button>
            </div>
            <div className="col-lg-1 my-auto mx-auto">
                <button type="button" className="btn btn-warning" onClick={props.handleClearSearch}>Revert</button>
            </div>
        </div>
    )
}
