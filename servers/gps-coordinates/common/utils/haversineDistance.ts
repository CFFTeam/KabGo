function haversineDistance(
    mk1: { latitude: number; longitude: number },
    mk2: { latitude: number; longitude: number }
): number {
    const R = 3958.8; // Radius of the Earth in miles
    const rlat1 = (mk1.latitude * Math.PI) / 180; // Convert degrees to radians
    const rlat2 = (mk2.latitude * Math.PI) / 180; // Convert degrees to radians
    const difflat = rlat2 - rlat1; // Radian difference (latitudes)
    const difflon = ((mk2.longitude - mk1.longitude) * Math.PI) / 180; // Radian difference (longitudes)

    const d =
        2 *
        R *
        Math.asin(
            Math.sqrt(
                Math.sin(difflat / 2) * Math.sin(difflat / 2) +
                    Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)
            )
        );
    return d * 1.60934;
}

export default haversineDistance;

