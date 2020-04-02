import React from 'react';
import { Helmet } from "react-helmet";
import sheets from "../controllers/sheets";
import CompanyPopup from '../components/CompanyPopup.js';
import MapOptions from '../components/MapOptions';
import Header from '../components/header.js';

import "../styles/map.scss";
import L from 'leaflet';

import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default class InternshipMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            options: {
                yes: true,
                no: true,
                remote: true,
                freeze: true
            },
            mapOptions: {
                position: [45.5051064, -122.6750261],
                zoom: 4
            }
        };
        this.onMapOptionsChange = this.onMapOptionsChange.bind(this);
        this.setCompanyOnMap = this.setCompanyOnMap.bind(this);
    }

    componentDidMount() {
        sheets.fetch().then((r) => {
            this.setState({
                data: r
            });
        });
    }

    setCompanyOnMap(name) {
        let companyObject = this.state.data.filter(company => company[0] == name);
        if (typeof companyObject[0] !== 'undefined') {
            this.setState({
                mapOptions: {
                    position: [companyObject[0][8].split(",")[0], companyObject[0][8].split(",")[1]],
                    zoom: 13
                }
            });
        } else {
            this.setState({
                mapOptions: {
                    position: [45.5051064, -122.6750261],
                    zoom: 4
                }
            })
        }

    }

    render() {
        const start = [34.0489, 111.0937];
        const companies = this.filterCompanies(this.state.data);

        const companyIcons = companies.map(r => {
            return L.icon({
                iconUrl: r[6] || 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
                iconSize: [32, 32]
            });
        });

        const markers = companies
            .map((r, i) => {
                const position = [+r[8].split(',')[0], +r[8].split(',')[1]];
                return (
                    <div className={"marker_company_status_" + r[1]}>
                        <Marker
                            position={position}
                            icon={companyIcons[i]}
                            key={r[0]}>
                            <Popup>
                                <CompanyPopup
                                    company_logo={r[6]}
                                    status={r[1]}
                                    name={r[0]}
                                    notes={r[2]}
                                    source={r[3]}
                                    official_link={r[4]}
                                    linkedin={r[5]}
                                    key={r[0]}
                                />
                            </Popup>
                        </Marker>
                    </div>
                );
            });

        return (
            <div id={"map_container"}>
                <Header current={"map"} />
                <Helmet>
                    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==" crossorigin="" />
                </Helmet>
                <MapOptions onChange={this.onMapOptionsChange} />
                <Map center={this.state.mapOptions.position} zoom={this.state.mapOptions.zoom} id={"map"}>
                    <TileLayer
                        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    {markers}
                </Map>
                <div className={"map_search_box"}>
                    <Autocomplete
                        options={companies}
                        getOptionLabel={(option) => option[0]}
                        style={{ width: 300 }}
                        onChange={(event) => { this.setCompanyOnMap(event.target.innerHTML) }}
                        renderInput={(params) => <TextField {...params} label="Choose company here" variant="filled" />}
                    />
                </div>
            </div>
        );
    }

    filterCompanies(companies) {
        const { yes, no, remote, freeze } = this.state.options;
        let filteredCompanies = [];

        // Remove companies without a location set
        companies = companies.filter(r => r[8]);

        if (yes) filteredCompanies = filteredCompanies.concat(companies.filter(r => r[1] == 'Yes'));
        if (no) filteredCompanies = filteredCompanies.concat(companies.filter(r => r[1] == 'Nope'));
        if (remote) filteredCompanies = filteredCompanies.concat(companies.filter(r => r[1] == 'Remote'));
        if (freeze) filteredCompanies = filteredCompanies.concat(companies.filter(r => r[1] == 'Freeze'));

        return filteredCompanies;
    }

    onMapOptionsChange(options) {
        this.setState({
            options: options
        });
    }
}