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

        this.DEFAULT_MARKER_ICON_URL = 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png';
        this.MARKER_ICON_SIZE = [32, 32];
        this.STARTING_COORDS = [45.5051064, -122.6750261];

        this.state = {
            companies: [],
            options: {
                yes: true,
                no: true,
                remote: true,
                freeze: true,
                hiring: true
            },
            mapOptions: {
                position: this.STARTING_COORDS,
                zoom: 4
            }
        };

        this.onMapOptionsChange = this.onMapOptionsChange.bind(this);
        this.setCompanyOnMap = this.setCompanyOnMap.bind(this);
    }

    componentDidMount() {
        sheets.fetch().then(companies => {
            this.setState({
                companies: companies
            });
        });
        setTimeout(() => {
            this.render();
        }, 500);
    }

    setCompanyOnMap(name) {
        let company = this.state.companies.filter(c => c.name === name)[0];
        if (typeof company !== 'undefined') {
            this.setState({
                mapOptions: {
                    position: company.coords,
                    zoom: 13
                }
            });
        } else {
            this.setState({
                mapOptions: {
                    position: this.STARTING_COORDS,
                    zoom: 4
                }
            })
        }
    }

    renderMarkers(companies) {
        const companyIcons = companies.map(c => {
            return L.icon({
                iconUrl: c.logo || this.DEFAULT_MARKER_ICON_URL,
                iconSize: this.MARKER_ICON_SIZE
            });
        });

        return companies
            .map((c, i) => {
                return (
                    <div className={"marker_company_status_" + c.status} key={c.name}>
                        <Marker
                            position={c.coords}
                            icon={companyIcons[i]}
                            key={c.name}>
                            <Popup>
                                <CompanyPopup
                                    company_logo={c.logo}
                                    status={c.status}
                                    name={c.name}
                                    notes={c.notes}
                                    source={c.source}
                                    official_link={c.official_link}
                                    linkedin={c.linkedin}
                                    key={c.name}
                                />
                            </Popup>
                        </Marker>
                    </div>
                );
            });
    }

    render() {
        const filteredCompanies = this.filterCompanies(this.state.companies);
        const markers = this.renderMarkers(filteredCompanies);

        if (typeof window !== 'undefined') {
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
                            options={filteredCompanies}
                            getOptionLabel={c => c.name}
                            style={{ width: 300 }}
                            onChange={(event) => { this.setCompanyOnMap(event.target.innerHTML) }}
                            renderInput={(params) => <TextField {...params} label="Choose company..." variant="filled" />}
                        />
                    </div>
                </div>
            );
        }
        return null
    }

    filterCompanies(companies) {
        const { yes, no, remote, freeze, hiring } = this.state.options;
        let filteredCompanies = [];

        // Remove companies without a location set
        companies = companies.filter(c => c.coords[1] !== 0);

        if (yes) filteredCompanies = filteredCompanies.concat(companies.filter(c => c.status === 'Yes'));
        if (no) filteredCompanies = filteredCompanies.concat(companies.filter(c => c.status === 'Nope'));
        if (remote) filteredCompanies = filteredCompanies.concat(companies.filter(c => c.status === 'Remote'));
        if (freeze) filteredCompanies = filteredCompanies.concat(companies.filter(c => c.status === 'Freeze'));
        if (hiring) filteredCompanies = filteredCompanies.concat(companies.filter(c => c.status === 'Hiring'));

        return filteredCompanies;
    }

    onMapOptionsChange(options) {
        this.setState({
            options: options
        });
    }
}