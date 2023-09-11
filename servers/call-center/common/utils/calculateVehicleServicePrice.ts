import { formatAsVietnameseCurrency } from '@common/utils/formatCurrency';
import { roundToThousands } from '@common/utils/roundNumber';

export const calculateVehicleServicePrice = (distance: string, vehicleType: string) => {
    const distanceValue = parseFloat(distance?.replace(',', '.').split(' ')[0]) || 0; // convert string to number (13,6 km -> 13.6)
    const distanceConvertedValue = distanceValue * 1000; // convert kilometers to meters -> 1km = 1000m
    if (vehicleType === "Xe máy") {
        return formatAsVietnameseCurrency(roundToThousands(distanceConvertedValue * 5.5));
    }
    else if (vehicleType === "Xe tay ga") {
        return formatAsVietnameseCurrency(roundToThousands(distanceConvertedValue * 6.3));
    }
    else if (vehicleType === "Xe Ô tô con") {
        return formatAsVietnameseCurrency(roundToThousands(distanceConvertedValue * 11.8));
    }
    else if (vehicleType === "Xe Ô tô") {
        return formatAsVietnameseCurrency(roundToThousands(distanceConvertedValue * 13.8));
    }
    // const price = calculatePrice(distanceValue) || 0;
    // const formattedPrice = formatAsVietnameseCurrency(price);
}