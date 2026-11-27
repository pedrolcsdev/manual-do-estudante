import { campusPoints, campusUnlocatedSectors, type CampusSector } from "./campus";
import { services } from "./services";

export const campusDirectory: CampusSector[] = [
  ...campusPoints.map((point) => {
    const service = services.find(({ slug }) => slug === point.orientation)!;
    return { ...point, name: service.sector!, location: service.location! };
  }),
  ...campusUnlocatedSectors.map((sector) => ({ ...sector, locationPending: true })),
];
