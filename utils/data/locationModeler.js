class LocationModeler {

    locationModel(location) {
        const modeledLocation = {
            key: location.Key,
            name: location.LocalizedName,
            area: location.AdministrativeArea.LocalizedName,
            country: location.Country.LocalizedName
        }
        return modeledLocation;
    }
}

module.exports = LocationModeler;