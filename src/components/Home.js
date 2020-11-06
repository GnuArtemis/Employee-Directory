
//Grabs the library, react library, axios library, and used react components.
import React, { Component } from 'react';
import "../style.css";
import axios from "axios";
import EmployeeMedia from './EmployeeMedia';
import SearchBar from './SearchBar';

export default class Home extends Component {
    //Tracks the list of employees, both modified and unmodified, as well as search/sort parameters
    state = {
        original: [],
        results: [],
        searchBy: "name",
        search: "",
        sortBy: "name"
    }

    //Gets the original list of employees (sample data from randomuser)
    getEmployees = () => {
        axios.get("https://randomuser.me/api/?results=200&nat=us")
            .then((result) => {
                this.setState({ original: result.data.results })
                const defaultSort = this.sortFiltered(this.state.original);
                return this.setState({results: defaultSort})
            })
            .catch(err => console.log(err));

    }

    //Gets values from input changes for search and sort
    handleInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    };

    //Depending on the search parameters, only shows employees given a certain condition
    filterBy = () => {
        let filtered = []
        switch (this.state.searchBy) {
            case "name":
                filtered = this.state.original.filter(element => {
                    const fullName = element.name.first.toLowerCase() + " " + element.name.last.toLowerCase();
                    return (fullName.includes(this.state.search.toLowerCase().trim()));
                })
                break;
            case "state":
                filtered = this.state.original.filter(element => element.location.state.toLowerCase().includes(this.state.search.toLowerCase()))
                break;
            case "city":
                filtered = this.state.original.filter(element => element.location.city.toLowerCase().includes(this.state.search.toLowerCase()))
                break;
            default:
                break;
        }
        return filtered;
    }

    //Depending on the sort parameters, orders employees by a certain condition
    sortFiltered = (filtered) => {
        switch (this.state.sortBy) {
            case "name":
                filtered = filtered.sort((a, b) => {
                    const fullNameA = a.name.last.toLowerCase() + ", " + a.name.first.toLowerCase();
                    const fullNameB = b.name.last.toLowerCase() + ", " + b.name.first.toLowerCase();
                    if (fullNameA > fullNameB) return 1;
                    else if (fullNameA < fullNameB) return -1;
                    else return 0;
                })
                break;
            case "state":
                filtered = filtered.sort((a, b) => {
                    const stateA = a.location.state.toLowerCase();
                    const stateB = b.location.state.toLowerCase()
                    if (stateA > stateB) return 1;
                    else if (stateA > stateB) return -1;
                    else return 0;
                })
                break;
            case "city":
                filtered = filtered.sort((a, b) => {
                    const cityA = a.location.city.toLowerCase();
                    const cityB = b.location.city.toLowerCase()
                    if (cityA > cityB) return 1;
                    else if (cityA > cityB) return -1;
                    else return 0;
                })
                break;
            case "age":
                filtered = filtered.sort((a, b) => {
                    return(a.dob.age-b.dob.age)
                })
                break;

            default:
                break;
        }
        return filtered;
    }

    // When the form is submitted, reset the page with new filters/sorting
    handleSearch = event => {
        event.preventDefault();
        let filtered = this.filterBy();
        this.sortFiltered(filtered);
        this.setState({ results: filtered })
    };

    //Removes previous search results and returns it to its original result
    handleClearSearch = event => {
        this.setState({ results: this.state.original, search: "" })
    }

    //On page load, display the original list of employees sorted by name
    componentDidMount() {
        this.getEmployees();
    }

    //Element display, with appropriate functions passed in
    render() {

        return (
            <section className="container">
                <SearchBar handleInputChange={this.handleInputChange} handleSearch={this.handleSearch} handleClearSearch={this.handleClearSearch} state={this.state} />

                {this.state.results.map(element => (
                    <EmployeeMedia employee={element} key = {element.name.last.toLowerCase() + ", " + element.name.first.toLowerCase()}/>
                ))}

            </section>
        )
    }
}
