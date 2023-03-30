import { DTCart } from "./DTCart";
import { EnumAction } from "./EnumAction";

export interface DTModal {
  show: boolean,
  data: DTCart | null,
  action: EnumAction | null,
}
