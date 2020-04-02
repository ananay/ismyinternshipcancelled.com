import React from 'react';
import { Helmet } from "react-helmet";
import sheets from "../controllers/sheets";
import CompanyPopup from '../components/CompanyPopup.js';
import MapOptions from '../components/MapOptions';

import "../styles/map.scss";
import L from 'leaflet';

import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

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
            }
        };
        this.onMapOptionsChange = this.onMapOptionsChange.bind(this);
    }

    componentDidMount() {
        sheets.fetch().then((r) => {
            this.setState({
                data: r
            });
        });
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
                );
            });

        return (
            <div id={"map_container"}>
                <Helmet>
                    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==" crossorigin="" />
                </Helmet>
                <MapOptions onChange={this.onMapOptionsChange}/>
                <Map center={start} zoom={4} id={"map"}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    {markers}
                </Map>
            </div>
        );
    }

    filterCompanies(companies) {
        const {yes, no, remote, freeze} = this.state.options;
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