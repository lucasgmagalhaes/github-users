import { UserResumeDto } from "../../models";

export interface UserResumeProp extends UserResumeDto {
  onPress: () => void;
  displayDelay?: number;
}
