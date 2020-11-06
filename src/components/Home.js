
import React, { Component } from 'react';
import "../style.css";
import axios from "axios";
import EmployeeMedia from './EmployeeMedia';
import SearchBar from './SearchBar';

export default class Home extends Component {
    state = {
        original: [],
        results: [],
        searchBy: "name",
        search: "",
        sortBy: "name"
    }

    getEmployees = () => {
        axios.get("https://randomuser.me/api/?results=10&nat=us")
            .then((result) => {
                this.setState({ original: result.data.results })
                const defaultSort = this.sortFiltered(this.state.original);
                return this.setState({results: defaultSort})
            })
            .catch(err => console.log(err));

    }

    handleInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    };

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

    // When the form is submitted, search the Giphy API for `this.state.search`
    handleSearch = event => {
        event.preventDefault();
        let filtered = this.filterBy();
        this.sortFiltered(filtered);
        this.setState({ results: filtered })
    };


    handleClearSearch = event => {
        this.setState({ results: this.state.original, search: "" })
    }

    componentDidMount() {
        this.getEmployees();
    }

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
