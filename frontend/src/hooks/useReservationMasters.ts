import { fetchStandardListByBaseCode } from "@/lib/api/reservation/csr/fetchStandardListByBaseCode";
import { StandardListItem } from "@/types/standard";
import { useEffect, useState } from "react";

export const STANDARD_CODES = {
  MENU_TYPE: "0007",
  COURSE: "0008",
  ALLERGY: "0014",
  SEAT: "0003",
  GUEST: "0005",
  STATUS: "0006",
  PURPOSE: "0009",
  CANCEL: "0012",
} as const;

export function useReservationMasters() {
  const [menu_types, setMenuTypes] = useState<StandardListItem[]>([]);
  const [courses, setCourses] = useState<StandardListItem[]>([]);
  const [allergies, setAllergies] = useState<StandardListItem[]>([]);
  const [guest_types, setGuestTypes] = useState<StandardListItem[]>([]);
  const [status, setStatus] = useState<StandardListItem[]>([]);
  const [seats, setSeats] = useState<StandardListItem[]>([]);
  const [purpose, setPurpose] = useState<StandardListItem[]>([]);
  const [cancel, setCancel] = useState<StandardListItem[]>([]);

  useEffect(() => {
    fetchStandardListByBaseCode(STANDARD_CODES.MENU_TYPE).then(setMenuTypes);
    fetchStandardListByBaseCode(STANDARD_CODES.COURSE).then(setCourses);
    fetchStandardListByBaseCode(STANDARD_CODES.ALLERGY).then(setAllergies);
    fetchStandardListByBaseCode(STANDARD_CODES.GUEST).then(setGuestTypes);
    fetchStandardListByBaseCode(STANDARD_CODES.STATUS).then(setStatus);
    fetchStandardListByBaseCode(STANDARD_CODES.SEAT).then(setSeats);
    fetchStandardListByBaseCode(STANDARD_CODES.PURPOSE).then(setPurpose);
    fetchStandardListByBaseCode(STANDARD_CODES.CANCEL).then(setCancel);
  }, []);

  return {
    menu_types,
    courses,
    allergies,
    guest_types,
    status,
    seats,
    purpose,
    cancel,
  };
}
