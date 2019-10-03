import React, { Component } from 'react'
import axios from 'axios'
const port = 'http://localhost:8080/'

class filterBE extends Component {

    state = {
        data: [],
        hasilFilter: [],
        loading: false,
        inputNama: '',
        inputGender: 'Sex',
        inputAngka1: 0,
        inputAngka2: 99,
        inputPclass: 'Pclass',
        inputSurvived: 'Survived',
        filter: 0
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        axios.get(port + 'getlist')
        .then(res => {
            this.setState({data: res.data, hasilFilter: res.data, loading: true})
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    renderTable = () => {
        let render = this.state.hasilFilter.map(val => {
            return (
                <tr>
                    <td>{val.PassengerId}</td>
                    <td>{val.Name}</td>
                    <td>{val.Sex === 'male' ? 'M' : 'F'}</td>
                    <td>{val.Age}</td>
                    <td>{val.Pclass === 3 ? 'Economy' : val.Pclass === 2 ? 'First Class' : "Executive"}</td>
                    <td>{val.Survived === 1 ? 'Alhamdulillah' : "Inalillahi"}</td>
                </tr>
            )
        })
        return render
    }

    renderPclass = () => {
        let option = []

        if (!this.state.filter) {
            this.state.hasilFilter.map(val => {
                if (!option.includes(val.Pclass)) {
                    option.push(val.Pclass)
                }
            })    
        } else {
            this.state.data.map(val => {
                if (!option.includes(val.Pclass)) {
                    option.push(val.Pclass)
                }
            })
        }
        

        let renderOption = option.sort().map(val => {
            return (
                <option value={val}>{val === 3 ? 'Economy': val === 2 ? 'First Class' : 'Executive'}</option>
            )
        })
        return renderOption
    }

    onSubmitClick = () => {
        const {inputAngka1, inputAngka2, inputGender, inputNama, inputPclass, inputSurvived} = this.state
        axios.get(port + 'filterlist',
        {
            params : {
                Name: inputNama,
                Survived: inputSurvived,
                Pclass: inputPclass,
                Sex: inputGender,
                Angka1: inputAngka1,
                Angka2: inputAngka2
            }
        })
        .then(res => {
            this.setState({hasilFilter: res.data, filter: 1})
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        if ( this.state.loading ) {
        return (
            <div className="container mt-5">
                <div>
                    <input onChange={e => this.setState({inputNama: e.target.value})} value={this.state.inputNama} className="mr-2" type="text" placeholder="Nama"/>
                    <input onChange={e => this.setState({inputAngka1: parseInt(e.target.value)})} value={this.state.inputAngka1} type="number"/>
                    -
                    <input onChange={e => this.setState({inputAngka2: parseInt(e.target.value)})} value={this.state.inputAngka2} type="number"/>
                    <select onChange={e => this.setState({inputGender: e.target.value})} className="ml-2">
                        <option selected disabled>Select Gender:</option>
                        <option value="Sex">All</option>
                        <option value="'male'">M</option>
                        <option value="'female'">F</option>
                    </select>
                </div>
                <div className="my-3">
                    <select onChange={e => this.setState({inputPclass: e.target.value})}>
                        <option selected disabled>Select Pclass:</option>
                        <option value="Pclass">All</option>
                        {this.renderPclass()}
                    </select>
                    <select onChange={e => this.setState({inputSurvived: e.target.value})} className="ml-2">
                        <option selected disabled>Select Survived:</option>
                        <option value="Survived">All</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                    </select>
                    <button onClick={this.onSubmitClick} className="btn btn-primary ml-2">Submit</button>
                </div>
                <table className="table">
                    <thead>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Sex</th>
                        <th>Age</th>
                        <th>Class</th>
                        <th>Survived</th>
                    </thead>
                    <tbody>
                        {this.renderTable()}
                    </tbody>
                </table>
            </div>
        )
        } else {
            return (
            <div className="mt-5">
                <h1>loading</h1>
            </div>
            )
        }
    }
}

export default filterBE